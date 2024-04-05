import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadvideoComponent } from './components/uploadvideo/uploadvideo.component';
import { EditComponent } from './components/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'upload' },
  { path: 'upload', component: UploadvideoComponent },
  {path : 'edit' , component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
