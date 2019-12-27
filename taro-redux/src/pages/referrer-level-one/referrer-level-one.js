
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './referrer-level-one.scss'
import * as actions from '@actions/referrer-level-one';

@connect(state => state.referrerLevelOne, actions)

export default class ReferrerLevelOne extends Component {
  config = {
    navigationBarTitleText: 'referrer-level-one'
  }
  render() {
    return(
      <View>
        <Text>
          referrer-level-one
        </Text>
      </View>
    )
  }
}
