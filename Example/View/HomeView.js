/*************************************************************************************************
 * <pre>
 * @包路径：
 * @版权所有： 北京数字医信科技有限公司 (C) 2018
 *
 * @类描述:
 * @版本:       V3.1.0
 * @作者        wuxing
 * @邮箱        wuxing@bjca.org.cn
 * @创建时间    2018/12/21 2:36 PM
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    ScrollView,
    NativeModules
} from 'react-native';

const {
    SignModule
} = NativeModules;

import {SZYXButton} from "../Component/SZYXButton";
export class HomeView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: "2015112716143758",
            phoneNum: "15015617121"
        }
    }

    certDown() {
        SignModule.CertDown(this.state.clientId,this.state.phoneNum)
    }

    setServerType(){
        let aa = NativeModules
        SignModule.setServerUrl(SignModule.BjcaDev)
    }

    render() {
        return (
            <ScrollView style={HomeViewStyles.scrollStyle}>
                <View style={HomeViewStyles.container}>
                    <TextInput
                        placeholder="厂商clientId填写"
                        onChangeText={(value) => {
                            this.setState({clientId: value})
                        }}
                        value={this.state.clientId}
                    />
                    <TextInput
                        placeholder="手机号"
                        onChangeText={(value) => {
                            this.setState({phoneNum: value})
                        }}
                        value={this.state.phoneNum}
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            this.certDown()
                        }}
                        touchText="下载证书"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="证书更新"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="证书密码重置"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="签章设置"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="批量签名"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="免密签名"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="二维码扫码"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="获取用户信息"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="证书详情页"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="获取用户信息"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="获取用户信息"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="本地是否存在证书"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="清除本地证书"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="清除密码"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                        }}
                        touchText="获取当前版本号"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            this.setServerType()
                        }}
                        touchText="切换环境"
                    />

                </View>
            </ScrollView>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

}

let HomeViewStyles = StyleSheet.create({
    scrollStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    buttonStyle: {
        margin: 10,
        padding: 10,
        backgroundColor: "#f12"
    },
    buttonTextStyle: {}
});
