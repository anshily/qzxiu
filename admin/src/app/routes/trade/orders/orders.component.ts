import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {Router} from "@angular/router";
import {TradeOrdersEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-trade-orders',
  templateUrl: './orders.component.html',
})
export class TradeOrdersComponent implements OnInit {
  url = ROOT_URL + `order/list`;
  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        // item['shoppicture'] = IMG_URL + item['shoppicture'];
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
    { title: '店铺id', index: 'shopid' },
    { title: '价格', type: 'number', index: 'priceall' },
    { title: '订单编号', index: 'orderid' },
    { title: '创建时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => this.show(item) },
        { text: '取消订单', click: (item: any) => {
          this.http.get(ROOT_URL + 'order/cancelOrder',{
            orderid: item.orderid,
            token: localStorage.getItem('user_token')
          }).subscribe(res => {
            if (res['code'] == 0){
              this.st.reload()
            }
          })
          } }
        // { text: '', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router) { }

  ngOnInit() {
    let token = localStorage.getItem('user_token');
    let role = localStorage.getItem('user_role');
    !(token && role && role == '总店管理员') && this.router.navigateByUrl('/passport/login').then()
  }

  show(item) {
    this.modal
      .createStatic(TradeOrdersEditComponent, { info: item })
      .subscribe(() => this.st.reload());
  }

}
