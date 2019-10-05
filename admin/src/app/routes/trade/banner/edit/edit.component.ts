import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFSelectWidgetSchema, SFUISchema, SFUploadWidgetSchema} from '@delon/form';

@Component({
  selector: 'app-trade-banner-edit',
  templateUrl: './edit.component.html',
})
export class TradeBannerEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      picture: {
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
      note: { type: 'string', title: '备注' },
      activity: { type: 'number', title: '活动编号',enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema }
    },
    required: ['picture', 'note'],
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

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.record.id > 0)
    this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));

    this.http.get(ROOT_URL + 'activity/getActivityListByStatu',{statu: 1}).subscribe(res => {
      console.log(res)
      if (res['code'] == 0){

        let list = [];

        res['data'].forEach(item => {
          list.push({
            label: item['activityname'],
            value: item['id']
          })
        })
        this.schema = {
          properties: {
            picture: {
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
            note: { type: 'string', title: '备注' },
            activity: { type: 'number', title: '活动编号',enum: list,
              default: 1,
              ui: {
                widget: 'select',
              } as SFSelectWidgetSchema }
          },
          required: ['picture', 'note', 'activity'],
        };
      }
    })
  }

  save(value: any) {
    let params = {
      activityid: value.activity,
      picture_address: value.picture,
      note: value.note
    };
    console.log(params)
    this.http.post(`${ROOT_URL}roll/picture/add`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['message']);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
