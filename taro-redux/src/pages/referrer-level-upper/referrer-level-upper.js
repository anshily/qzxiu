
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './referrer-level-upper.scss'
import * as actions from '@actions/referrer-level-upper';

@connect(state => state.referrerLevelUpper, actions)
export default class ReferrerLevelUpper extends Component {
  config = {
    navigationBarTitleText: 'referrer-level-upper'
  }
  render() {
    return(
      <View>
        <Text>
          referrer-level-upper
        </Text>
      </View>
    )
  }
}
