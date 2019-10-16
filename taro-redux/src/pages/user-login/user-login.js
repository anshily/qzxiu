import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import * as actions from '@actions/user'
import { ButtonItem, InputItem } from '@components'
import { CDN } from '@constants/api'
import loginBanner from '@assets/login-banner.jpg'
// NOTE 使用统一接口的多端文件进行跨端处理
// auth 中有 index.js/index.weapp.js/index.alipay.js
// 若是编译微信，则实际引入的是 index.weapp.js
// 若是编译 H5，因为不存在 index.h5.js，所以引入的是默认的 index.js
import './user-login.scss'

// TODO 由于 RN 的 app.js 中 initPxTransform 执行顺序关系，不能在 class 外用到 Taro.pxTransform
// const BUTTON = {
//   marginTop: Taro.pxTransform(30)
// }

@connect(state => state.user, actions)
class UserLogin extends Component {
  config = {
    navigationBarTitleText: '登录'
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

  componentWillMount() {
    console.log(this.loginType)
  }
  handleClick = (type) => {
    if (type !== 'email') {
      Taro.showToast({
        title: '目前只实现了邮箱登录~',
        icon: 'none'
      })
      return
    }

    Taro.navigateTo({
      url: '/pages/user-login-email/user-login-email'
    })
  }

  handleInput = (key, value) => {
    this.setState({ [key]: value })
  }

  handleLogin = () => {
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
    this.setState({ loading: true })
    if (this.loginType && this.loginType == 1){
      Taro.login().then(res => {
        payload['code'] = res['code'];
        this.props.dispatchBind(payload).then(() => {
          this.setState({ loading: false })
          Taro.navigateBack({ delta: 1 })
        }).catch(() => {
          this.setState({ loading: false })
        })
      })
    } else {
      this.props.dispatchLogin(payload).then(() => {
        this.setState({ loading: false })
        Taro.navigateBack({ delta: 1 })
        // TODO RN 的 navigateBack 参数 delta 无效，暂时用如下方式解决
        // if (process.env.TARO_ENV === 'rn') {
        //   setTimeout(() => Taro.navigateBack(), 1000)
        // }
      }).catch(() => {
        this.setState({ loading: false })
      })
    }
  }

  render () {
    const BUTTON = {
      marginTop: Taro.pxTransform(30)
    }

    const { username, password, loading } = this.state
    const isBtnDisabled = !username || !password

    return (

      <View className='user-login-email'>
        <View className='user-login-email__logo'>
          <Image src={loginBanner} className='user-login-email__logo-img' />
        </View>
        <View className='user-login-email__wrap'>
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
        <View className='user-login-email__btn'>
          <ButtonItem
            text='登录'
            disabled={isBtnDisabled}
            loading={loading}
            onClick={this.handleLogin}
            compStyle={{
              background: '#b59f7b',
              borderRadius: Taro.pxTransform(4)
            }}
            textStyle={{
              color: isBtnDisabled ? 'rgba(255, 255, 255, 0.4)' : '#ffffff'
            }}
          />
        </View>
      </View>
    )
  }
}

export default UserLogin
