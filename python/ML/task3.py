import cv2, numpy as np, os
from glob import glob

def load_dataset(data_path, img_size=(100,100)):
    X, y = [], []
    persons = sorted(os.listdir(data_path))
    for label, person in enumerate(persons):
        person_path = os.path.join(data_path, person)
        if not os.path.isdir(person_path):
            continue
        for img_path in glob(os.path.join(person_path, "*.jpg")):
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            img = cv2.resize(img, img_size)
            X.append(img.flatten())
            y.append(label)
    return np.array(X), np.array(y), persons