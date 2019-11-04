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
  params: any;
  loaded = false;
  options = [];
  itemInfo = {};
  schema: SFSchema = {
    properties: {
      picture: {
        type: 'string',
        title: '封面图',
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

    if (this.params && this.params.edit){
      console.log(this.params.id)
      // isputon: 1
      // note: "1"
      // picture_address: "../uploads/assets/index1.jpg"
      this.initForm().then( () => {
        console.log(this.itemInfo);
          this.schema = {
            properties: {
              picture: {
                type: 'string',
                title: '封面图',
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
              note: { type: 'string', title: '备注',
                default: this.itemInfo['note'] || ''
              },
              activity: { type: 'number', title: '活动编号',enum: this.options,
                default: this.itemInfo['activityid'] || 1,
                ui: {
                  widget: 'select',
                } as SFSelectWidgetSchema }
            },
            // required: ['picture', 'note', 'activity'],
          };
          this.loaded = true;
      }
      )
    }else {
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
              note: { type: 'string', title: '备注' },
              activity: { type: 'number', title: '活动编号',enum: list,
                default: 1,
                ui: {
                  widget: 'select',
                } as SFSelectWidgetSchema }
            },
            required: ['picture', 'note', 'activity'],
          };

          this.loaded = true;
        }
      })
    }
  }

  async initForm(){

    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'roll/picture/detail',{id: this.params.id}).subscribe(res => {
        console.log(1,res)
        if (res['code'] == 0){
          this.itemInfo = res['data'];
          resolve()
        }else {
          reject()
        }
      })
    })

    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'activity/getActivityListByStatu',{statu: 1}).subscribe(res => {
        console.log(2,res)
        if (res['code'] == 0) {
          res['data'].forEach(item => {
            this.options.push({
              label: item['activityname'],
              value: item['id']
            })
          })
          resolve();
        }else {
          reject()
        }
      });
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
  alter(value: any) {
    let params = {
      id: this.itemInfo['id'],
      activityid: value.activity,
      picture_address: value.picture,
      note: value.note
    };
    console.log(params)
    this.http.post(`${ROOT_URL}roll/picture/update`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('修改成功');
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
