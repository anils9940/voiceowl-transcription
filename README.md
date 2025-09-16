# VoiceOwl Transcription Backend

This is the backend for the VoiceOwl Transcription service. It provides a RESTful API for managing transcriptions.

## Features

- Transcribe audio files
- Get transcription status
- Get transcription text

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- TypeScript
- Jest
- Kafka

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Docker

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/voiceowl-transcription.git
   cd voiceowl-transcription
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   KAFKA_BROKER=localhost:9092
   ```

### Running Kafka and MongoDB with Docker

To start the required services (Kafka and MongoDB), run the following command:

```bash
npm run services:up
```

To stop the services, run:

```bash
npm run services:down
```

### Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

The server will be running on `http://localhost:5000`.

### Running the Tests

To run the tests, use the following command:

```bash
npm test
```

## API Endpoints

- `POST /api/transcriptions`: Create a new transcription
- `GET /api/transcriptions/:id`: Get the status of a transcription
- `GET /api/transcriptions/:id/text`: Get the text of a transcription

## Deployment

To deploy the application, you can use a service like Heroku or AWS. You will need to set the environment variables in your deployment environment.

### Heroku

1. Create a new Heroku app.
2. Add a MongoDB add-on to your app.
3. Set the `MONGO_URI` and `PORT` environment variables in your Heroku app's settings.
4. Push your code to Heroku:

   ```bash
   git push heroku main
   ```

### AWS

1. Create a new EC2 instance.
2. Install Node.js and MongoDB on the instance.
3. Clone the repository and install the dependencies.
4. Set the environment variables.
5. Start the application using a process manager like PM2.
