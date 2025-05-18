# Plant Disease Detector

A Next.js web application that uses machine learning to detect diseases in plant leaves. Simply upload an image of a plant leaf, and the application will analyze it using a pre-trained Keras model to identify potential diseases.

## Features

- Drag-and-drop or click-to-upload image interface
- Real-time disease detection using TensorFlow.js
- Clean, nature-inspired UI design
- Loading indicator during analysis
- Mobile-responsive layout

## Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- A pre-trained Keras model (`model.h5`) for plant disease detection
- Python 3.8 or later (for the backend)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/SibWali/plant-disease-detector.git
cd plant-disease-detector
```

2. Install frontend dependencies:
```bash
npm install
# or
yarn install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

4. Ensure your `model.h5` file is in the root directory of the project.

## Development

1. Start the Python backend:
```bash
cd backend
python main.py
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application has two components that need to be deployed separately:

### Frontend (Vercel)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy

### Backend (Choose one)
- Heroku
- Google Cloud Run
- AWS Lambda
- DigitalOcean App Platform

Note: After deploying the backend, update the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project settings.

## Model Information

The application uses a pre-trained Keras model that can detect the following plant diseases:
- Healthy
- Bacterial Leaf Blight
- Brown Spot
- Leaf Blast

## Tech Stack

- Next.js 14
- React 18
- Python FastAPI
- TensorFlow
- Tailwind CSS
- TypeScript

## License

MIT 
