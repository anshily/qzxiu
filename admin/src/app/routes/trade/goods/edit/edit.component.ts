import { Component, OnInit, ViewChild } from '@angular/core';
import {NzModalRef, NzMessageService, UploadFile} from 'ng-zorro-antd';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {SFSchema, SFUISchema, SFUploadWidgetSchema} from '@delon/form';
import {CropperComponent} from "@shared/cropper/cropper.component";

@Component({
  selector: 'app-trade-goods-edit',
  templateUrl: './edit.component.html',
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
export class TradeGoodsEditComponent implements OnInit {
  record: any = {};
  params: any;
  receiveContent: string;
  receivePicture: string;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '姓名', maxLength: 15 },
      price: { type: 'number', title: '价格' },
      picUploader: {
        type: 'string',
        title: '封面图',
        ui: {
          widget: 'custom',
          grid: { span: 24 }
        },
        default: 'test',
      },
    // file: {
    //   type: 'string',
    //   title: '封面图',
    //   ui: {
    //     widget: 'upload',
    //     action: ROOT_URL + 'shop/message/uploadPicture',
    //     resReName: 'data',
    //     urlReName: 'url',
    //     fileType: 'image/png,image/jpeg,image/gif,image/bmp',
    //     name: 'image'
    //   } as SFUploadWidgetSchema,
    // },
    custom: {
      type: 'string',
      title: '描述',
      ui: {
        widget: 'custom',
        grid: { span: 24 }
      },
      default: 'test',
    }
    },
    required: ['name', 'price'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $name: {
      widget: 'string',
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private modalHelper: ModalHelper
  ) {}

  ngOnInit(): void {
    if (this.params.isEdit){
      let item = this.params.item
      this.receiveContent = item['represent'];
      this.receivePicture = item['goodspicture'];
      this.schema = {
        properties: {
          name: { type: 'string', title: '商品名称', maxLength: 15, default: item['goodsname'] },
          price: { type: 'number', title: '价格', default: item['goodsprice'] },
          personmoney: { type: 'number', title: '推荐人利润', default: item['personmoney'] },
          positionmoney: { type: 'number', title: '地区代理利润', default: item['positionmoney'] },
          // personmoney: 60
          // positionmoney: 70
          picUploader: {
            type: 'string',
            title: '封面图',
            ui: {
              widget: 'custom',
              grid: { span: 24 }
            },
            default: 'test',
          },
          // file: {
          //   type: 'string',
          //   title: '封面图',
          //   ui: {
          //     widget: 'upload',
          //     action: IMG_URL + `files/uploadPicture`,
          //     resReName: 'data',
          //     urlReName: 'url',
          //     fileType: 'image/png,image/jpeg,image/gif,image/bmp',
          //     name: 'image',
          //     data: {
          //       token: 'anshi',
          //       prefix: 'qzx'
          //     }
          //   } as SFUploadWidgetSchema
          // },
          custom: {
            type: 'string',
            title: '描述',
            ui: {
              widget: 'custom',
              grid: { span: 24 }
            },
            default: 'test',
          }
        },
        required: ['name', 'price'],
      };
    }else {
      this.schema = {
        properties: {
          name: { type: 'string', title: '商品名称', maxLength: 15 },
          price: { type: 'number', title: '价格' },
          personmoney: { type: 'number', title: '推荐人利润' },
          positionmoney: { type: 'number', title: '地区代理利润' },
          // dan: { type: 'number', title: '单店推广利润'},
          // dai: { type: 'number', title: '代理推广利润' },
          // file: {
          //   type: 'string',
          //   title: '封面图',
          //   ui: {
          //     widget: 'upload',
          //     action: IMG_URL + `files/uploadPicture`,
          //     resReName: 'data',
          //     urlReName: 'url',
          //     fileType: 'image/png,image/jpeg,image/gif,image/bmp',
          //     name: 'image',
          //     data: {
          //       token: 'anshi',
          //       prefix: 'qzx'
          //     }
          //   } as SFUploadWidgetSchema
          // },
          picUploader: {
            type: 'string',
            title: '封面图',
            ui: {
              widget: 'custom',
              grid: { span: 24 }
            },
            default: 'test',
          },
          custom: {
            type: 'string',
            title: '描述',
            ui: {
              widget: 'custom',
              grid: { span: 24 }
            },
            default: 'test',
          }
        },
        required: ['name', 'price'],
      };
    }
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  updateContent(e){
    console.log(e)
    this.receiveContent = e;
  }

  updateImg(e){
    console.log(e)
    this.receivePicture = e;
  }

  save(value: any) {
    console.log(value)
    let params = {
      goodsname: value.name,
      goodsprice: value.price,
      goodspicture: this.receivePicture,
      positionmoney: value.positionmoney,
      personmoney: value.personmoney,
      represent: this.receiveContent,
      token: localStorage.getItem('user_token')
    }
    console.log(params);
    this.http.post(ROOT_URL + `goods/message/addGoods`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['data']);
      }
    });
  }
  updateInfo(value: any) {
    console.log(value)
    let params = {
      id: this.params.item.id,
      goodsname: value.name,
      goodsprice: value.price,
      goodspicture: this.receivePicture,
      positionmoney: value.positionmoney,
      personmoney: value.personmoney,
      represent: this.receiveContent,
      token: localStorage.getItem('user_token')
    }
    console.log(params);
    this.http.post(ROOT_URL + `goods/message/update`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('修改成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['data']);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
