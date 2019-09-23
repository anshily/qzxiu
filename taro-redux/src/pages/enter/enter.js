import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtButton, AtForm, AtInput} from "taro-ui";
import {ClImagePicker} from 'mp-colorui';
import './enter.scss'
import * as actions from '@actions/enter';
import { ROOT_URL } from '../../constants/api';

@connect(state => state.enter, actions)
export default class UserLogin extends Component {

  state = {
    username: '',
    password: '',
    phone: '',
    shopName: '',
    image: '',
    shopLevel: [1,2,3,4],
    levelChecked: 1,
    manager: [1,2,3],
    managerChecked: 1,
    referrer: [1,2,3],
    referrerChecked: 1,
    imgList: []
  }

  config = {
    navigationBarTitleText: '添加商铺'
  }

  imgSelected  = e => {
    console.log(e);
    this.setState({
      imgList: e.map((item) => {
        item.status = 'loading'
        return item
      })
    });

    Taro.uploadFile({
      url: ROOT_URL + 'shop/message/uploadPicture',
      filePath: e[0].url,
      name: 'image'
    }).then((res) => {
      console.log(res['data']);
      console.log(typeof res['data']);
      let tmp = JSON.parse(res['data']);
      this.setState({
        image: tmp['data']
      })
      this.setState({
        imgList: this.state.imgList.map((item) => {
          item.status = 'success'
          return item
        })
      })
    });
  }

  onSubmit = e => {
    console.log(e)
    this.props.dispatchENTER({

    })
  }

  onReset = e => {
    console.log(e)
  }

  handleUsernameChange = e => {
    console.log(e)
    this.setState({
      username: e
    })
  }

  handlePasswordChange = e => {
    console.log(e)
    this.setState({
      password: e
    })
  }

  handlePhoneChange = e => {
    console.log(e)
    this.setState({
      phone: e
    })
  }

  handleShopNameChange = e => {
    console.log(e)
  }

  onLevelChange = e => {
    this.setState({
      shopLevel: e.detail.value
    })
  }

  onManagerChange = managerChecked => {
    console.log(managerChecked)
    this.setState({
      managerChecked: managerChecked.detail.value
    })
  }

  onReferrerChange = referrerChecked => {
    this.setState({
      referrerChecked: referrerChecked.detail.value
    })
  }

  render () {
    return (
      <View className='index'>

        <AtForm
          onSubmit={this.onSubmit}
          onReset={this.onReset}
        >
          <AtInput
            name='value'
            title='用户名'
            type='text'
            placeholder='单行文本'
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />

          <AtInput
            name='value3'
            title='密码'
            type='password'
            placeholder='密码不能少于10位数'
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <AtInput
            name='value6'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='手机号码'
            value={this.state.phone}
            onChange={this.handlePhoneChange}
          />

          <AtInput
            name='value'
            title='店铺名'
            type='text'
            placeholder='单行文本'
            value={this.state.shopName}
            onChange={this.handleShopNameChange}
          />

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>店铺类型</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={this.state.shopLevel} onChange={this.onLevelChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.levelChecked}
                </View>
              </Picker>
            </View>
          </View>

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>上级代理</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={this.state.manager} onChange={this.onManagerChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.managerChecked}
                </View>
              </Picker>
            </View>
          </View>

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>推荐人</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={this.state.referrer} onChange={this.onReferrerChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.referrerChecked}
                </View>
              </Picker>
            </View>
          </View>

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>门面图</Text>
            </View>
            <View className='at-col at-col-8'>

              <ClImagePicker
                chooseImgObj={{
                  count: 1,
                  success: this.imgSelected
                }}
                imgList={this.state.imgList}
              />
            </View>
          </View>


          <AtButton formType='submit'>提交</AtButton>
        </AtForm>

        {/*<SwNav/>*/}
      </View>
    )
  }
}
