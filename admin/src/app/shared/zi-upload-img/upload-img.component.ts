import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {ProcessService} from "@shared/process.service";

@Component({
  selector: 'app-upload-img',
  templateUrl: './upload-img.component.html',
  styles: []
})
export class UploadImgComponent implements OnInit,OnChanges{

  ngOnChanges(changes: SimpleChanges): void {


    if (changes.toShow.currentValue) {
      console.log(changes.toShow.currentValue);
      this.remoteImg = IMG_URL + changes.toShow.currentValue;

      // this.remoteSrc.emit(changes.toShow.currentValue)

    }else {
      console.log('there is no value');
    }

    // throw new Error("Method not implemented.");
  }

  @Output() remoteSrc: EventEmitter<any> = new EventEmitter();
  @Input() toShow;

  remoteImg;

  constructor(public alert: NzMessageService, public processService: ProcessService) { }

  ngOnInit() {

    if (this.toShow){
      console.log(this.toShow);
      this.remoteImg =  this.toShow;
    }else {
      console.log('there is no value to show');
    }
  }

  openUploadFileInput(){
    let uploadFileInput = document.createElement('input');
    uploadFileInput.style.display = 'none';
    uploadFileInput.type = 'file';
    uploadFileInput.accept = 'image/*';
    uploadFileInput.onchange = (ev) => {
      this.fileChange(ev);
    };
    uploadFileInput.click();
  }

  fileChange(event){
    const file = event.target.files[0] || event.dataTransfer.files[0];
    if (file === undefined) {
      this.alert.warning('请选择图片');
    } else if (file.size > 115343360) {
      this.alert.warning('图片不大于10MB');
    }else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = () => {
        this.processService.show();
        this.processService.drawFrame(0);
        const formData = new FormData();
        formData.append('goods', reader.result.toString());
        formData.append('token',localStorage.getItem('loginToken'));
        const xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', (ev) => {
          this.uploadProgress(ev);
        }, false);
        xhr.addEventListener('load', (ev) => (this.uploadComplete(ev)), false);
        xhr.addEventListener('error', this.uploadFailed, false);
        xhr.addEventListener('abort', this.uploadCanceled, false);
        xhr.open('POST', ROOT_URL + 'api/Goods/uploadGoods');
        xhr.send(formData);
      };
      reader.readAsDataURL(file);
    } else {
      this.alert.warning('图片格式错误，要求是jpg、jpeg、png格式。');
    }
  }

  // 上传中 上传进度控制
  uploadProgress(evt) {
    this.processService.drawFrame(evt.loaded / evt.total * 100);
  }

  // 上传完成
  uploadComplete(evt) {
    let img = '<img class="camera" src="'+IMG_URL+ JSON.parse(evt.target.responseText)['data'] +'" alt="">';
    // this.data.content += img;

    // console.log(JSON.parse(evt.target.responseText)['data'].replace(/\\/g,'/'))
    this.remoteSrc.emit(JSON.parse(evt.target.responseText)['data'].replace(/\\/g,'/'))
    this.remoteImg = IMG_URL+ JSON.parse(evt.target.responseText)['data'];
    console.log(this.remoteImg)
    console.log('success')
    this.processService.drawFrame(100);
    setTimeout(() => {
      this.processService.hide();
    }, 200);
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
