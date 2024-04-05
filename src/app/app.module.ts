import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudinaryModule } from '@cloudinary/ng';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClientModule } from '@angular/common/http';
import { UploadvideoComponent } from './components/uploadvideo/uploadvideo.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EditComponent } from './components/edit/edit.component';

interface NgxSpinnerConfig {
  type?: string;
}

@NgModule({
  declarations: [AppComponent, UploadvideoComponent, EditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CloudinaryModule,
    NgxDropzoneModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
