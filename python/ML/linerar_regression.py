import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression

# Create a sample DataFrame
data = {
    'Experience_Years': [1, 2, 3, 4, 5, 6, 8, 9, 10],
    'Salary_USD': [30000, 35000, 40000, 45000, 50000, 55000, 65000]
}
df = pd.DataFrame(data)

print("Employee Data Frame:")
print(df)

# Prepare the data for the model
X = df[['Experience_Years']]
y = df['Salary_USD']

# Initialize and train the Linear Regression model
model = LinearRegression()
model.fit(X, y)

print(f"Linear Regression Model Coefficients:")
print(f"  Coefficient (slope): {model.coef_[0]:.2f}")
print(f"  Intercept: {model.intercept_:.2f}")

# Create a DataFrame for the experience levels to predict
experience_to_predict = pd.DataFrame({'Experience_Years': [7, 10]})

# Predict salaries
predicted_salaries = model.predict(experience_to_predict)

print(f"Predicted Salary for 7 years experience: ${predicted_salaries[0]:,.2f}")
print(f"Predicted Salary for 10 years experience: ${predicted_salaries[1]:,.2f}")