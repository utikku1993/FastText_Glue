import csv

def extract_cols_from_tsv(path, colnums):
    data = []
    try:
        with open(path,'r', encoding='utf-8') as tsvfile:
            reader = csv.reader(tsvfile, delimiter='\t')
            for row in reader:
                if len(row) < max(colnums):
                    continue
                else:
                    for colnum in colnums:
                        data.append(row[colnum - 1])
    except:
        pass
    return data

filenames = [
    ('../glue_data/CoLA/train.tsv', [4]),
    ('../glue_data/diagnostic/diagnostic.tsv', [2,3]),
    ('../glue_data/MRPC/train.tsv', [4,5]),
    ('../glue_data/QNLI/train.tsv', [2,3]),
    ('../glue_data/QQP/train.tsv', [4,5]),
    ('../glue_data/RTE/train.tsv', [2,3]),
    ('../glue_data/SST-2/train.tsv', [1]),
    ('../glue_data/STS-B/train.tsv', [8,9]),
    ('../glue_data/WNLI/train.tsv', [2,3])
]

with open('all_data.tsv', 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile, delimiter='.')
        writer.writerow([''])

for filename in filenames:
    with open('all_data.tsv', 'a', newline='', encoding='utf-8') as csvfile:
        all_data_writer = csv.writer(csvfile, delimiter='\n')
        data = extract_cols_from_tsv(filename[0], filename[1])
        all_data_writer.writerow(data)