import tensorflow as tf
import json
import os
import shutil

# Create the model directory if it doesn't exist
os.makedirs('public/model', exist_ok=True)

# Load the model
print("Loading model...")
model = tf.keras.models.load_model('backend/model.h5')

# Convert model architecture to JSON
model_json = model.to_json()
with open('public/model/model.json', 'w') as f:
    f.write(model_json)

# Save weights
print("Saving weights...")
model.save_weights('public/model/weights.h5')

print("Model converted successfully!")
print("Files saved in public/model directory") 