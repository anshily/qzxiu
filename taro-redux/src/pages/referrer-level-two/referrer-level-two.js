
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './referrer-level-two.scss'
import * as actions from '@actions/referrer-level-two';

@connect(state => state.referrerLevelTwo, actions)
export default class ReferrerLevelTwo extends Component {
  config = {
    navigationBarTitleText: 'referrer-level-two'
  }
  render() {
    return(
      <View>
        <Text>
          referrer-level-two
        </Text>
      </View>
    )
  }
}
