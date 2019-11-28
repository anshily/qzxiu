import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-trade-users-view',
  templateUrl: './view.component.html',
})
export class TradeUsersViewComponent implements OnInit {
  record: any = {};
  user: any;
  relateShop: any;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get(`${ROOT_URL}/user/${this.record.id}`).subscribe(res => {
      console.log(res)
      if (res['code'] == 0) {
        this.relateShop = res['data']
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
