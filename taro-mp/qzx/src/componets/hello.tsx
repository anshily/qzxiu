import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class Hello extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
