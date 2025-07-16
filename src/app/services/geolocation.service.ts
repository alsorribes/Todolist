import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  constructor() { }

  /** Obtiene la posición actual */
  async getCurrentPosition(): Promise<{ lat: number; lng: number }> {
  console.log('Servei: intentant obtenir posició...');
  try {
    const coord = await Geolocation.getCurrentPosition();
    console.log('Servei: coordenades obtingudes:', coord);
    return {
      lat: coord.coords.latitude,
      lng: coord.coords.longitude
    };
  } catch (error) {
    console.error('Servei: error obtenint posició:', error);
    throw error;
  }
}

  /** Inicia el watch y devuelve el ID (string) */
  async startWatch(): Promise<string> {
    const watchId = await Geolocation.watchPosition({}, (position) => {
      console.log('pos watch', position);
    });
    return watchId;
  }

  /** Detiene el watch dado su ID */
  async clearWatch(id: string): Promise<void> {
    await Geolocation.clearWatch({ id });
  }
}
