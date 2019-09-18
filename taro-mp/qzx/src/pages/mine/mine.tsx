import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './mine.scss'
import {AtImagePicker} from "taro-ui";

export default class Mine extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      files: [{
        url: 'https://jimczj.gitee.io/lazyrepay/aragaki1.jpeg',
      },
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki2.jpeg',
        },
        {
          url: 'https://jimczj.gitee.io/lazyrepay/aragaki3.png',
        }]
    }
  }
  onChange (files) {
    console.log(files);
    // console.log(FileSystemManager.readFileSync(files[3].url, 'base64').length)
    FileSystemManager.readFile({
      filePath: files[3].url,
      encoding: 'base64',
      success: (res) => {
        console.log(res);
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('end');
      }
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

        {/*<SwNav/>*/}
      </View>
    )
  }
}
