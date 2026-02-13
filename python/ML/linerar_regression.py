import pandas as pd
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Data: only up to 6 years
data = {
    'Experience_Years': [1, 2, 3, 4, 5, 6],
    'Salary_USD': [30000, 35000, 40000, 45000, 50000, 55000]
}

df = pd.DataFrame(data)

# Prepare data
X = df[['Experience_Years']]
y = df['Salary_USD']

# Train model
model = LinearRegression()
model.fit(X, y)

# Predict for future experience
experience_to_predict = pd.DataFrame({'Experience_Years': [7, 10]})
predicted_salaries = model.predict(experience_to_predict)

# Create regression line values
X_line = pd.DataFrame({'Experience_Years': range(1, 11)})
y_line = model.predict(X_line)

# Plot
plt.figure()
plt.scatter(df['Experience_Years'], df['Salary_USD'])
plt.plot(X_line['Experience_Years'], y_line)
plt.scatter(experience_to_predict['Experience_Years'], predicted_salaries)
plt.xlabel("Experience (Years)")
plt.ylabel("Salary (USD)")
plt.title("Salary Prediction using Linear Regression")
plt.show()

# Output predictions
print(f"Predicted Salary for 7 years: ${predicted_salaries[0]:,.2f}")
print(f"Predicted Salary for 10 years: ${predicted_salaries[1]:,.2f}")
