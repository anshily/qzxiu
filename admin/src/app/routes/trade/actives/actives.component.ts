import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeActivesEditComponent} from "./edit/edit.component";
import {Router} from "@angular/router";

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
    { title: '活动状态', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '编辑', type: 'static', component: TradeActivesEditComponent, click: 'reload' },
        { text: '删除', click: (item: any) => `/form/${item.id}` },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('user_token');
    let role = localStorage.getItem('user_role');
    !(token && role && role == '总店管理员') && this.router.navigateByUrl('/passport/login').then()
  }

  add() {
    this.modal
      .createStatic(TradeActivesEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
