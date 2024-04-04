import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryserviceService {
  constructor(private _http: HttpClient) {}

  uploadImage(vals: any): Observable<any> {
    return this._http.post(
      'https://api.cloudinary.com/v1_1/rangers/video/upload',
      vals
    );
  }

  sendToDB(videoUrl: string): Observable<any> {
    console.log('url', videoUrl);
    return this._http.post('http://localhost:5000/videos', { videoUrl });
  }

  getSignature(folder: string): Observable<any> {
    return this._http.post('http://localhost:5000/sign-upload', { folder });
  }
}
