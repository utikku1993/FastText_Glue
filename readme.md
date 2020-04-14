```
  ___        _  _____        _                        
 | __|_ _ __| ||_   _|____ _| |_                      
 | _/ _` (_-<  _|| |/ -_) \ /  _|                      
 |_|\__,_/__/\__||_|\___/_\_\\__|__      ___ _   _    
 |_   _| _ __ _(_)_ _  ___ __| | \ \    / (_) |_| |_  
   | || '_/ _` | | ' \/ -_) _` |  \ \/\/ /| |  _| ' \ 
   |_||_| \__,_|_|_||_\___\__,_|   \_/\_/ |_|\__|_||_|
  / __| |_  _ ___  |   \ __ _| |_ __ _ ______| |_     
 | (_ | | || / -_) | |) / _` |  _/ _` (_-< -_)  _|    
  \___|_|\_,_\___| |___/\__,_|\__\__,_/__|___|\__|    
```

How to run this project:

### Prerequisites

This code was written and targeted for Python v3.6

Ensure that you have the following python libraries installed:
1. NLTK
2. Gensim
3. tqdm
4. csv
5. shutil
6. tempfile
7. urllib
8. zipfile


### Run training

1. cd to train_model directory
2. run the download_glue_data.py using 


```
python download_glue_data.py --data-dir ../glue_data --tasks all
```

3. now, run extract_data.py using the following command:

```
python extract_data.py
```

4. now, run train_model.py using the following command:

```
python train_model.py
```

The above process downloaded the glue datasets on your system and trained a FastText model using that data.


### Running the Flask Server

1. cd in to the server directory
2. install pipenv, if not already present on your system, using the following command:

```
pip install pipenv
```

3. Now, create a pipenv shell using the following command:

```
pipenv shell --python 3.6
```

4. Once the pipenv shell is created, run the following command to install dependencies:

```
pipenv install
```

5. Now, restart the server with the following command:

```
python server.py
```


### Starting the React app

1. cd in to the ```webapp/``` folder
2. Run the following command to install dependencies:

```
npm install
```

3. To run the project, use the following command:

```
npm start
```

This should open a webapp with a search bar. As you type into the search bar, FastText will predict similar words for your input.


### Note:
Only the first word of the input will be considered by FastText similarity match.