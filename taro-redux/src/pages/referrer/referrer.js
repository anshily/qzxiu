
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSteps } from 'taro-ui'
import './referrer.scss'
import * as actions from '@actions/referrer';

@connect(state => state.referrerItem, actions)
export default class Referrer extends Component {
  onChange (current) {
    this.setState({
      current
    })
  }
  state = {
    current: 0,
  }
  config = {
    navigationBarTitleText: 'referrer'
  }
  render() {
    const items = [
      { 'title': '步骤一', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '步骤二', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '步骤三', 'desc': '这里是额外的信息，最多两行' }
    ]
    return (
      <AtSteps
        items={items}
        current={this.state.current}
        onChange={this.onChange.bind(this)}
      />
    )
  }
}
