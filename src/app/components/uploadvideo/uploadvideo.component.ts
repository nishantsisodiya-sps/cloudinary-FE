import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CloudinaryserviceService } from 'src/app/services/cloudinaryservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.component.html',
  styleUrls: ['./uploadvideo.component.css'],
})
export class UploadvideoComponent {
  selectedVideoFile: File | null = null;
  loading: boolean = true;
  constructor(
    private cloud: CloudinaryserviceService,
    private spinner: NgxSpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  setVideo(event: any) {
    this.selectedVideoFile = event.target.files[0];
  }

  async uploadFile(
    file: File,
    type: string,
    timestamp: any,
    signature: any
  ): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', environment.UPLOAD_PRESET);
    formData.append('cloud_name', environment.CLOUD_NAME);
    formData.append('api_key', environment.API_KEY);

    try {
      return new Promise<string>((resolve, reject) => {
        this.cloud.uploadImage(formData).subscribe(
          (res: any) => {
            return resolve(res.secure_url);
          },
          (error: any) => {
            return reject(error);
          }
        );
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async getSignatureForUpload(
    folder: string
  ): Promise<{ timestamp: any; signature: any }> {
    try {
      return this.cloud.getSignature(folder).toPromise();
    } catch (error) {
      console.error('Error getting signature:', error);
      throw error;
    }
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    try {
      this.spinner.show();

      const response = await this.getSignatureForUpload('rangers');

      if (response && response.timestamp && response.signature) {
        const { timestamp: videoTimestamp, signature: videoSignature } =
          response;

        if (this.selectedVideoFile) {
          const videoUrl = await this.uploadFile(
            this.selectedVideoFile,
            'video',
            videoTimestamp,
            videoSignature
          );
          console.log('Video uploaded:', typeof videoUrl);

          this.cloud.sendToDB(videoUrl).subscribe((res) => {
            if (res) {
              this.spinner.hide();
              this._snackBar.open('Successfully sent to DB', '', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'right',
              });
            }
          });
        }
      } else {
        console.error('Invalid response from backend:', response);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  }
}
