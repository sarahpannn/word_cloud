import csv
import cgi
import cgitb

# Enable CGI error reporting
cgitb.enable()

# Retrieve the parameter from the POST request
form = cgi.FieldStorage()
param_value = form.getvalue("param", "")

data = {}

with open('public/pca_vectors.csv', 'r') as f:
    reader = csv.reader(f)
    for row in reader:
        data[row[-1]] = [row[1], row[2], row[3]]

words = param_value.split(' ')

average_embedding = [0., 0., 0.]

for word in words:
    if word in data:
        average_embedding[0] += data[word][0]
        average_embedding[1] += data[word][1]
        average_embedding[2] += data[word][2]
        
average_embedding[0] /= len(words)
average_embedding[1] /= len(words)
average_embedding[2] /= len(words)

print("Content-Type: text/html")
print(average_embedding[0], average_embedding[1], average_embedding[2])
