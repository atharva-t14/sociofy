from flask import Flask

import pandas as pd
#  import tensorflow as tf
from tensorflow.keras.layers import TextVectorization
import numpy as np
from tensorflow.keras.models import model_from_json

app=Flask(__name__)

@app.route('/api/ml')

def predict():
    json_file = open('modelepoch5.json', 'r')
    loaded_model_json = json_file.read()

    json_file.close()
    loaded_model = model_from_json(loaded_model_json)
    # load weights into new model
    # loaded_model.load_weights("modelepoch1.weights.h5")
    #print("Loaded model from disk")
    #loaded_model.summary()

    MAX_FEATURES=200000
    vectorizer = TextVectorization(max_tokens=MAX_FEATURES,
                                output_sequence_length=1800,
                                output_mode='int')
    
    comment="Thats not a good thing that you are hating on me."
    vectorizer.adapt([comment])
    vectorized_comment = vectorizer(comment)
    print(vectorized_comment)
    res = loaded_model.predict(np.expand_dims(vectorized_comment,0))
    # results = loaded_model.predict(vectorized_comment)
    #print(res)
    #text = ''
    #for idx, col in enumerate(col_list):
        #text += '{}: {}\n'.format(col, res[0][idx]>0.5)
    #print(text)
    
    #new_df = pd.DataFrame(columns=col_list, data=res)
    #print(new_df.head)
    return {'toxicity':res[0]}