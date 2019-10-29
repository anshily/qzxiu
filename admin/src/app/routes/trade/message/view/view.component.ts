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

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    // this.http.get(`${ROOT_URL}/record/detail`,{id: this.info.id}).subscribe(res => {
    //   console.log(res)
    // });
  }

  close() {
    this.modal.destroy();
  }
}
