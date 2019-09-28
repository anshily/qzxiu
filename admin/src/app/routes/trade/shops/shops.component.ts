import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeShopsEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-trade-shops',
  templateUrl: './shops.component.html',
})
export class TradeShopsComponent implements OnInit {
  url = ROOT_URL + `shop/message/list`;
  resObj = {
    reName: {
      total: 'data.total',
      list: 'data.list'
    },
    process: (res) => {
      console.log(res);
      return res.map(item => {
        item['shoppicture'] = IMG_URL + item['shoppicture'];
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
    { title: '编号', index: 'id' },
    { title: '店铺名', index: 'shopname' },
    { title: '电话', index: 'owner_phone' },
    { title: '地址', index: 'shopaddress' },
    { title: '缩略图', type: 'img', width: '50px', index: 'shoppicture' },
    { title: '添加时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(TradeShopsEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
