
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './activity-detail.scss'
import * as actions from '@actions/activity-detail';
import ParserRichText from '@components/ParserRichText/parserRichText';
import { AtList, AtListItem } from "taro-ui"
import {IMG_URL} from "@constants/api";

@connect(state => state.activityDetail, actions)
export default class ActivityDetail extends Component {
  config = {
    navigationBarTitleText: '活动详情'
  }

  static defaultProps = {
    activityItem: '',
    activityDetailItem: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      selected: {}
    }
    this.activityId = parseInt(this.$router.params.activityId)
  }

  componentDidMount() {
    this.props.dispatchActivityDetail({
      id: this.activityId
    }).then(res => {
      console.log(res,1)
    })
  }
  render() {
    const { activityDetailItem } = this.props;
    console.log(activityDetailItem)
    return(
      <View>
        {/* <Image src={ IMG_URL + shopItem.shoppicture } mode='aspectFill' className='pic-info' />
        */}
        {
          activityDetailItem && activityDetailItem.activityname
          && 
          <View className='at-article'>
            <View className='at-article__h1'>
            {activityDetailItem.activityname}
            </View>
          </View>
        }

        {
          activityDetailItem &&
          activityDetailItem.note && 
          <ParserRichText html={activityDetailItem.note} selectable></ParserRichText>
        }

    
      </View>
    )
  }
}
