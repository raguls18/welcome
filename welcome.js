import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Perceptron
from sklearn.metrics import accuracy_score

# Load dataset
url = "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
cols = ['sl', 'sw', 'pl', 'pw', 'species']
data = pd.read_csv(url, names=cols)

# Features and target
X = data.drop('species', axis=1)
y = data['species']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=0
)

# Perceptron without bias
m1 = Perceptron(fit_intercept=False)
m1.fit(X_train, y_train)
p1 = m1.predict(X_test)
print("Without Bias Accuracy:", accuracy_score(y_test, p1))

# Perceptron with bias
m2 = Perceptron(fit_intercept=True)
m2.fit(X_train, y_train)
p2 = m2.predict(X_test)
print("With Bias Accuracy:", accuracy_score(y_test, p2))
