import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadvideoComponent } from './components/uploadvideo/uploadvideo.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'upload' },
  { path: 'upload', component: UploadvideoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
