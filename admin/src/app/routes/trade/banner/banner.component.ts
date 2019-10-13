import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeBannerEditComponent} from "./edit/edit.component";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-trade-banner',
  templateUrl: './banner.component.html',
})
export class TradeBannerComponent implements OnInit {
  url = ROOT_URL + `roll/picture/list`;

  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        item['picture_address'] = IMG_URL + item['picture_address'];
        return item;
      });
    }
  }

  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '备注', index: 'note' },
    { title: '活动id', type: 'number', index: 'activityid' },
    { title: '缩略图', type: 'img', width: '50px', index: 'picture_address' },
    { title: '时间', type: 'date', index: 'updatetime' },
    {
      title: '操作',
      buttons: [
        { text: '上架', click: (item) => {
          this.putUp(item.id)
          }, iif: (item) => {
            return item.isputon == 0
          } },
        { text: '下架', click: (item) => {
            this.putDown(item.id)
          }, iif: (item) => {
          return item.isputon == 1
          }  },
        { text: '编辑', click: (item: any) => {
          this.edit(item.id)
          } },
        { text: '删除', click: (item: any) => {
            this.delete(item.id)
          }, pop: '确认删除？' }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(TradeBannerEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

  edit(id) {
    this.modal
      .createStatic(TradeBannerEditComponent, { params: { id: id, edit: true } })
      .subscribe(() => this.st.reload());
  }

  delete(id) {
    this.http.get(ROOT_URL + 'roll/picture/deletePicture',{id: id}).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('删除成功');
        this.st.reload()
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

  putUp(id) {
    this.http.get(ROOT_URL + 'roll/picture/putOnPicture',{id: id}).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('上架成功');
        this.st.reload()
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

  putDown(id) {
    this.http.get(ROOT_URL + 'roll/picture/putDownPicture',{id: id}).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('下架成功');
        this.st.reload()
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

}
