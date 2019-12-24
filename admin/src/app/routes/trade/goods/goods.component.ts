import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STReq } from '@delon/abc';
import { SFSchema, SFSelectWidgetSchema } from '@delon/form';
import { TradeGoodsEditComponent } from "./edit/edit.component";
import { Router } from "@angular/router";
import { TradeGoodsViewComponent } from "./view/view.component";
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-trade-goods',
  templateUrl: './goods.component.html',
})
export class TradeGoodsComponent implements OnInit {
  url = ROOT_URL + `goods/message/getGoodsList`;
  reqObj: STReq = {
    params: {
      statu: 2
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
        item['picture'] = IMG_URL + item['goodspicture'];
        return item;
      });
    }
  }
  searchSchema: SFSchema = {
    properties: {
      status: {
        type: 'string',
        title: '商品状态',
        enum: [
          { label: '已上架', value: 2 },
          { label: '未上架', value: 1 },
          { label: '不可用', value: 0 },
        ],
        default: 2,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema,
      }
    }
  };
  @ViewChild('st', { static: false }) st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '名称', index: 'goodsname' },
    { title: '价格', type: 'number', index: 'goodsprice' },
    { title: '图片', type: 'img', width: '50px', index: 'picture' },
    // { title: '描述', index: 'represent' },
    { title: '商品信息更新时间', type: 'date', index: 'updatetime' },
    {
      title: '操作',
      buttons: [
        {
          text: '上架', click: (item) => {
            this.putUp(item.id)
          }, iif: (item) => {
            return item.statu == 1
          }
        },
        {
          text: '下架', click: (item) => {
            this.putDown(item.id)
          }, iif: (item) => {
            return item.statu == 2
          }
        },
        {
          text: '查看', click: (item: any) => {
            this.show(item)
          }
        },
        {
          text: '编辑', click: (item: any) => {
            this.edit(item)
          }
        },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router, private msgSrv: NzMessageService) { }

  ngOnInit() {
    let token = localStorage.getItem('user_token');
    let role = localStorage.getItem('user_role');
    !(token && role && role == '总店管理员') && this.router.navigateByUrl('/passport/login').then()
  }

  putUp(id) {
    this.http.get(ROOT_URL + 'goods/message/goodsUpOrDown', {
      id: id,
      token: localStorage.getItem('user_token'),
      type: 'up'
    }).subscribe(res => {
      if (res['code'] == 0) {
        this.msgSrv.success('上架成功');
        this.st.reload()
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

  putDown(id) {
    this.http.get(ROOT_URL + 'goods/message/goodsUpOrDown', {
      id: id,
      token: localStorage.getItem('user_token'),
      type: 'down'
    }).subscribe(res => {
      if (res['code'] == 0) {
        this.msgSrv.success('下架成功');
        this.st.reload()
      } else {
        this.msgSrv.error('网络错误');
      }
    })
  }

  add() {
    this.modal
      .createStatic(TradeGoodsEditComponent, { params: { isEdit: false } })
      .subscribe(() => this.st.reload());
  }
  edit(item) {
    this.modal
      .createStatic(TradeGoodsEditComponent, { params: { item: item, isEdit: true } })
      .subscribe(() => this.st.reload());
  }
  show(item) {
    this.modal
      .createStatic(TradeGoodsViewComponent, { params: item })
      .subscribe(() => this.st.reload());
  }

  search(ev) {
    console.log(ev);
    this.reqObj = {
      params: {
        statu: ev.status
      }
    }
    this.st.reload();
  }

}
