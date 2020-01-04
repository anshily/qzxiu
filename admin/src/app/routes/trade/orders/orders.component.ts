import {Component, OnInit, ViewChild} from '@angular/core';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {STColumn, STComponent, STReq} from '@delon/abc';
import {SFSchema, SFSelectWidgetSchema} from '@delon/form';
import {Router} from "@angular/router";
import {TradeOrdersEditComponent} from "./edit/edit.component";
import {TradeOrdersViewComponent} from "./view/view.component";

@Component({
  selector: 'app-trade-orders',
  templateUrl: './orders.component.html',
})
export class TradeOrdersComponent implements OnInit {
  url = ROOT_URL + `order/adminGetOrderByStatu`;
  reqObj: STReq = {
    params: {
      statu: 1
    }
  }

  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        switch (item['statu']) {
          case 0:
            item['orderStatus'] = '已取消';
            break;
          case 1:
            item['orderStatus'] = '待审核';
            break;
          case 2:
            item['orderStatus'] = '已完成';
            break;
        }
        return item;
      });
    }
  }
  searchSchema: SFSchema = {
    properties: {
      status: {
        type: 'string',
        title: '订单状态',
        enum: [
          {label: '待审核', value: 1},
          {label: '已取消', value: 0},
          {label: '已完成', value: 2},
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema,
      }
    }
  };
  @ViewChild('st', {static: false}) st: STComponent;
  columns: STColumn[] = [
    // {title: '店铺id', index: 'shopid'},
    {title: '订单编号', index: 'orderid'},
    {title: '价格', type: 'number', index: 'priceall'},
    {title: '创建时间', type: 'date', index: 'createtime'},
    {title: '订单状态', index: 'orderStatus'},
    {
      title: '操作',
      buttons: [
        {text: '查看', click: (item: any) => this.show(item)},
        {
          text: '取消订单', click: (item: any) => {
            this.http.get(ROOT_URL + 'order/cancelOrder', {
              orderid: item.orderid,
              token: localStorage.getItem('user_token')
            }).subscribe(res => {
              if (res['code'] == 0) {
                this.st.reload()
              }
            })
          }, iif: (item) => {
            return item['statu'] == 1
          }, pop: '确认取消？'
        }
        // { text: '', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router) {
  }

  ngOnInit() {
    let token = localStorage.getItem('user_token');
    let role = localStorage.getItem('user_role');
    !(token && role && role == '总店管理员') && this.router.navigateByUrl('/passport/login').then()
  }

  show(item) {
    this.modal
      .createStatic(TradeOrdersViewComponent, {info: item})
      .subscribe((r) => {
        console.log('finish!',r)
        this.st.reload()
      });
  }

  search(ev){
    console.log(ev);
    this.reqObj = {
      params: {
        statu: ev.status
      }
    }
    setTimeout(() => {
      this.st.reload();
    })
  }
}
