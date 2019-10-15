
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './allowance.scss'
import * as actions from '@actions/allowance';

@connect(state => state.allowance, actions)
export default class Allowance extends Component {
  config = {
    navigationBarTitleText: 'allowance'
  }
  render() {
    return(
      <View>
        <Text>
          allowance
        </Text>
      </View>
    )
  }
}
