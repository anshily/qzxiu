import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-trade-orders-view',
  templateUrl: './view.component.html',
})
export class TradeOrdersViewComponent implements OnInit {
  record: any = {};
  info: any;
  shopInfo : any;
  orderInfo : any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`${ROOT_URL}shop/message/detail`,{
      id: this.info['shopid']
    }).subscribe(res => {
      if (res['code'] == 0){
        console.log(res);
        this.shopInfo = res['data']
      }
    });
    this.http.get(`${ROOT_URL}order/selectOrderMessageByOrderid`,{
      orderid: this.info['orderid']
    }).subscribe(res => {
      if (res['code'] == 0){
        console.log(res);
        this.orderInfo = res['data']
      }
    });
  }

  submit(){
    this.http.get(`${ROOT_URL}/order/finishOrder`,{
      orderid: this.info['orderid'],
      token: localStorage.getItem('user_token')
    }).subscribe(res => {
      if (res['code'] == 0){
        this.close()
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
