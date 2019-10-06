import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import {AtButton, AtForm, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction} from "taro-ui";
import {ClImagePicker, ClModal, ClButton} from 'mp-colorui';
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
    address: '',
    shopLevel: [{
      key: 1,
      value: '省代理'
    }, {
      key: 2,
      value: '市代理'
    },{
      key: 3,
      value: '县代理'
    },{
      key: 4,
      value: '加盟店'
    }],
    levelChecked: {
      key: 1,
      value: '省代理'
    },
    manager: [],
    managerChecked: {},
    referrer: [],
    referrerChecked: {},
    imgList: [],
    openModal: false,
    loading: false,
    disabled: true
  }

  config = {
    navigationBarTitleText: '添加商铺'
  }

  componentWillMount() {
    this.props.dispatchRecommend({}).then(res => {
      console.log(res)
      if (res && res.length > 0){
        this.setState({
          managerChecked: res[0],
          referrerChecked: res[0],
          referrer: res,
          manager: res
        })
      }
      // this.setState({
      //   referrer: res
      // })
    })
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
      this.setState({
        disabled: !this.testRequire()
      })
    });
  }

  testRequire(){
    return !!this.state.username && !!this.state.password && !!this.state.phone && !!this.state.levelChecked
    && !!this.state.levelChecked.key && !!this.state.shopName && !!this.state.image && !!this.state.address
    && !!this.state.referrerChecked.id && !!this.state.managerChecked.id
  }

  onSubmit = e => {
    console.log(e)
    this.setState({
      loading: true,
      disabled: true
    })
    Taro.request({
      url: ROOT_URL + 'user/nameExist',
      data: {
        name: this.state.username
      }
    }).then(res => {
      console.log(res);

      if (res['code'] == 0) {
        if (true){
          this.props.dispatchENTER({
            user: {
              username: this.state.username,
              password: this.state.password
            },
            shopMessage: {
              owner_phone: this.state.phone,
              shoptype_id: this.state.levelChecked.key,
              shopname: this.state.shopName,
              shoppicture: this.state.image,
              shopaddress: this.state.address
            },
            recommendID: this.state.referrerChecked.id,
            positionID: this.state.managerChecked.id
          }).then( () => {
            console.log('test');
            this.setState({
              loading: false,
              disabled: false
            })
            this.setState({
              openModal: true
            })
          })
        }
      }
    })
  }



  onReset = e => {
    console.log(e)
  }

  handleUsernameChange = e => {
    console.log(e)
    this.setState({
      username: e
    });
    this.setState({
      disabled: !this.testRequire()
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
    this.setState({
      shopName: e
    })
  }

  handleAddressChange = e => {
    console.log(e)
    this.setState({
      address: e
    })
  }

  onLevelChange = e => {
    this.setState({
      shopLevel: e.detail.value
    })
  }

  onManagerChange = managerChecked => {
    console.log(managerChecked)
    const { recommendList } = this.props
    this.setState({
      managerChecked: recommendList[managerChecked.detail.value]
    })
  }

  onReferrerChange = referrerChecked => {
    const { recommendList } = this.props
    this.setState({
      referrerChecked: recommendList[referrerChecked.detail.value]
    })
  }

  succeedCnfirm = () => {
    this.setState({
      openModal: false
    })
    Taro.navigateBack()
  }

  render () {
    const { recommendList } = this.props;
    const { loading, disabled } = this.state;
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

          <AtInput
            name='value'
            title='地址'
            type='text'
            placeholder='输入地址'
            value={this.state.address}
            onChange={this.handleAddressChange}
          />

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>店铺类型</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={this.state.shopLevel}  rangeKey='value'  onChange={this.onLevelChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.levelChecked.value}
                </View>
              </Picker>
            </View>
          </View>

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>上级代理</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={recommendList} rangeKey='shopname' onChange={this.onManagerChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.managerChecked.shopname}
                </View>
              </Picker>
            </View>
          </View>

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>推荐人</Text>
            </View>
            <View className='at-col at-col-8'>
              <Picker mode='selector' range={this.state.referrer} rangeKey='shopname' onChange={this.onReferrerChange}>
                <View className='picker sw-picker'>
                  当前选择：{this.state.referrerChecked.shopname}
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
          {/*<AtModal isOpened>*/}
            {/*<AtModalContent>*/}
              {/*店铺添加成功！*/}
            {/*</AtModalContent>*/}
            {/*<AtModalAction> <Button>确定</Button> </AtModalAction>*/}
          {/*</AtModal>*/}

          <AtModal isOpened={this.state.openModal}>
            <AtModalHeader>添加成功！</AtModalHeader>
            {/*<AtModalContent>*/}
              {/*<text className='mo'></text>*/}
            {/*</AtModalContent>*/}
            <AtModalAction> <Button onClick={this.succeedCnfirm}>确定</Button> </AtModalAction>
          </AtModal>

          <AtButton formType='submit' disabled={!this.testRequire()} loading={loading} type='primary'>提交</AtButton>

          {/*<ClModal show renderAction={true && <ClButton>确认</ClButton>} >店铺添加成功</ClModal>*/}
        </AtForm>



        {/*<SwNav/>*/}
      </View>
    )
  }
}
