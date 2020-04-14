from flask import Flask, request
from os.path import dirname, basename, isfile, join

from gensim.utils import tokenize
from gensim.models import FastText

from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

lemmatizer = WordNetLemmatizer()
stopwords_en = set(stopwords.words('english'))

model = FastText.load('../model/english')
THRESHOLD = 0.65
TOPN = 100

app = Flask(__name__)

@app.route("/getSimilar/<query>", methods = ['GET'])
def getSimilar(query):
    words = [ lemmatizer.lemmatize(word) for word in tokenize(query, lowercase=True, deacc=True, encoding='utf-8') if lemmatizer.lemmatize(word) not in stopwords_en]
    if len(words) > 0:
        return {'similar': [synonym for synonym in model.wv.most_similar(words[0], topn=TOPN) if synonym[1] > THRESHOLD]}
    else:
        return {'similar': []}

if __name__ == "__main__":
    app.run(debug=True, port=9443)