import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFSelectWidgetSchema, SFUISchema, SFUploadWidgetSchema} from '@delon/form';

@Component({
  selector: 'app-trade-shops-edit',
  templateUrl: './edit.component.html',
})
export class TradeShopsEditComponent implements OnInit {
  record: any = {};
  recommendList = [];
  receiveContent: 'aaaa';
  i: any;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '用户名' },
      password: { type: 'string', title: '密码' },
      phone: { type: 'string', title: '电话' },
      shopName: { type: 'string', title: '店铺名', maxLength: 15 },
      shopAddress: { type: 'string', title: '地址', maxLength: 15 },
      shopType: { type: 'number', title: '店铺类型',enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      recommendID: { type: 'number', title: '推荐人', enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      positionID: { type: 'number', title: '描述', enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      file: {
        type: 'string',
        title: '门面图',
        ui: {
          widget: 'upload',
          action: ROOT_URL + 'shop/message/uploadPicture',
          resReName: 'data',
          urlReName: 'url',
          fileType: 'image/png,image/jpeg,image/gif,image/bmp',
          name: 'image'
        } as SFUploadWidgetSchema,
      }
    },
    required: ['username', 'password', 'shopName', 'shopAddress', 'shopType', 'recommendID', 'positionID', 'file', 'phone'],
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
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  updateContent(e){
    console.log(e)
    this.receiveContent = e;
  }

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    // console.log(this.i)
    // if (this.record.id > 0)
    // this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
    //   if (res['code'] == 0) {
    //     this.recommendList = res['data'];
    //   }
    // });

    this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
      if (res['code'] == 0) {
        this.recommendList = res['data'];
        let reList = []
        this.recommendList.forEach(item => {
          reList.push({
            label: item['shopname'],
            value: item['id']
          })
        })

        this.schema = {
          properties: {
            username: { type: 'string', title: '用户' },
            password: { type: 'string', title: '密码' },
            phone: { type: 'string', title: '电话' },
            shopName: { type: 'string', title: '店铺名', maxLength: 15 },
            shopAddress: { type: 'string', title: '地址', maxLength: 15 },
            shopType: { type: 'number', title: '店铺类型',enum: [
                { label: '省代理', value: 1 },
                { label: '市代理', value: 2 },
                { label: '县代理', value: 3 },
              ],
              default: 1,
              ui: {
                widget: 'select',
              } as SFSelectWidgetSchema },
            recommendID: { type: 'number', title: '推荐人', enum: [
                ...reList
              ],
              default: reList[0].value,
              ui: {
                widget: 'select',
              } as SFSelectWidgetSchema },
            positionID: { type: 'number', title: '代理人', enum: [
                ...reList
              ],
              default: reList[0].value,
              ui: {
                widget: 'select',
              } as SFSelectWidgetSchema },
            file: {
              type: 'string',
              title: '门面图',
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
          required: ['username', 'password', 'shopName', 'shopAddress', 'shopType', 'recommendID', 'positionID', 'file', 'phone'],
        };

      }
    });

  }

  save(value: any) {
    let params = {
      user: {
        username: value.username,
        password: value.password
      },
      shopMessage: {
        owner_phone: value.phone,
        shoptype_id: value.shopType,
        shopname: value.shopName,
        shoppicture: value.file,
        shopaddress: value.shopAddress,
        description: this.receiveContent
      },
      recommendID: value.recommendID,
      positionID: value.positionID
    }
    this.http.post(ROOT_URL + `shop/message/saveUserAndShopMessageAndGrading`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['msg']);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
