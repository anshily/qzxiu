import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {TradeGoodsEditComponent} from "./edit/edit.component";

@Component({
  selector: 'app-trade-goods',
  templateUrl: './goods.component.html',
})
export class TradeGoodsComponent implements OnInit {
  url = ROOT_URL + `goods/message/list`;
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
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '名称', index: 'goodsname' },
    { title: '价格', type: 'number', index: 'goodsprice' },
    { title: '图片', type: 'img', width: '50px', index: 'goodspicture' },
    // { title: '描述', index: 'represent' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '操作',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: TradeGoodsEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(TradeGoodsEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
