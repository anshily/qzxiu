import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeMessageViewComponent} from "./view/view.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-trade-message',
  templateUrl: './message.component.html',
})
export class TradeMessageComponent implements OnInit {
  url = ROOT_URL + `record/list`;
  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        item['goodspicture'] = IMG_URL + item['goodspicture'];
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
  // createtime: "2019-10-17T03:54:14.000+0000"
  // goodspicture: "https://sweet.tiantianquan.xyz/undefined"
  // id: 1
  // image: null
  // money: 4020
  // shopid: 2
  // sourceid: 3
  // statu: 1
  // subscribe: null
  // type: "佣金消息"
  // updatetime: "2019-10-17T03:54:14.000+0000"
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '消息类型', index: 'type' },
    // { title: '描述', index: 'subscribe' },
    // { title: '描述', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'createtime' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => {
          this.show(item)
          } },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
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
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  show(item) {
    this.modal
      .createStatic(TradeMessageViewComponent, { info: item })
      .subscribe(() => this.st.reload());
  }

}
