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

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    // this.http.get(`/user/${this.record.id}`).subscribe(res => this.i = res);
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
