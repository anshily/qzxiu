import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-trade-shops-referrer',
  templateUrl: './referrer.component.html',
})
export class TradeShopsReferrerComponent implements OnInit {
  record: any = {};
  itemId: any;
  proxyValue: any;
  recommendValue: any;
  params: any;
  loaded = false;
  recommendList = [];
  proxyList = [];
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient
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

    console.log(this.params)
    this.http.get(ROOT_URL + 'shop/message/detail', {id: this.params.id}).subscribe(res => {

      if (res['code'] == 0 ){
        this.record = res['data'];
      }
      // this.record
    });
    this.formInit().then(
      res => {
        console.log(res)
        this.loaded = true;
      }
    )
  }

  async formInit(){
    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'grading/getTargetShopList',{shopid: this.params.id, type: '地区推荐'})
        .subscribe(res => {
          if (res['code'] == 0){
            this.proxyList = res['data'];
            resolve(res['data'])
          } else {
            reject()
          }
      })
    })

    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'grading/getTargetShopList',{shopid: this.params.id, type: '人员推荐'})
        .subscribe(res => {
          if (res['code'] == 0){
            this.recommendList = res['data'];
            resolve(res['data'])
          } else {
            reject()
          }
        })
    })
  }

  async send(){
    await new Promise((resolve, reject) => {
      if (this.proxyValue){
        this.http.post(ROOT_URL + 'grading/changeGrading',{
          waitShopid: this.params.id,
          targetShopid: this.proxyValue,
          changeType: '地区推荐'
        })
          .subscribe(res => {
            if (res['code'] == 0){
              // this.recommendList = res['data'];
              resolve(res['data'])
            } else {
              reject()
            }
          })
      } else {
        resolve();
      }
    })

    await new Promise((resolve, reject) => {
      if (this.recommendValue){
        this.http.post(ROOT_URL + 'grading/changeGrading',{
          waitShopid: this.params.id,
          targetShopid: this.recommendValue,
          changeType: '人员推荐'
        })
          .subscribe(res => {
            if (res['code'] == 0){
              // this.recommendList = res['data'];
              resolve(res['data'])
            } else {
              reject()
            }
          })
      } else {
        resolve();
      }
    })
  }

  save(){
    // this.http.post(ROOT_URL + 'grading/changeGrading',{})
    this.send().then(res => {
      console.log(res);
      this.close();
    })
  }

  close() {
    this.modal.destroy();
  }
}
