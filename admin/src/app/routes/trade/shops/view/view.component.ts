import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import {_HttpClient, ModalHelper} from '@delon/theme';
import {TradeShopsEditComponent} from "../edit/edit.component";
import {TradeShopsReferrerComponent} from "../referrer/referrer.component";

@Component({
  selector: 'app-trade-shops-view',
  templateUrl: './view.component.html',
})
export class TradeShopsViewComponent implements OnInit {
  record: any = {};
  i: any;
  itemId: any;

  proxyValue: any;
  recommendValue: any;
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private modalHelper: ModalHelper
  ) { }

  // cashin: 0
  // cashout: 0
  // createtime: null
  // description: "<p><img src="http://localhost:8081/../uploads/20190928/b548f942-6f24-4387-a973-8e84ba338029.jpg"></p><p><br></p><p><br></p><p>哈哈哈哈哈</p>"
  //   id: 30
  // owner_phone: "111"
  // profit: 0
  // recommmend_type: null
  // shopaddress: "111"
  // shopname: "11"
  // shoppicture: "../uploads/assets/index1.jpg"
  // shoptype_id: 1
  // shoptype_name: null
  // statu: 1
  // updatetime: null
  // userid: 168

  ngOnInit(): void {
    this.http.get(ROOT_URL + 'shop/message/detail', {id: this.itemId}).subscribe(res => {

      if (res['code'] == 0 ){
        this.record = res['data'];
      }
      // this.record
    });

    this.http.get(ROOT_URL + 'shop/message/getFShopMessage', {shopid: this.itemId}).subscribe(res => {

      console.log(res)
      if (res['code'] == 0 ){
        // this.record = res['data']
        this.record['person'] = res['data']['person']['shopname'];
        this.record['position'] = res['data']['position']['shopname'];
      }
      // this.record
    });
  }

  edit(itemType) {
  this.modalHelper.createStatic(TradeShopsReferrerComponent, { params: { id: this.record['id'], type: itemType} })
      .subscribe(() => {

      });
  }

  close() {
    this.modal.destroy();
  }
}
