import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { ButtonItem, InputItem } from '@components'
import {AtSteps, AtList, AtListItem, AtLoadMore} from 'taro-ui'
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
      contactListRead: [],
      contactList: [],
      current: 0,
      status: 'noMore'
    }
  }

  config = {
    navigationBarTitleText: '报名信息'
  }

  onChange(current) {
    console.log(current)
    if (current == 0) {
      Taro.showLoading({
        title: '加载中...'
      })

      this.props.dispatchMessageList({statu: 1, pi: 1, ps: 100}).then(res => {
        console.log(res)
        this.setState({
          contactList: res['list'],
          current
        })
        Taro.hideLoading()
      })
    }
    if (current == 1) {
      Taro.showLoading({
        title: '加载中...'
      })
      this.props.dispatchMessageList({statu: 2, pi: 1, ps: 100}).then(res => {
        console.log(res)
        this.setState({
          contactListRead: res['list'],
          current
        })
        Taro.hideLoading()
      })
    }
    // this.setState({
    //   current
    // })
  }

  componentDidShow(){
    this.alterPage(1)
  }

  alterPage(statu = 1, pi = 1, ps = 100) {
    const  current = this.state.current
    if (current == 0) {
      Taro.showLoading({
        title: '加载中...'
      })

      this.props.dispatchMessageList({statu: 1, pi: 1, ps: 100}).then(res => {
        console.log(res)
        this.setState({
          contactList: res['list'],
        })
        Taro.hideLoading()
      })
    }
    if (current == 1) {
      Taro.showLoading({
        title: '加载中...'
      })
      this.props.dispatchMessageList({statu: 2, pi: 1, ps: 100}).then(res => {
        console.log(res)
        this.setState({
          contactListRead: res['list'],
        })
        Taro.hideLoading()
      })
    }
  }

  goDetail(item){
    console.log(item)

    Taro.showActionSheet({
      itemList: ['拨打电话','设为已读','删除记录'],
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
          this.props.dispatchRead({id: item['id'], type: 'read'}).then(r => {
            console.log(r)
            this.alterPage(1)
          })
        }else if (res.tapIndex == 2) {
          this.props.dispatchRead({id: item['id'], type: 'del'}).then(r => {
            console.log(r)
            this.alterPage(1)
          })
        }

        if (!res.cancel) {
          console.log(res.tapIndex)//console出了下标
        }
      }
    });
  }

  render() {
    const items = [
      {
        'title': '未读',
      },
      {
        'title': '已读',
      }
    ]
    const {contactList,contactListRead} = this.state;
    return(
      <View>

        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-10'>

            <View  style='height:100px' className='at-row at-row__align--center'>
              <View className='at-col'>
                <AtSteps
                  items={items}
                  current={this.state.current}
                  onChange={this.onChange.bind(this)}
                />
              </View>
            </View>
          </View>
        </View>
        {this.state.current == 0 &&
        <View>
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
          </View>
          <View>
            {!(contactList.length > 0) && <AtLoadMore
              status={this.state.status}
            />}
          </View>
        </View>
        }

        {this.state.current == 1 &&
        <View>
          <View>
            <AtList hasBorder={false}>
              {contactListRead && contactListRead.map(item => (
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
          </View>
          <View>
            {!(contactListRead.length > 0) && <AtLoadMore
              status={this.state.status}
            />}
          </View>
        </View>
        }

      </View>
    )
  }
}
