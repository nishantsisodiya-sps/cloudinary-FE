import { Component, OnInit } from '@angular/core';
import { CloudinaryserviceService } from './services/cloudinaryservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'cloudinary';
  files : File[] = []
 
  constructor(private _upload : CloudinaryserviceService){}
  ngOnInit() {
    
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  onRemove(f: any) {
    this.files.splice(this.files.indexOf(f), 1);
  }

  uploadFiles() {
    if (!this.files[0]) {
      alert('No file selected');
      return;
    }

    for (let i = 0; i < this.files.length; i++) {
      const file_data = this.files[i];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'ranger-present');
      data.append('cloud_name', 'ranger');

      this._upload.uploadImage(data).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
