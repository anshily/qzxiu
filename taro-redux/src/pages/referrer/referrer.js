
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './referrer.scss'
import * as actions from '@actions/referrer';

@connect(state => state.referrerItem, actions)
export default class Referrer extends Component {
  config = {
    navigationBarTitleText: 'referrer'
  }
  render() {
    return(
      <View>
        <Text>
          referrer
        </Text>
      </View>
    )
  }
}
