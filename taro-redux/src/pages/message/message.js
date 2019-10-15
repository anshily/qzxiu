
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './message.scss'
import * as actions from '@actions/message';

@connect(state => state.message, actions)
export default class Message extends Component {
  config = {
    navigationBarTitleText: 'message'
  }
  render() {
    return(
      <View>
        <Text>
          message
        </Text>
      </View>
    )
  }
}
