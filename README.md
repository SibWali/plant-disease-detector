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

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd plant-disease-detector
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Ensure your `model.h5` file is in the root directory of the project.

## Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is compatible with Vercel deployment. To deploy:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy

Note: Make sure to include your `model.h5` file in the deployment.

## Model Information

The application uses a pre-trained Keras model that can detect the following plant diseases:
- Healthy
- Bacterial Leaf Blight
- Brown Spot
- Leaf Blast

## Tech Stack

- Next.js 14
- React 18
- TensorFlow.js
- Tailwind CSS
- TypeScript

## License

MIT 