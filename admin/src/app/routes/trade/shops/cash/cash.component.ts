import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFSelectWidgetSchema, SFUISchema, SFUploadWidgetSchema} from "@delon/form";

@Component({
  selector: 'app-trade-shops-cash',
  templateUrl: './cash.component.html',
})
export class TradeShopsCashComponent implements OnInit {
  record: any = {};
  params: any;
  loaded = false;
  shopInfo = {};

  schema: SFSchema = {
    properties: {
      cash: { type: 'number', title: '金额' },
      file: {
        type: 'string',
        title: '票据',
        ui: {
          widget: 'upload',
          action: IMG_URL + `files/uploadPicture`,
          resReName: 'data',
          urlReName: 'url',
          fileType: 'image/png,image/jpeg,image/gif,image/bmp',
          name: 'image',
          data: {
            token: 'anshi',
            prefix: 'qzx'
          }
        } as SFUploadWidgetSchema
      },
      note: { type: 'string', title: '备注' }
    },
    required: ['cash', 'file'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string',
    },
    $note: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    console.log(this.shopInfo)
  }

  save(value: any) {
    let params = {
      shopid: this.shopInfo['id'],
      money: value.cash,
      image: value.file
    }

    this.http.post(ROOT_URL + `shop/message/getCashOut`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('转账成功');
        this.modal.close(true);
      }else {
        this.msgSrv.error(res['message']);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
