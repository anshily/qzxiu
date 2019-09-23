import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './enter.scss'
import * as actions from '@actions/referrer';

@connect(state => state.referrer, actions)
export default class Referrer extends Component {
  config = {
    navigationBarTitleText: '客户关系'
  }
  render() {
    return(
      <View>
        <Text>
          我的下线
        </Text>
      </View>
    )
  }
}
