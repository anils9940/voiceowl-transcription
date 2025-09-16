# VoiceOwl Transcription Frontend

This is the frontend for the VoiceOwl Transcription service. It provides a user interface for transcribing audio files.

## Features

- Upload audio files for transcription
- View the status of transcriptions
- View the transcribed text

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/voiceowl-transcription.git
   cd voiceowl-transcription/client
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The application will be running on `http://localhost:3000`.

## Deployment

To deploy the application, you can use a service like Vercel or Netlify.

### Vercel

1. Create a new Vercel project.
2. Connect your Git repository.
3. Vercel will automatically detect that you are using Vite and will configure the build settings for you.
4. Deploy the application.

### Netlify

1. Create a new Netlify site.
2. Connect your Git repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist`.
5. Deploy the application.
