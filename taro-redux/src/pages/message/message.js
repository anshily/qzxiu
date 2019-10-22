
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSteps, AtDivider, AtList, AtListItem } from 'taro-ui'

import './message.scss'
import * as actions from '@actions/message';

@connect(state => state.message, actions)
export default class Message extends Component {
  config = {
    navigationBarTitleText: 'message'
  }
  render() {
    let messages = [];
    return(
      <View>
        <AtList hasBorder={false}>
          {
            messages.map(item => (
              <AtListItem
                key={String(item.id)}
                title={item.shopname}
                note='描述信息'
                extraText='详细信息'
                arrow='right'
                thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
              />
            ))
          }
        </AtList>

        {messages.length == 0 && <AtDivider content='暂无订单'  />}
      </View>
    )
  }
}
