# import sys
# import json
# from flask import Flask
# import os
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
# import tensorflow as tf
# import pandas as pd
# #  import tensorflow as tf
# from tensorflow.keras.layers import TextVectorization
# import numpy as np
# from tensorflow.keras.models import model_from_json

# # Check if arguments are provided
# if len(sys.argv) < 2:
#     print("Usage: python api.py <comments_json>")
#     sys.exit(1)

# # Extract comments JSON string from command line arguments
# comments_json = sys.argv[1]

# # Debug: Print comments_json and sys.argv for debugging
# print("Received JSON data:", comments_json)
# # print("Command-line arguments:", sys.argv)

# # try:
# #     # Parse JSON string into a Python object (list of comments)
# #     comments = json.loads(comments_json)

# #     # Process the comments data as needed
# #     for comment in comments:
# #         # Example: Print each comment
# #         print(comment)
# # except json.JSONDecodeError as e:
# #     print("Error decoding JSON:", str(e))





# app=Flask(__name__)

# # @app.route('/api/ml')

# def predict():
#     json_file = open('C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api\\modelepoch5.json', 'r')
#     loaded_model_json = json_file.read()

#     json_file.close()
#     loaded_model = model_from_json(loaded_model_json)
#     # load weights into new model
#     # loaded_model.load_weights("modelepoch1.weights.h5")
#     #print("Loaded model from disk")
#     #loaded_model.summary()

#     MAX_FEATURES=200000
#     vectorizer = TextVectorization(max_tokens=MAX_FEATURES,
#                                 output_sequence_length=1800,
#                                 output_mode='int')
    
#     comment="Thats not a good thing that you are hating on me."
#     vectorizer.adapt([comment])
#     vectorized_comment = vectorizer(comment)
#     print("This is vectorized comment", vectorized_comment)
#     res = loaded_model.predict(np.expand_dims(vectorized_comment,0))
#     print("This is result", res)
#     # results = loaded_model.predict(vectorized_comment)
#     #print(res)
#     #text = ''
#     #for idx, col in enumerate(col_list):
#         #text += '{}: {}\n'.format(col, res[0][idx]>0.5)
#     #print(text)
    
#     #new_df = pd.DataFrame(columns=col_list, data=res)
#     #print(new_df.head)
#     return {'toxicity':res[0]}
#     # if __name__ == '__main__':
#     #     app.run()

# predict()
        








# from flask import Flask
# import os
# os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
# import tensorflow as tf
# from tensorflow.keras.layers import TextVectorization
# import numpy as np
# import pandas as pd
# from tensorflow.keras.models import model_from_json

# app = Flask(__name__)

# # Load model and vectorizer
# json_file = open('modelepoch5.json', 'r')
# loaded_model_json = json_file.read()
# json_file.close()
# loaded_model = model_from_json(loaded_model_json)
# loaded_model.load_weights("modelepoch5.weights.h5")  # Load weights

# MAX_FEATURES = 200000
# vectorizer = TextVectorization(max_tokens=MAX_FEATURES,
#                                output_sequence_length=1800,
#                                output_mode='int')

# # Fit the vectorizer to your data
# # Assuming you have a dataset X_train containing text data
# # vectorizer.adapt(X_train)

# @app.route('/api/ml')
# def predict():
#     comment = "That's not a good thing that you are hating on me."
#     vectorized_comment = vectorizer(np.array([comment]))
#     res = loaded_model.predict(vectorized_comment)
#     return {'toxicity': float(res[0])}

# if __name__ == '__main__':
#     app.run()










import logging
import sys
import json
from flask import Flask
import tensorflow as tf
import pandas as pd
from tensorflow.keras.layers import TextVectorization
import numpy as np
from tensorflow.keras.models import model_from_json
import codecs
sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

app = Flask(__name__)

def predict():
    # Load model and vectorizer
    

    json_file = open('C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api\\modelepoch5.json', 'r', encoding='utf-8')

    logging.getLogger('tensorflow').setLevel(logging.ERROR)  # Suppress warnings
    loaded_model_json = json_file.read()
    json_file.close()
    loaded_model = model_from_json(loaded_model_json)

    MAX_FEATURES=200000
    vectorizer = TextVectorization(max_tokens=MAX_FEATURES, output_sequence_length=1800, output_mode='int')

    comment = "That's not a good thing that you are hating on me."
    vectorizer.adapt([comment])
    vectorized_comment = vectorizer(comment)

    # print(vectorized_comment)
    res = loaded_model.predict(np.expand_dims(vectorized_comment,0))
    toxicity_level = res[0].tolist()  # Convert numpy array to list
    # print("Toxicity level:", toxicity_level)

    return {'toxicity': toxicity_level}

result = predict()
print(json.dumps(result))












# import sys
# import json
# from tensorflow.keras.layers import TextVectorization
# import numpy as np
# from tensorflow.keras.models import model_from_json
# import codecs

# sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer)

# def predict_toxicity(comment):
#     # Load model and vectorizer
#     json_file = open('C:\\Users\\Nitish Sharma\\Desktop\\project\\SMP-mini-project\\Sociofy\\api\\modelepoch5.json', 'r', encoding='utf-8')

#     loaded_model_json = json_file.read()
#     json_file.close()
#     loaded_model = model_from_json(loaded_model_json)

#     MAX_FEATURES=200000
#     vectorizer = TextVectorization(max_tokens=MAX_FEATURES, output_sequence_length=1800, output_mode='int')
    
#     # Vectorize the comment
#     vectorized_comment = vectorizer(np.array([comment]))
    
#     # Make prediction
#     prediction = loaded_model.predict(vectorized_comment)
    
#     # Return the prediction as a JSON object
#     return {'toxicity': float(prediction[0][0])}

# if __name__ == "__main__":
#     # Example usage
#     comment = "That's not a good thing that you are hating on me."
#     result = predict_toxicity(comment)
#     print(json.dumps(result))  # Output only valid JSON data

