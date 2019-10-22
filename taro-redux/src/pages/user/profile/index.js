import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import defaultAvatar from '@assets/default-avatar.png'
import Vip from './vip'
import bg from './assets/bg.png'
import qrCode from './assets/qr-code.png'
import level01 from './assets/level-01.png'
import './index.scss'

export default class Profile extends Component {
  static defaultProps = {
    userInfo: {}
  }

  handleLogin = () => {
    if (!this.props.userInfo.login) {
      Taro.navigateTo({
        url: '/pages/user-login/user-login'
      })
    }
  }

  getUid = (uid) => {
    if (!uid || !/@/.test(uid)) {
      return ''
    }
    const [username, suffix] = uid.split('@')
    const firstLetter = username[0]
    const lastLetter = username[username.length - 1]
    return `${firstLetter}****${lastLetter}@${suffix}`
  }

  bindShop = () => {
    console.log('bindShop')
    Taro.navigateTo({
      url: '/pages/user-login/user-login?type=1'
    })
  }

  render () {
    const { userInfo } = this.props;

    let role = Taro.getStorageSync('user_role');

    if (role){
      const shopInfo = Taro.getStorageSync('shopInfo');
      const userId = Taro.getStorageSync('user_id');
      return (
        <View className='user-profile'>
          {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
          <Image
            className='user-profile__bg'
            src={bg}
            mode='widthFix'
          />
          <View className='user-profile__wrap'>
            <View className='user-profile__avatar'>
              <Image
                className='user-profile__avatar-img'
                src={shopInfo.avatar || defaultAvatar}
                onClick={this.handleLogin}
              />
            </View>
            <View className='user-profile__info' onClick={this.handleLogin}>
              <Text className='user-profile__info-name'>
                {role == '游客' ? '游客' + userId : shopInfo['shopname']}
              </Text>
                <View className='user-profile__info-wrap'>
                  <Image className='user-profile__info-level' src={level01} />
                  <View>
                    {
                      shopInfo.rolename == '游客' ?
                        <View>
                          {/*<Text className='user-profile__info-uid'>{'游客' + userInfo['id']}</Text>*/}
                          <Text className='user-profile__info-uid' onClick={this.bindShop}>点击绑定商铺</Text>
                        </View> :
                        <Text className='user-profile__info-uid'>
                          { '店铺id：' + shopInfo['id'] }
                        </Text>
                    }
                  </View>
                </View>
            </View>

            {/*<View className='user-profile__extra'>*/}
              {/*<View className='user-profile__extra-qr'>*/}
                {/*<Image*/}
                  {/*className='user-profile__extra-qr-img'*/}
                  {/*src={qrCode}*/}
                {/*/>*/}
              {/*</View>*/}
            {/*</View>*/}
          </View>
        </View>
      )
    }

    return (
      <View className='user-profile'>
        {/* // NOTE 背景图片：Image 标签 + position absolute 实现 */}
        <Image
          className='user-profile__bg'
          src={bg}
          mode='widthFix'
        />

        <View className='user-profile__wrap'>
          <View className='user-profile__avatar'>
            <Image
              className='user-profile__avatar-img'
              src={userInfo.avatar || defaultAvatar}
              onClick={this.handleLogin}
            />
          </View>

          {/*user_role*/}
          <View className='user-profile__info' onClick={this.handleLogin}>
            <Text className='user-profile__info-name'>
              {userInfo.login ? userInfo.rolename == '游客' ? '游客' + userInfo['id'] : userInfo['id'] : '未登录'}
            </Text>
            {userInfo.login ?
              <View className='user-profile__info-wrap'>
                {/* XXX 没有全部 level 对应的图标，暂时都用 v1 */}
                <Image className='user-profile__info-level' src={level01} />
                {/*<Text className='user-profile__info-uid'>*/}
                  {/*{userInfo.rolename == '游客' ? '游客' + userInfo['id'] : userInfo['id'] }*/}
                {/*</Text>*/}
                <View>
                  {
                    userInfo.rolename == '游客' ?
                      <View>
                        {/*<Text className='user-profile__info-uid'>{'游客' + userInfo['id']}</Text>*/}
                        <Text className='user-profile__info-uid' onClick={this.bindShop}>点击绑定商铺</Text>
                      </View> :
                      <Text className='user-profile__info-uid'>
                        { userInfo['id'] }
                      </Text>
                  }
                </View>
              </View> :
              <Text className='user-profile__info-tip'>点击登录账号</Text>
            }
          </View>

          <View className='user-profile__extra'>
            <View className='user-profile__extra-qr'>
              <Image
                className='user-profile__extra-qr-img'
                src={qrCode}
              />
            </View>
          </View>

          {/*<Vip />*/}
        </View>
      </View>
    )
  }
}
