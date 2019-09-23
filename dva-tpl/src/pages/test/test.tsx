
    import Taro, { Component, Config } from '@tarojs/taro'
    import { View } from '@tarojs/components'
    // import { connect } from '@tarojs/redux'
    // import Api from '../../utils/request'
    // import Tips from '../../utils/tips'
    import { TestProps, TestState } from './test.interface'
    import './test.scss'
    // import {  } from '../../components'

    // @connect(({ test }) => ({
    //     ...test,
    // }))

    class Test extends Component<TestProps,TestState > {
    config:Config = {
        navigationBarTitleText: '页面标题'
    }
    constructor(props: TestProps) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        
    }

    render() {
        return (
        <View className='fx-test-wrap'>
            页面内容
        </View>
        )
    }
    }
    export default Test
