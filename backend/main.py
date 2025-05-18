from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = None

@app.on_event("startup")
async def load_model():
    global model
    model = tf.keras.models.load_model("../model.h5")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess the image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))
    
    # Resize and preprocess
    image = image.resize((224, 224))
    image_array = np.array(image)
    image_array = image_array / 255.0
    image_array = np.expand_dims(image_array, axis=0)
    
    # Make prediction
    predictions = model.predict(image_array)
    predicted_class = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class])
    
    # Map class index to disease name
    diseases = [
        'Healthy',
        'Bacterial Leaf Blight',
        'Brown Spot',
        'Leaf Blast'
    ]
    
    return {
        "prediction": diseases[predicted_class],
        "confidence": confidence
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 