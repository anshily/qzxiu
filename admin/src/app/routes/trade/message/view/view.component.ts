import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-trade-message-view',
  templateUrl: './view.component.html',
})
export class TradeMessageViewComponent implements OnInit {
  record: any = {};
  info: any;
  IMG_URL = IMG_URL;
  sourceShop: any;
  currentShop: any;

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`${ROOT_URL}/shop/message/detail`,{id: this.info.shopid}).subscribe(res => {
      console.log(res)
      if (res['code'] == 0){
        this.currentShop = res['data']
      }
    });
    this.http.get(`${ROOT_URL}/shop/message/detail`,{id: this.info.sourceid}).subscribe(res => {
      console.log(res)
      if (res['code'] == 0){
        this.sourceShop = res['data']
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
