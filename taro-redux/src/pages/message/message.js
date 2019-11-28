
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSteps, AtDivider, AtList, AtListItem } from 'taro-ui'

import './message.scss'
import * as actions from '@actions/message';

@connect(state => state.message, actions)
export default class Message extends Component {
  static defaultProps = {
    messages: []
  }

  config = {
    navigationBarTitleText: '消息中心'
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
    Taro.navigateTo({
      url: `/pages/message-detail/message-detail?messageId=${item.id}`
    })
  }

  render() {
    const {messages} = this.props;
    return(
      <View>
        <AtList hasBorder={false}>
          {messages && messages.map(item => (
              <AtListItem
                onClick={this.goDetail.bind(this, item)}
                key={String(item.id)}
                title={item.type}
                note={item['subscribe']}
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }
        </AtList>

        {(!messages || messages.length == 0) && <AtDivider content='暂无消息'  />}
      </View>
    )
  }
}
