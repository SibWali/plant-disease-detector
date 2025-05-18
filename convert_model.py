import tensorflow as tf
import os
import shutil

# Load the model
model = tf.keras.models.load_model('backend/model.h5')

# Create output directory
model_dir = 'public/model'
if os.path.exists(model_dir):
    shutil.rmtree(model_dir)
os.makedirs(model_dir)

# Save the model in TensorFlow.js format
model.save(model_dir, save_format='tf')

print(f"Model saved in TensorFlow.js format at {model_dir}")
print("Files generated:")
for file in os.listdir(model_dir):
    print(f"- {file}")

print("\nPlease run 'vercel --prod' to deploy the changes.")