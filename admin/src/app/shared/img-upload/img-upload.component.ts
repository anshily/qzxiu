import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {NzMessageService} from "ng-zorro-antd";
import {ModalHelper} from "@delon/theme";
import {CropperComponent} from "@shared/cropper/cropper.component";

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styles: []
})
export class ImgUploadComponent implements OnInit,OnChanges{

  @Output() remoteSrc: EventEmitter<any> = new EventEmitter();
  @Input() toShow;
  remoteImg;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.toShow)

    if (changes.toShow.currentValue) {
      console.log(changes.toShow.currentValue);
      this.remoteImg = IMG_URL + changes.toShow.currentValue;

    }else {
      console.log('there is no value');
    }
  }

  constructor(public alert: NzMessageService, private modal: ModalHelper) { }

  ngOnInit() {

    if (this.toShow){
      console.log(this.toShow);
      this.remoteImg = IMG_URL + this.toShow;
    }else {
      console.log('there is no value to show');
    }
  }

  openUploadFileInput(){
    const selectInput = document.getElementById("file_button");
    selectInput.click();
  }

  updateImgFile(event) {
    // console.log(event)
    const file = event.target.files[0] || event.dataTransfer.files[0];
    if (file === undefined) {
      this.alert.warning('请选择图片');
    } else if (file.size > 115343360) {
      this.alert.warning('图片不大于10MB');
    }else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {

        this.modal
          .createStatic(CropperComponent, { event: event })
          .subscribe((res) => {
            console.log(res)
            if (res && res.url){
              this.remoteSrc.emit(res.url);
              this.remoteImg = IMG_URL+ res.url;
            }
          });

      };
      reader.readAsDataURL(file);
    } else {
      this.alert.warning('图片格式错误，要求是jpg、jpeg、png格式。');
    }
  }
}
