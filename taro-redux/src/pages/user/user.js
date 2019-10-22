import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { dispatchCartNum } from '@actions/cart'
import { getWindowHeight } from '@utils/style'
import Profile from './profile'
import Menu from './menu'
import * as cartUtil from '@utils/cart'
import './user.scss'

@connect(state => state.user, { ...actions, dispatchCartNum })
class User extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isShowSuggest: false,
      loading: false
    }
    this.loginType = this.$router.params.type;
  }

  componentDidShow() {
    this.props.dispatchShopInfo({
      token: Taro.getStorageSync('user_token')
    })
    Taro.login().then(res => {
      this.props.dispatchCodeLogin({
        code: res['code']
      })
    })
    // console.log(cartUtil.getCart())
  }

  handleLogin = () => {
    Taro.navigateTo({
      url: '/pages/user-login/user-login'
    })
  }

  render () {
    const { userInfo } = this.props
    return (
      <View className='user'>
        <ScrollView
          scrollY
          className='user__wrap'
          style={{ height: getWindowHeight() }}
        >
          <Profile userInfo={userInfo} />
          <Menu />
          {/*{userInfo.login &&*/}
            {/*<View className='user__logout' onClick={this.handleLogin}>*/}
              {/*<Text className='user__logout-txt'>切换账号</Text>*/}
            {/*</View>*/}
          {/*}*/}
          <View className='user__empty' />
        </ScrollView>
        {/*<View className='user__activity'>*/}
          {/*<Activity />*/}
        {/*</View>*/}
      </View>
    )
  }
}

export default User
