import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-trade-actives-edit',
  templateUrl: './edit.component.html',
})
export class TradeActivesEditComponent implements OnInit {
  record: any = {};
  receiveContent: '';
  params: any;
  schema: SFSchema = {
    properties: {
      name: { type: 'string', title: '活动名称', maxLength: 15 },
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
    required: ['name', 'custom'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    if (this.params.isEdit){
      let info = this.params.info;
      this.receiveContent = info['note'];
      this.schema = {
        properties: {
          name: { type: 'string', title: '活动名称', maxLength: 15, default: info['activityname'] },
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
        required: ['name', 'custom'],
      };
    }
    // this.http.get(`/user/${this.record.id}`).subscribe(res => (this.i = res));
  }

  updateContent(e){
    console.log(e)
    this.receiveContent = e;
  }

  save(value: any) {
    let params = {
      activity: {
        note: this.receiveContent,
        activityname: value.name,
      },
      token: localStorage.getItem('user_token')
    }
    this.http.post(`${ROOT_URL}activity/add`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['data']);
      }
    });
  }
  update(value: any) {
    let params = {
      // activity: {
      id: this.params.info.id,
        note: this.receiveContent,
        activityname: value.name,
      // },
      // token: localStorage.getItem('user_token')
    }
    this.http.post(`${ROOT_URL}activity/update`, params).subscribe(res => {
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
