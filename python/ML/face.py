import cv2
import mediapipe as mp
import numpy as np
import math

# -------------------------
# Configuration
# -------------------------
SMOOTHING = 0.7          # Higher = smoother, less jitter
MOVE_THRESHOLD = 4      # Ignore tiny motion (pixels)
DRAW_COLOR = (0, 0, 255)
DRAW_THICKNESS = 4

# -------------------------
# MediaPipe Setup
# -------------------------
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(
    max_num_hands=1,
    model_complexity=1,
    min_detection_confidence=0.8,
    min_tracking_confidence=0.8
)

# -------------------------
# Webcam + Canvas
# -------------------------
cap = cv2.VideoCapture(0)
canvas = None

prev_x, prev_y = None, None
smooth_x, smooth_y = None, None
drawing = False

# -------------------------
# Utility Functions
# -------------------------
def smooth_point(prev, current, alpha):
    if prev is None:
        return current
    return int(alpha * prev + (1 - alpha) * current)

def distance(p1, p2):
    return math.hypot(p1[0] - p2[0], p1[1] - p2[1])

# -------------------------
# Main Loop
# -------------------------
while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    h, w, _ = frame.shape

    if canvas is None:
        canvas = np.zeros_like(frame)

    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = hands.process(rgb)

    if result.multi_hand_landmarks:
        hand = result.multi_hand_landmarks[0]

        # Index finger tip
        ix = int(hand.landmark[8].x * w)
        iy = int(hand.landmark[8].y * h)

        # Index finger PIP joint (for up/down check)
        pip_y = int(hand.landmark[6].y * h)

        # Thumb tip
        tx = int(hand.landmark[4].x * w)
        ty = int(hand.landmark[4].y * h)

        # Gesture detection
        index_up = iy < pip_y
        thumb_index_dist = distance((ix, iy), (tx, ty))

        # Clear canvas gesture
        if thumb_index_dist < 30:
            canvas[:] = 0
            prev_x, prev_y = None, None
            drawing = False

        # Drawing logic
        if index_up:
            drawing = True

            smooth_x = smooth_point(smooth_x, ix, SMOOTHING)
            smooth_y = smooth_point(smooth_y, iy, SMOOTHING)

            if prev_x is not None:
                if distance((prev_x, prev_y), (smooth_x, smooth_y)) > MOVE_THRESHOLD:
                    cv2.line(
                        canvas,
                        (prev_x, prev_y),
                        (smooth_x, smooth_y),
                        DRAW_COLOR,
                        DRAW_THICKNESS
                    )

            prev_x, prev_y = smooth_x, smooth_y

        else:
            drawing = False
            prev_x, prev_y = None, None

        cv2.circle(frame, (ix, iy), 8, (0, 255, 0), -1)

    # Overlay drawing on video
    output = cv2.add(frame, canvas)
    cv2.imshow("High-Accuracy Hand Drawing", output)

    if cv2.waitKey(1) & 0xFF == 27:
        break

# -------------------------
# Cleanup
# -------------------------
cap.release()
cv2.destroyAllWindows()
