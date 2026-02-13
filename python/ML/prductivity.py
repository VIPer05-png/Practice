import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Sample dataset
data = {
    'Training_Hours': [5, 8, 10, 12, 15, 18],
    'Productivity_Score': [50, 60, 65, 70, 80, 90]
}

df = pd.DataFrame(data)

print("Employee Training Data:")
print(df)

# Prepare features and target
X = df[['Training_Hours']]
y = df['Productivity_Score']

# Train Linear Regression model
model = LinearRegression()
model.fit(X, y)

# Predict productivity for new training hours
future_hours = pd.DataFrame({'Training_Hours': [7, 10]})
predicted_productivity = model.predict(future_hours)

# Create regression line
X_line = pd.DataFrame({'Training_Hours': range(1, 11)})
y_line = model.predict(X_line)

# Plot graph
plt.figure()
plt.scatter(df['Training_Hours'], df['Productivity_Score'])
plt.plot(X_line['Training_Hours'], y_line)
plt.scatter(future_hours['Training_Hours'], predicted_productivity)
plt.xlabel("Training Hours")
plt.ylabel("Productivity Score")
plt.title("Employee Training Hours vs Productivity")
plt.show()

# Output predictions
print(f"Predicted Productivity for 7 training hours: {predicted_productivity[0]:.2f}")
print(f"Predicted Productivity for 10 training hours: {predicted_productivity[1]:.2f}")
