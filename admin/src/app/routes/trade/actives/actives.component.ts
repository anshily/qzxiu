import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeActivesEditComponent} from "./edit/edit.component";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Component({
  selector: 'app-trade-actives',
  templateUrl: './actives.component.html',
})
export class TradeActivesComponent implements OnInit {
  url = ROOT_URL + `activity/list`;

  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        // item['picture_address'] = IMG_URL + item['picture_address'];
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
    { title: '活动名称', index: 'activityname' },
    // { title: '活动状态', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '编辑', click: (item: any) => {
          this.edit(item)
          } },
        { text: '删除', click: (item: any) => {
          this.delete(item.id)
          }, pop: '确认删除？' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,  private msgSrv: NzMessageService) { }

  ngOnInit() {
    let token = localStorage.getItem('user_token');
    let role = localStorage.getItem('user_role');
    !(token && role && role == '总店管理员') && this.router.navigateByUrl('/passport/login').then()
  }

  add() {
    this.modal
      .createStatic(TradeActivesEditComponent, { params: { isEdit: false }})
      .subscribe(() => this.st.reload());
  }

  edit(item) {
    this.modal
      .createStatic(TradeActivesEditComponent, { params: { info: item, isEdit: true } })
      .subscribe(() => this.st.reload());
  }

  delete(id) {
    this.http.get(ROOT_URL + 'activity/delete',{id: id}).subscribe(res => {
      console.log(res)
      if (res['code'] == 0){
        this.msgSrv.success('删除成功');
        this.st.reload();
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

}
