import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.albertsorribes.todolist',
  appName: 'TodolistAPP',
  webDir: 'dist/Todolist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: "default"
    },
    Geolocation: {
      permissions: {
        coarseLocation: "granted",
        fineLocation: "granted"
      }
    },
    Camera: {
      permissions: {
        camera: "granted",
        photos: "granted"
      }
    }
  }
};

export default config;