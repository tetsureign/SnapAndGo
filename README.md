# Snap & Go

A Google Lens-like mobile app that detects objects in images and searches for shops that sell them. This is a personal project built with React Native, object detection powered by YOLOv5 and shop search on Google Maps.

This is a university project. Originally a two-person project. You can view it at the branch [uni-project-finalver](/tetsureign/SnapAndGo/tree/uni-project-finalver). I mostly did the React Native app and detection integration. History was saved to a Firebase instance, done by [@SwankyOrcc](https://github.com/SwankyOrcc). I've decided to iterate through this project from time to time and build a separate backend to study.

## Features

- Camera capture using expo-camera
- Image picker support for selecting existing photos
- Object detection via YOLOv5 API
- Detection results with bounding boxes visualization
- Google Maps search integration for detected objects
- Action sheet UI for results interaction

- SoonTM: Users & Search histories

## Design

[Figma Prototype](https://www.figma.com/proto/TVJnAe6SNH8h2RSS8qGMgz/Snap-Go?node-id=1-3&t=gihwzmkpijuaxpk4-1&starting-point-node-id=1%3A3)

## Demo

- TODO: Videos and pictures

## Tech Stack

- **Frontend**: React Native (0.76.9), Expo (~52.0.42)
- **Navigation**: React Navigation (native-stack, bottom-tabs)
- **Camera**: expo-camera
- **Image Processing**: @bam.tech/react-native-image-resizer
- **State Management**: React hooks (useReducer, useState)
- **HTTP Client**: Axios
- **UI**: react-native-actions-sheet
- **Maps**: react-native-maps (with Google Maps integration)
- **Backend**: Fastify ([Repo](/tetsureign/snap-n-go-apiv2))
- **ML Service**: YOLOv5 microservice on FastAPI (separate repo)
- **Language**: TypeScript
- **Tooling**: ESLint, Jest

## Architecture

The app follows a microservices architecture:

```
Mobile App → Fastify Backend → YOLOv5 FastAPI Microservice
```

1. **Mobile App**: Captures or selects an image, sends it to the Fastify backend
2. **Fastify Backend**: Receives the image and forwards it to the YOLOv5 service
3. **YOLOv5 Microservice**: Processes the image and returns detected objects with coordinates and confidence scores
4. **Results Display**: The app visualizes detected objects with bounding boxes and allows users to search for shops selling those items on Google Maps

## Requirements

- Node.js
- pnpm (package manager)
- Expo CLI
- Android Studio / Xcode for local development
- Backend services running (Fastify + YOLOv5 FastAPI)

## Getting Started

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Configure environment variables**:
   Copy `.env.example` to `.env` and use your own values.

3. **Start backend services**:
   Ensure your Fastify backend and YOLOv5 FastAPI microservice are running.

4. **Run the app**:

   ```bash
   # Start Expo dev client
   pnpm start

   # Or run on specific platform
   pnpm run android
   pnpm run ios
   ```

## Environment Variables

- `EXPO_PUBLIC_API_URL` - Fastify backend base URL (e.g., http://localhost:3000)
- `EXPO_PUBLIC_GOOGLE_API_KEY` - Google Maps API key for map integration (not required yet)

## Available Scripts

- `pnpm start` - Start Expo dev client
- `pnpm run android` - Run on Android
- `pnpm run ios` - Run on iOS
- `pnpm run prebuild` - Generate native code
- `pnpm test` - Run Jest tests
- `pnpm run lint` - Run ESLint

## Development Notes

- Uses Expo dev client (not Expo Go)
- EAS Build configured (eas.json present)
- TypeScript path aliases: `@/*` maps to `src/*`
- Detection response format: `{ success: boolean, data: DetectionResultType[] }`
- Images are sent as multipart/form-data with key 'image'
