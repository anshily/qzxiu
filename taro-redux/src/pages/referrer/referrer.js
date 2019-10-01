
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtSteps, AtAccordion, AtList, AtListItem } from 'taro-ui'
import './referrer.scss'
import * as actions from '@actions/referrer';

@connect(state => state.referrer, actions)
export default class Referrer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current: 0,
      open: false
    }
    // this.itemId = parseInt(this.$router.params.itemId)
  }

  componentDidMount() {
    this.props.dispatchChild({ shopid: 1 }).then((res) => {
      console.log(res)
      // this.setState({ loaded: true })
    })
  }

  onChange (current) {
    console.log(current)
    this.setState({
      current
    })
  }
  handleClick (value) {
    this.setState({
      open: value
    })
  }

  config = {
    navigationBarTitleText: 'referrer'
  }
  render() {
    const items = [
      { 'title': '步骤一', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '一级店铺', 'desc': '这里是额外的信息，最多两行' },
      { 'title': '步骤三', 'desc': '这里是额外的信息，最多两行' }
    ]
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
          open={this.state.open}
          onClick={this.handleClick.bind(this)}
          title='标题一'
        >
          <AtList hasBorder={false}>
            <AtListItem
              title='标题文字'
              arrow='right'
              thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
            />
            <AtListItem
              title='标题文字'
              note='描述信息'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
            />
            <AtListItem
              title='标题文字'
              note='描述信息'
              extraText='详细信息'
              arrow='right'
              thumb='http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
            />
          </AtList>
        </AtAccordion>
      </View>
    )
  }
}
