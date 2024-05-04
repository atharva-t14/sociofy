

import logging
from flask import Flask, request, jsonify
from tensorflow.keras.layers import TextVectorization
import numpy as np
from tensorflow.keras.models import model_from_json
import codecs

app = Flask(__name__)

def predict(comment):
    # Load model and vectorizer
    
    json_file = open('C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api\\modelepoch5.json', 'r', encoding='utf-8')

    logging.getLogger('tensorflow').setLevel(logging.ERROR)  # Suppress warnings
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    MAX_FEATURES=200000
    vectorizer = TextVectorization(max_tokens=MAX_FEATURES, output_sequence_length=1800, output_mode='int')

    vectorizer.adapt([comment])

    vectorized_comment = vectorizer(comment)
    res = loaded_model.predict(np.expand_dims(vectorized_comment, 0))
    toxicity_level = res[0].tolist()
    
    return {'toxicity': toxicity_level}

@app.route('/predict', methods=['POST'])
def predict_toxicity():
    if request.method == 'POST':
        data = request.get_json()  # Assuming JSON data is sent in the POST request
        comment = data.get('comment')  # Assuming 'comment' is the key for the comment data
        result = predict(comment)
        return jsonify(result)
    else:
        return jsonify({'error': 'Method not allowed'}), 405

if __name__ == "__main__":
    app.run(port=5000)  # Run the app on port 5000
