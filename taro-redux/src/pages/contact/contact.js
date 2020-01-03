
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtCurtain,AtButton } from 'taro-ui'
import { ButtonItem, InputItem } from '@components'
import './contact.scss'
import * as actions from '@actions/contact';

@connect(state => state.contact, actions)
export default class Contact extends Component {
  config = {
    navigationBarTitleText: 'contact'
  }

  constructor () {
    super(...arguments)
    this.state = {
      isOpened: true,
      username: '',
      password: '',
      isShowSuggest: false,
      loading: false
    }
  }
  handleChange () {
    this.setState({
      isOpened: true
    })
  }
  handleInput(ev) {
    console.log(ev)
  }
  onClose () {
    this.setState({
      isOpened: false
    })
  }

  render() {
    const { username, password, loading } = this.state
    return(
      <View>
        <AtCurtain
          isOpened={this.state.isOpened}
          onClose={this.onClose.bind(this)}
        >
          <View>
            <InputItem
              value={username}
              placeholder='账号'
              onInput={this.handleInput.bind(this, 'username')}
            />
            <InputItem
              password
              value={password}
              placeholder='密码'
              onInput={this.handleInput.bind(this, 'password')}
            />
          </View>
        </AtCurtain>
        <Text>
          contact
        </Text>
      </View>
    )
  }
}
