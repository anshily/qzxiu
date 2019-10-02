import Taro, {Component} from '@tarojs/taro'
import {View, Text} from '@tarojs/components'
import {connect} from '@tarojs/redux'
import {AtSteps, AtAccordion, AtList, AtListItem} from 'taro-ui'
import './referrer.scss'
import * as actions from '@actions/referrer';

@connect(state => state.referrer, actions)
export default class Referrer extends Component {

  static defaultProps = {
    referrerLevelOne: []
  }

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      open1: false,
      open2: false
    }
    // this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    this.props.dispatchChild({shopid: 1}).then((res) => {
      console.log(res)
      // this.setState({ loaded: true })
    })
  }

  onChange(current) {
    console.log(current)
    this.setState({
      current
    })
  }

  handleClick1(value) {
    this.setState({
      open1: value
    })
  }

  handleClick2(value) {
    this.setState({
      open2: value
    })
  }

  config = {
    navigationBarTitleText: 'referrer'
  }

  render() {
    const items = [
      {'title': '步骤一', 'desc': '这里是额外的信息，最多两行'},
      {'title': '一级店铺', 'desc': '这里是额外的信息，最多两行'},
      {'title': '步骤三', 'desc': '这里是额外的信息，最多两行'}
    ]

    const {referrerLevelOne, referrerLevelTwo} = this.props
    return (
      <View className='home__wrap'>


        <View className='at-row at-row__justify--center'>
          <View className='at-col at-col-10'>

            <View className='at-row at-row__align--center'>
              <View style='height:100px' className='at-col'>
                <AtSteps
                  items={items}
                  current={this.state.current}
                  onChange={this.onChange.bind(this)}
                />
              </View>
            </View>

          </View>
        </View>


        <AtAccordion
          open={this.state.open1}
          onClick={this.handleClick1.bind(this)}
          title='地区推荐'
        >
          <AtList hasBorder={false}>
            {
              referrerLevelOne.map(item => (
                <AtListItem
                  key={String(item.id)}
                  title={item.shopname}
                  note='描述信息'
                  extraText='详细信息'
                  arrow='right'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              ))
            }

          </AtList>
        </AtAccordion><AtAccordion
          open={this.state.open2}
          onClick={this.handleClick2.bind(this)}
          title='人员推荐'
        >
          <AtList hasBorder={false}>
            {
              referrerLevelTwo.map(item => (
                <AtListItem
                  key={String(item.id)}
                  title={item.shopname}
                  note='描述信息'
                  extraText='详细信息'
                  arrow='right'
                  thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
                />
              ))
            }

          </AtList>
        </AtAccordion>
      </View>
    )
  }
}
