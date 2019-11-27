import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFSelectWidgetSchema, SFUISchema, SFUploadWidgetSchema} from '@delon/form';

@Component({
  selector: 'app-trade-shops-edit',
  templateUrl: './edit.component.html',
})
export class TradeShopsEditComponent implements OnInit {
  record: any = {};
  priviewFlie: any;
  params: any;
  loaded = false;
  recommendList = [];
  receiveContent: any;
  receivePicture: any;
  reList = [];
  typeList = [];
  shopInfo = {};
  i: any;
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '用户名' },
      password: { type: 'string', title: '密码' },
      phone: { type: 'string', title: '电话' },
      shopName: { type: 'string', title: '店铺名', maxLength: 15 },
      shopAddress: { type: 'string', title: '地址', maxLength: 15 },
      shopType: { type: 'number', title: '店铺类型',enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      recommendID: { type: 'number', title: '推荐人', enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      positionID: { type: 'number', title: '描述', enum: [
          { label: '省代理', value: 1 },
          { label: '市代理', value: 2 },
          { label: '县代理', value: 3 },
        ],
        default: 1,
        ui: {
          widget: 'select',
        } as SFSelectWidgetSchema },
      file: {
        type: 'string',
        title: '门面图',
        ui: {
          widget: 'upload',
          action: ROOT_URL + 'shop/message/uploadPicture',
          resReName: 'data',
          urlReName: 'url',
          fileType: 'image/png,image/jpeg,image/gif,image/bmp',
          name: 'image'
        } as SFUploadWidgetSchema,
      }
    },
    required: ['username', 'password', 'shopName', 'shopAddress', 'shopType', 'recommendID', 'positionID', 'file', 'phone'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $no: {
      widget: 'text'
    },
    $href: {
      widget: 'string',
    },
    $description: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  updateContent(e){
    console.log(e)
    this.receiveContent = e;
  }

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    // console.log(this.i)
    // if (this.record.id > 0)
    // this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
    //   if (res['code'] == 0) {
    //     this.recommendList = res['data'];
    //   }
    // });

    if (this.params && this.params.edit){
      console.log(this.params.id)
      this.formInit().then(() => {
        console.log(this.typeList)

        this.priviewFlie = this.shopInfo['shoppicture'] || '../uploads/assets/index1.jpg';
        this.receivePicture = this.shopInfo['shoppicture'];
        this.receiveContent = this.shopInfo['description'];
        this.schema = {
          properties: {
            // username: { type: 'string', title: '用户', default: this.shopInfo['owner_phone'] },
            // password: { type: 'string', title: '密码' },
            phone: { type: 'string', title: '电话', default: this.shopInfo['owner_phone'] },
            shopName: { type: 'string', title: '店铺名', maxLength: 15, default: this.shopInfo['shopname'] },
            shopUserName: { type: 'string', title: '店主姓名', maxLength: 5, default: this.shopInfo['username'] },
            shopAddress: { type: 'string', title: '地址', maxLength: 50, default: this.shopInfo['shopaddress'] },
            shopType: { type: 'number', title: '店铺类型',enum: [
                ...this.typeList
              ],
              default: this.shopInfo['shoptype_id'] || 1,
              ui: {
                widget: 'select',
              } as SFSelectWidgetSchema },
            picUploader: {
              type: 'string',
              title: '封面图',
              ui: {
                widget: 'custom',
                grid: { span: 24 }
              },
              default: 'test',
            },
            custom: {
              type: 'string',
              title: '描述',
              ui: {
                widget: 'custom',
                grid: { span: 24 }
              },
              default: 'test',
            }
          },
          // required: ['username', 'password', 'shopName', 'shopAddress', 'shopType', 'recommendID', 'positionID', 'file', 'phone'],
        };
        this.loaded = true;
      })
    }else {

      this.formAddInit().then(res => {
        console.log(res)
        // this.loaded = true;
      // this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
      //   if (res['code'] == 0) {
      //     this.recommendList = res['data'];
      //     let reList = []
      //     this.recommendList.forEach(item => {
      //       reList.push({
      //         label: item['shopname'],
      //         value: item['id']
      //       })
      //     })

          this.schema = {
            properties: {
              username: { type: 'string', title: '用户' },
              password: { type: 'string', title: '密码' },
              phone: { type: 'string', title: '电话' },
              shopName: { type: 'string', title: '店铺名', maxLength: 15 },
              shopUserName: { type: 'string', title: '店主姓名', maxLength: 5, default: this.shopInfo['username'] },
              shopAddress: { type: 'string', title: '地址', maxLength: 50 },
              shopType: { type: 'number', title: '店铺类型',enum: [
                  ...this.typeList
                ],
                default: 1,
                ui: {
                  widget: 'select',
                } as SFSelectWidgetSchema },
              recommendID: { type: 'number', title: '推荐人', enum: [
                  ...this.recommendList
                ],
                default: this.recommendList[0].value,
                ui: {
                  widget: 'select',
                } as SFSelectWidgetSchema },
              positionID: { type: 'number', title: '代理人', enum: [
                  ...this.recommendList
                ],
                default: this.recommendList[0].value,
                ui: {
                  widget: 'select',
                } as SFSelectWidgetSchema },
              picUploader: {
                type: 'string',
                title: '封面图',
                ui: {
                  widget: 'custom',
                  grid: { span: 24 }
                },
                default: 'test',
              },
              // file: {
              //   type: 'string',
              //   title: '门面图',
              //   ui: {
              //     widget: 'upload',
              //     action: IMG_URL + `files/uploadPicture`,
              //     resReName: 'data',
              //     urlReName: 'url',
              //     fileType: 'image/png,image/jpeg,image/gif,image/bmp',
              //     name: 'image',
              //     data: {
              //       token: 'anshi',
              //       prefix: 'qzx'
              //     }
              //   } as SFUploadWidgetSchema
              // },
              custom: {
                type: 'string',
                title: '描述',
                ui: {
                  widget: 'custom',
                  grid: { span: 24 }
                },
                default: 'test',
              }
            },
            required: ['username', 'password', 'shopName', 'shopAddress', 'shopType', 'recommendID', 'positionID', 'file', 'phone'],
          };
          this.loaded = true;
      });
    }

  }


  updateImg(e){
    console.log(e)
    this.receivePicture = e;
  }

  async formInit(){
    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
        console.log(res)

        if (res['code'] == 0){
          res['data'].forEach(item => {
            this.reList.push({
              label: item['shopname'],
              value: item['id']
            })
          })
          resolve()
        } else {
          reject()
        }
      })
    })

    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'shop/message/detail',{id: this.params.id}).subscribe(res => {
        console.log(res)
        if (res['code'] == 0){
          this.shopInfo = res['data'];
          resolve()
        } else {
          reject()
        }
      })
    })

    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'shop/type/getTypeList').subscribe(res => {
        console.log(res)
        if (res['code'] == 0){
          res['data'].forEach(item => {
            this.typeList.push({
              label: item['typename'],
              value: item['id']
            })
          });
          resolve()
        } else {
          reject()
        }
      })
    })
  }
  async formAddInit(){
    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + `shop/message/getRecommendAndPosition`).subscribe(res => {
        console.log(res)

        if (res['code'] == 0){
          res['data'].forEach(item => {
            this.recommendList.push({
              label: item['shopname'],
              value: item['id']
            })
          })
          resolve()
        } else {
          reject()
        }
      })
    })


    await new Promise((resolve, reject) => {
      this.http.get(ROOT_URL + 'shop/type/getTypeList').subscribe(res => {
        console.log(res)
        if (res['code'] == 0){
          res['data'].forEach(item => {
            this.typeList.push({
              label: item['typename'],
              value: item['id']
            })
          });
          resolve()
        } else {
          reject()
        }
      })
    })
  }

  save(value: any) {
    let params = {
      user: {
        username: value.username,
        password: value.password
      },
      shopMessage: {
        username: value.shopUserName,
        owner_phone: value.phone,
        shoptype_id: value.shopType,
        shopname: value.shopName,
        shoppicture: value.file,
        shopaddress: value.shopAddress,
        description: this.receiveContent
      },
      recommendID: value.recommendID,
      positionID: value.positionID,
      token: localStorage.getItem('user_token')
    }
    this.http.post(ROOT_URL + `shop/message/saveUserAndShopMessageAndGrading`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['message']);
      }
    });
  }

  alter(value: any) {
    let params = {
      id: this.shopInfo['id'],
      username: value.shopUserName,
        owner_phone: value.phone,
        shoptype_id: value.shopType,
        shopname: value.shopName,
        shoppicture: value.file || this.priviewFlie,
        shopaddress: value.shopAddress,
        description: this.receiveContent

    }
    // console.log(params,value.file);
    this.http.post(ROOT_URL + `shop/message/update`, params).subscribe(res => {
      if (res['code'] == 0){
        this.msgSrv.success('修改成功');
        this.modal.close(true);
      }else {
        this.msgSrv.success(res['message']);
      }
    });
  }

  close() {
    this.modal.destroy();
  }
}
