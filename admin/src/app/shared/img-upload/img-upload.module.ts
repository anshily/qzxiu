import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProcessService} from "@shared/process.service";
import {ImgUploadComponent} from "@shared/img-upload/img-upload.component";
import {SharedModule} from "@shared/shared.module";
import {ImageCropperModule} from "ngx-image-cropper";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ImageCropperModule
  ],
  providers: [ProcessService],
  exports: [ImgUploadComponent],
  // declarations: [ImgUploadComponent]
})
export class ZiImgUploadModule { }
