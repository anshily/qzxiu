import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import './cashout.scss'
import * as actions from '@actions/cashout';
import {AtButton, AtForm, AtInput, AtModal, AtModalHeader, AtModalContent, AtModalAction} from "taro-ui";
import {ClImagePicker, ClModal, ClButton} from 'mp-colorui';
import {IMG_URL, ROOT_URL} from "../../constants/api";

@connect(state => state.cashout, actions)
export default class Cashout extends Component {
  config = {
    navigationBarTitleText: 'cashout'
  }

  constructor(props) {
    super(props)
    // this.orderId = parseInt(this.$router.params.orderId)
    this.shopId = this.$router.params.shopId;
    this.state = {
      cash: '',
      imgList: [],
      image: '',
      loading: false,
      disabled: true
    }
  }

  componentWillMount(){
    console.log(this.props)
  }

  onSubmit = () => {
    this.setState({
      loading: true,
      disabled: true
    })
    console.log('submit')
    let params = {
      shopid: this.shopId,
      money: this.state.cash,
      image: this.state.image
    }
    this.props.dispatchCashout(params).then(res => {
      console.log(res)
      this.setState({
        loading: false,
        disabled: false
      })
    })
  }

  handleCashChange = e => {
    console.log(e)
    this.setState({
      cash: e,
      disabled: !this.testRequire()
    });
  }

  imgSelected  = e => {
    // console.log(e);
    this.setState({
      imgList: e.map((item) => {
        item.status = 'loading'
        return item
      })
    });

    Taro.uploadFile({
      url: IMG_URL + 'files/uploadPicture',
      filePath: e[0].url,
      name: 'image',
      formData: {
        token: 'anshi',
        prefix: 'qzx'
      }
    }).then((res) => {
      // console.log(res['data']);

      let tmp = JSON.parse(res['data']);

      this.setState({
        image: tmp['data']
      })

      this.setState({
        imgList: this.state.imgList.map((item) => {
          item.status = 'success'
          return item
        }),
        disabled: !this.testRequire()
      })
let flag = !this.testRequire()
      console.log(tmp, flag);
    });
  }


  testRequire(){
    return  !!this.state.cash && !!this.state.image
  }

  render() {
    const { loading, disabled } = this.state;
    let acl = disabled && !this.testRequire();

    return (
      <View>

        <AtForm
          onSubmit={this.onSubmit}
        >
          <AtInput
            name='value3'
            title='提现金额'
            type='number'
            placeholder='请输入提现金额'
            value={this.state.cash}
            onChange={this.handleCashChange}
          />

          <View className='at-row sw-input'>
            <View className='at-col at-col-3 sw-title'>
              <Text>票据</Text>
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

          <AtButton formType='submit' disabled={acl} loading={loading} type='primary'>提交</AtButton>

        </AtForm>
      </View>
    )
  }
}
