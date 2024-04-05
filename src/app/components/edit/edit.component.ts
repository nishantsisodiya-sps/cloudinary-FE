import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  private cloudName = environment.CLOUD_NAME;
  private apiKey = environment.API_KEY;
  private apiSecret = environment.API_SECRET;
  constructor(private http: HttpClient) {}

  trimVideo(
    videoUrl: string,
    startTime: number,
    endTime: number
  ): Promise<string> {
    const apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/video/edit`;

    // Construct the request body
    const requestBody = {
      url: videoUrl,
      api_key: this.apiKey,
      api_secret: this.apiSecret,
      transformation: {
        start_offset: startTime,
        end_offset: endTime,
      },
    };

    // Make an HTTP POST request to Cloudinary's API
    return this.http
      .post<any>(apiUrl, requestBody)
      .toPromise()
      .then((response) => response.url)
      .catch((error) => {
        console.error('Error trimming video:', error);
        throw error;
      });
  }
}
