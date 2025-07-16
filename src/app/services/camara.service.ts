import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  public lastPhoto: string | undefined;

  async takePicture(): Promise<string | undefined> {
    const image: Photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });

    if (image && image.webPath) {
      this.lastPhoto = image.webPath;
      return this.lastPhoto;
    } else {
      console.error('No se pudo obtener la imagen de la cámara');
      return undefined;
    }
  }
}