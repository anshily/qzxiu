import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFUISchema, SFUploadWidgetSchema} from '@delon/form';

@Component({
  selector: 'app-trade-goods-edit',
  templateUrl: './edit.component.html',
})
export class TradeGoodsEditComponent implements OnInit {
  record: any = {};
  i: any;
  receiveContent: 'aaaa';
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '姓名', maxLength: 15 },
      price: { type: 'number', title: '价格' },
    file: {
      type: 'string',
      title: '封面图',
      ui: {
        widget: 'upload',
        action: ROOT_URL + 'shop/message/uploadPicture',
        resReName: 'data',
        urlReName: 'url',
        fileType: 'image/png,image/jpeg,image/gif,image/bmp',
        name: 'image'
      } as SFUploadWidgetSchema,
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
    required: ['name', 'price', 'file'],
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
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0)
    this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  updateContent(e){
    console.log(e)
    this.receiveContent = e;
  }

  save(value: any) {
    console.log(value)
    let params = {
      goodsname: value.name,
      goodsprice: value.price,
      goodspicture: value.file,
      represent: this.receiveContent
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

  close() {
    this.modal.destroy();
  }
}