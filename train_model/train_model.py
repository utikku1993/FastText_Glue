import csv

from tqdm import tqdm

from gensim.utils import tokenize
from gensim.models import FastText

from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords

corpus = []
lemmatizer = WordNetLemmatizer()
stopwords_en = set(stopwords.words('english'))

with open('all_data.tsv', 'r', newline='', encoding='utf-8') as csvfile:
        read_rows = csv.reader(csvfile, delimiter='\t')
        for row in tqdm(read_rows):
            if(len(row) < 1):
                continue
            line = [ lemmatizer.lemmatize(word) for word in tokenize(row[0], lowercase=True, deacc=True, encoding='utf-8') if lemmatizer.lemmatize(word) not in stopwords_en]
            corpus.append(line)

print("Begin training neural network")

model = FastText(corpus, min_count=10, workers=10, alpha=0.01, iter=10)
model.save('../model/english')

print("Done!")