import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {NzMessageService, NzModalComponent} from "ng-zorro-antd"
import {ProcessService} from "@shared/process.service";
import {ImageCroppedEvent, ImageCropperComponent} from "ngx-image-cropper";
import {QuillEditorComponent} from "ngx-quill";



@Component({
  selector: 'app-quill',
  templateUrl: './editor-quill.component.html'
})

export class EditorQuillComponent implements OnInit {
  @Output() updateContent: EventEmitter<any> = new EventEmitter();
  @Input() content;

  // prefixContent;
  // suffixContent;

  // 光标范围 当前索引 index: 1, 选中长度length: 0
  selectionRange = {
    index: 0,
    length: 0,
    isMod: false
  };


  @Output() updateCropperImg: EventEmitter<any> = new EventEmitter();
  @Input() rule: any = 4 / 3;
  public isShowModal: any = false;
  public isShowImgCropper: any = false;
  // public previewWidth: number = 100 * this.rule;
  public previewHeight: number = 100;
  croData: any;
  // cropperSettings: CropperSettings;
  // @ViewChild('cropper') cropper:ImageCropperComponent;
  @ViewChild('cropperModal',{
    static: false
  }) cropperModal:NzModalComponent;

  @ViewChild('quill', {
    static: true
  }) quill:QuillEditorComponent;


  public data:any = {
    content:''
  };
  public config:any = {
    // imageResize: {},
//    toolbar: [
//      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//      ['blockquote', 'code-block'],
//
//      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//      [{ 'direction': 'rtl' }],                         // text direction
//
//      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//
//      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//      [{ 'font': [] }],
//      [{ 'align': [] }],
//
//      ['clean'],                                         // remove formatting button
//
//      ['link', 'image', 'video']                         // link and image, video
//    ]
  };
  constructor(public ele: ElementRef, public alert: NzMessageService, public processService: ProcessService) { }
  ngOnInit() {

    if (this.content){
      this.data.content = this.content;
    }

    this.croData = {};

    this.cropperModal && this.cropperModal.afterOpen.subscribe(() => {
      this.isShowImgCropper = true;
      // this.cropperSettings = new CropperSettings();
      // this.cropperSettings.noFileInput = true;
      // this.cropperSettings.cropperDrawSettings.strokeColor = '#1890ff';

      // this.cropperSettings.width = 100 * this.rule;
      // this.cropperSettings.height = 100;
      // this.cropperSettings.croppedWidth = 500 * this.rule;
      // this.cropperSettings.croppedHeight = 500;
      // this.cropperSettings.rounded = false;
      // this.cropperSettings.canvasWidth = document.getElementById('cropperDiv').clientWidth;
      // this.cropperSettings.canvasHeight = document.getElementById('cropperDiv').clientHeight;
      // // this.previewWidth = 100 * this.rule;
      // // this.previewHeight = 100;
      //
      //
      // // 设置动态裁剪宽高 应该关闭setting.width setting.height --安石
      // this.cropperSettings.keepAspect =false;
      // this.cropperSettings.keepAspect

      // this.cropperSettings.dynamicSizing = true
    });
  };
  openUploadFileInput(){
    this.isShowModal = true;
  }


  // 上传中 上传进度控制
  uploadProgress(evt) {
    this.processService.drawFrame(evt.loaded / evt.total * 100);
  }

  // 上传完成
  uploadComplete(evt) {
    console.log(evt.target.responseText)
    let img = '<img class="camera" src="'+IMG_URL+ JSON.parse(evt.target.responseText)['data'] +'" alt=""><<br/>';

    // if (this.selectionRange.isMod){
    //   this.data.content = this.insertContent(img);
    // } else {
      this.data.content += img;
    // }
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
  contentChange(){
    this.updateContent.emit(this.data.content);
  }


  openSelectImg(){
    const selectInput = document.getElementById("filebutton");
    selectInput.click();
  }

  onModalHide() {
    this.isShowModal = false;
  }
  updateImgFile(event) {

    const file = event.target.files[0] || event.dataTransfer.files[0];
    if (file === undefined) {
      this.alert.warning('请选择图片');
    } else if (file.size > 115343360) {
      this.alert.warning('图片不大于10MB');
    }else if (file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg') {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        // let image:any = new Image();
        // image.src = reader.result;
        // this.cropper.setImage(image);
        this.imageChangedEvent = event;

      };
      reader.readAsDataURL(file);
    } else {
      this.alert.warning('图片格式错误，要求是jpg、jpeg、png格式。');
    }
  }
  // 点击确定传输图片
  setImgAndCloseModal() {
    console.log('start upload image')
    // console.log(this.croData.image)
    this.isShowModal = false;
    if (this.croppedImage) {
      // this.updateCropperImg.emit(this.croData.image);

      console.log('start upload image')
      this.processService.show();
      this.processService.drawFrame(0);
      const formData = new FormData();
      formData.append('file', this.croppedImage, 'file');
      formData.append('token',localStorage.getItem('loginToken'));
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (ev) => {
        this.uploadProgress(ev);
      }, false);
      xhr.addEventListener('load', (ev) => (this.uploadComplete(ev)), false);
      xhr.addEventListener('error', this.uploadFailed, false);
      xhr.addEventListener('abort', this.uploadCanceled, false);
      xhr.open('POST', ROOT_URL + 'anshi/mp/upload');
      xhr.send(formData);
      return true;
    }else {
      return false;
    }
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';
  previewImage: any = '';

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

  setSelection(e){
    // console.log(e.oldRange)
    // console.log(e.range)
    // console.log(this.data.content)
    if (e.range && e.range['index']){
      this.selectionRange['index'] = e.range['index'];
      this.selectionRange['isMod'] = true;
    }

  }

  insertContent(innerText){
    // 从光标处截断文本内容 将 innerText 插入 并返回新文本
    const prefix = this.data.content.substring(0,this.selectionRange.index+3)
    const suffix = this.data.content.substr(this.selectionRange.index+3)

    return prefix + innerText + suffix;
  }
}

