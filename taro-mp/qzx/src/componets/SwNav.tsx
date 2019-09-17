import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {AtTabBar} from "taro-ui";

export default class SwNav extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0
    }
  }
  handleClick (value) {
    console.log(value);
    this.setState({
      current: value
    })
    Taro.navigateTo({url: '/pages/mine/mine'}).then()
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <AtTabBar fixed tabList={[
          { title: '待办事项', iconType: 'bullet-list', text: 'new' },
          { title: '拍照', iconType: 'camera' },
          { title: '文件夹', iconType: 'folder', text: '100', max: '99' }
        ]}
                  onClick={this.handleClick.bind(this)}
                  current={this.state.current}
        />
      </View>
    )
  }
}
