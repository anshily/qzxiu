import {Component, OnInit} from '@angular/core';
import {ImageCroppedEvent} from "ngx-image-cropper";
import {NzMessageService, NzModalRef} from "ng-zorro-antd";
import {ProcessService} from "@shared/process.service";

@Component({
  selector: 'zi-image-cropper',
  template: `
    <div class="modal-header">
      <div class="modal-title">请选择图片</div>
    </div>
    <div>
      <div id="cropperDiv" style="width: 100%;height:400px;background-color: #B3B3B3">
        <image-cropper
          [imageChangedEvent]="imageChangedEvent"
          [maintainAspectRatio]="false"
          [resizeToWidth]="500"
          [imageQuality]="38"
          format="png"
          (imageCropped)="imageCropped($event)"
          (imageLoaded)="imageLoaded()"
          (loadImageFailed)="loadImageFailed()"
        ></image-cropper>
      </div>
    </div>
    <div class="modal-footer">
      <!--<button nz-button type="button" (click)="close()">关闭</button>-->
      <div [style.textAlign]="'center'" [style.position]="'absolute'" [style.left]="'24px'"  [style.height]="previewHeight + 'px'" [style.backgroundColor]="'#B3B3B3'">
        <img *ngIf="previewImage" [src]="previewImage" [style.height]="previewHeight + 'px'" >
      </div>

      <div style="height: 100px;line-height: 150px">
        <button *ngIf="!imageChangedEvent" nz-button nzType="primary" style="width: 90px;margin-bottom: 0;margin-left: 10px" (click)="openSelectImg()">
          <input (change)="updateImgFile($event)" id="file_button" type="file" accept="image/png,image/jpg, image/jpeg" class="custom-file-input" style="display: none">
          选择图片
        </button>
        <button nz-button nzType="primary" (click)="setImgAndCloseModal()">确定</button>
      </div>
    </div>
  `,
  styles: [
    `
      i[nz-icon] {
        font-size: 32px;
        color: #999;
      }
      .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    `
  ]
})
export class CropperComponent implements OnInit {
  event;
  imageChangedEvent: any;
  croppedImage: any = '';
  previewImage: any = '';
  public previewHeight: number = 100;

  constructor(public alert: NzMessageService, public processService: ProcessService, private modal: NzModalRef) {
  }

  ngOnInit(){
    // console.log(this.event)
    this.imageChangedEvent = this.event
  }

  openSelectImg(){
    const selectInput = document.getElementById("file_button");
    selectInput.click();
  }

  updateImgFile(event) {
    console.log(event)

    const file = event.target.files[0] || event.dataTransfer.files[0];
    if (file === undefined) {
      this.alert.warning('请选择图片');
    } else if (file.size > 115343360) {
      this.alert.warning('图片不大于10MB');
    }else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.imageChangedEvent = event;

      };
      reader.readAsDataURL(file);
    } else {
      this.alert.warning('图片格式错误，要求是jpg、jpeg、png格式。');
    }
  }
  // 点击确定传输图片
  setImgAndCloseModal() {
    if (this.croppedImage) {
      console.log('start upload image')
      this.processService.show();
      this.processService.drawFrame(0);
      const formData = new FormData();
      formData.append('image', this.croppedImage, 'image');
      formData.append('token','anshi');
      formData.append('prefix','qzx');

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (ev) => {
        this.uploadProgress(ev);
      }, false);
      xhr.addEventListener('load', (ev) => (this.uploadComplete(ev)), false);
      xhr.addEventListener('error', this.uploadFailed, false);
      xhr.addEventListener('abort', this.uploadCanceled, false);
      xhr.open('POST', IMG_URL + 'files/uploadPicture');
      xhr.send(formData);
      return true;
    }else {
      return false;
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.previewImage = event.base64;
    this.croppedImage = event.file;
  }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  // 上传中 上传进度控制
  uploadProgress(evt) {
    this.processService.drawFrame(evt.loaded / evt.total * 100);
  }

  // 上传完成
  uploadComplete(evt) {

    this.processService.drawFrame(100);
    setTimeout(() => {
      this.processService.hide();
    }, 200);

    this.modal.destroy({
      url: JSON.parse(evt.target.responseText)['data']
    })

  }

  // 中止图片上传后
  uploadCanceled(evt) {
    console.log(evt);
  }

  // 上传失败
  uploadFailed(evt) {
    console.log(evt);
  }
}
