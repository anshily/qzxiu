import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ButtonItem, InputItem } from '@components'
import { AtList, AtListItem, AtLoadMore } from 'taro-ui'

import './contact.scss'
import * as actions from '@actions/contact';

@connect(state => state.contact, actions)
export default class Contact extends Component {
  static defaultProps = {
    messages: []
  }

  constructor(props) {
    super(props)
    this.state = {
      status: 'noMore'
    }
  }

  config = {
    navigationBarTitleText: '报名信息'
  }

  componentDidShow(){
    this.props.dispatchMessageList({shopid: Taro.getStorageSync('shopId')}).then(res => {
      console.log(res)
    })
  }
  alterPage(page){
    console.log(page);
  }

  goDetail(item){
    console.log(item)

    Taro.showActionSheet({
      itemList: ['拨打电话','设为已读'],
      success:  (res) => {
        console.log(res) //当点击400-900-2250就相当于点击了

        if (res.tapIndex == 0) {
          Taro.makePhoneCall({
            phoneNumber: item['phone'], //此号码并非真实电话号码，仅用于测试
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
              console.log("拨打电话失败！")
            }
          })
        }else if (res.tapIndex == 1) {
          this.props.dispatchRead(item['id']).then(r => {
            console.log(r)
          })
        }

        if (!res.cancel) {
          console.log(res.tapIndex)//console出了下标
        }
      }
    });
  }

  render() {
    const {contactList} = this.props;
    return(
      <View>
        <AtList hasBorder={false}>
          {contactList && contactList.map(item => (
            <AtListItem
              key={String(item.id)}
              onClick={this.goDetail.bind(this, item)}
              title={item.name}
              note={item['address']}
              extraText={item['phone']}
              arrow='right'
              thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
            />
          ))
          }
        </AtList>

        {(!contactList || contactList.length == 0) && <AtLoadMore
          status={this.state.status}
        />}
      </View>
    )
  }
}
