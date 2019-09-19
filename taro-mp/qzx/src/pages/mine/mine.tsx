import Taro, { Component, Config } from '@tarojs/taro'
import {View, Text, Picker} from '@tarojs/components'
import './mine.scss'
import {AtButton, AtForm, AtImagePicker, AtInput} from "taro-ui";
import {JSONSchema4} from "json-schema";
import {CITY_DATA} from "../../constants/api";

export default class Mine extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      files: [],
      selector: [['美国', '中国', '巴西', '日本'],['河南', '西藏', '北京'], ['郑州','拉萨','朝阳']],
      selectorChecked: '美国'
    }
    this.initData();
  }

  initData() {
    Taro.request({
      url: CITY_DATA
    }).then(res => {
      console.log(res);
    })
  }
  onChange (files) {
    console.log(files);
    Taro.uploadFile({
      url: 'http://localhost:8081/shop/message/uploadPicture',
      filePath: files[0].url,
      name: 'image'
    }).then((res) => {
      console.log(res['data']);
      console.log(typeof res['data']);
      let tmp = JSON.parse(res['data']);
      this.setState({
        image: tmp['data']
      })
    });
    this.setState({
      files
    })
  }
  onFail (mes) {
    console.log(mes)
  }
  onImageClick (index, file) {
    console.log(index, file)
  }

  /*
  owner_phone
  shoptype_id
  shopname
  shoppicture
  shopaddress

  username
  password
   */

  handleUsernameChange (username) {
    this.setState({
      username
    })
  }

  handlePasswordChange (password) {
    this.setState({
      password
    })
  }

  handlePhoneChange(phone) {
    this.setState({
      phone
    })
  }

  handleShopNameChange(shopName) {
    this.setState({
      shopName
    })
  }

  handleChange(value){
    this.setState({
      value
    })
  }

  onSubmit (event) {
    console.log(this.state);
    console.log(event)
    Taro.request({
      url: 'http://localhost:8081/shop/message/saveUserAndShopMessageAndGrading',
      data: {
        user: {
          username: this.state.username,
          password: this.state.password
        },
        shopMessage: {
          owner_phone: this.state.phone,
          shoptype_id: '',
          shopname: '',
          shoppicture: ''
        },
        recommendID: 1,
        positionID: 2
      },
      method: "POST",
      header: {
        'content-type': 'application/json'
      }
    }).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err)
    })
  }
  onReset (event) {
    console.log(event)
  }

  onAddressChange = e => {
    this.setState({
      selectorChecked: this.state.selector[e.detail.value]
    })
  }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <View>
          <Text>mine</Text>
        </View>

        <AtImagePicker
          files={this.state.files}
          onChange={this.onChange.bind(this)}
        />

        <AtForm
          onSubmit={this.onSubmit.bind(this)}
          onReset={this.onReset.bind(this)}
        >
          <AtInput
            name='value'
            title='用户名'
            type='text'
            placeholder='单行文本'
            value={this.state.username}
            onChange={this.handleUsernameChange.bind(this)}
          />

          <AtInput
            name='value3'
            title='密码'
            type='password'
            placeholder='密码不能少于10位数'
            value={this.state.password}
            onChange={this.handlePasswordChange.bind(this)}
          />

          <AtInput
            name='value6'
            border={false}
            title='手机号码'
            type='phone'
            placeholder='手机号码'
            value={this.state.phone}
            onChange={this.handlePhoneChange.bind(this)}
          />

          <AtInput
            name='value'
            title='店铺名'
            type='text'
            placeholder='单行文本'
            value={this.state.shopName}
            onChange={this.handleShopNameChange.bind(this)}
          />

          <View className='page-section'>
            <Text>地区选择器</Text>
            <View>
              <Picker mode='multiSelector' range={this.state.selector} onChange={this.onAddressChange}>
                <View className='picker'>
                  当前选择：{this.state.selectorChecked}
                </View>
              </Picker>
            </View>
          </View>

          {/*<AtInput*/}
            {/*name='value2'*/}
            {/*title='数字'*/}
            {/*type='number'*/}
            {/*placeholder='请输入数字'*/}
            {/*value={this.state.value2}*/}
            {/*onChange={this.handleChange.bind(this)}*/}
          {/*/>*/}

          {/*<AtInput*/}
            {/*name='value4'*/}
            {/*title='身份证'*/}
            {/*type='idcard'*/}
            {/*placeholder='身份证号码'*/}
            {/*value={this.state.value4}*/}
            {/*onChange={this.handleChange.bind(this)}*/}
          {/*/>*/}
          {/*<AtInput*/}
            {/*name='value5'*/}
            {/*title='小数'*/}
            {/*type='digit'*/}
            {/*placeholder='请输入小数'*/}
            {/*value={this.state.value5}*/}
            {/*onChange={this.handleChange.bind(this)}*/}
          {/*/>*/}


          <AtButton formType='submit'>提交</AtButton>
          <AtButton formType='reset'>重置</AtButton>
        </AtForm>

        {/*<SwNav/>*/}
      </View>
    )
  }
}
