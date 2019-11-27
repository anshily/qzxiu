import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImgComponent } from './upload-img.component';
import {ProcessService} from "@shared/process.service";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ProcessService],
  // exports: [UploadImgComponent],
  // declarations: [UploadImgComponent]
})
export class ZiUploadImgModule { }
