import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { TradeUsersViewComponent } from './view/view.component';

@Component({
  selector: 'app-trade-users',
  templateUrl: './users.component.html',
})
export class TradeUsersComponent implements OnInit {
  // url = `/user`;
  url = ROOT_URL + `user/list`;
  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        item['password'] = '***';
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
    { title: '用户名', index: 'username' },
    { title: '密码', index: 'password' },
    {
      title: '',
      buttons: [
        {
          text: '查看', click: (item: any) => {
            this.detail(item)
          }
        },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  detail(item) {
    this.modal
      .createStatic(TradeUsersViewComponent, { user: item })
      .subscribe(() => this.st.reload());
  }

}
