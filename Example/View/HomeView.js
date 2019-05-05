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
            phoneNum: "15015617121",
            time:null,
        }
    }


    setServerType() {
        let aa = NativeModules
        SignModule.setServerUrl(SignModule.BjcaDev)
    }

    render() {
        return (
            <ScrollView style={HomeViewStyles.scrollStyle}>
                <View style={HomeViewStyles.container}>
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                        <Text style={{fontSize: 18}}>clientId: </Text>
                        <TextInput
                            style={{fontSize: 18}}
                            placeholder="厂商填写"
                            onChangeText={(value) => {
                                this.setState({clientId: value})
                            }}
                            value={this.state.clientId}
                        />
                    </View>
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                        <Text style={{fontSize: 18}}>手机号: </Text>
                        <TextInput
                            style={{fontSize: 18}}
                            placeholder="手机号"
                            onChangeText={(value) => {
                                this.setState({phoneNum: value})
                            }}
                            value={this.state.phoneNum}
                        />
                    </View>
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.certDown(this.state.clientId, this.state.phoneNum, (response) => {
                                console.log(response)
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="下载证书"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.certUpdate(this.state.clientId, (response) => {
                                console.log(response)
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="证书更新"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.certResetPin(this.state.clientId, (response) => {
                                console.log(response)
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="证书密码重置"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.drawStamp(this.state.clientId, (response) => {
                                console.log(response)
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="签章设置"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            this.props.navigation.navigate("BatchView",{
                                clientId:this.state.clientId
                            })
                        }}
                        touchText="批量签名"
                    />
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                        <Text style={{fontSize: 18}}>免密时间: </Text>
                        <TextInput
                            style={{fontSize: 18}}
                            placeholder="时间（整数填写）"
                            onChangeText={(value) => {
                                this.setState({time: value})
                            }}
                            value={this.state.time}
                        />
                    </View>
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.keepPin(this.state.clientId, this.state.time, (response) => {
                                console.log(response)
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="开启免密签名"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.isPinExempt((response) => {
                                if (response) {
                                    alert("免密状态")
                                } else {
                                    alert("非免密状态")
                                }
                            })
                        }}
                        touchText="当前是否处于免密签名状态"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.clearPin()
                            alert("清除完毕")
                        }}
                        touchText="关闭免密签名"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            alert("未完待续")
                        }}
                        touchText="二维码扫码"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.getCertInfo(this.state.clientId,(response) => {
                                alert("状态码：" + response.status + "message：" + response.message)
                            })
                        }}
                        touchText="获取用户信息"
                    />
                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.showCertView(this.state.clientId,(response) => {

                            })
                        }}
                        touchText="证书详情页"
                    />

                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.existsCert((response) => {
                                if (response) {
                                    alert("存在")
                                } else {
                                    alert("不存在")
                                }
                            })
                        }}
                        touchText="本地是否存在证书"
                    />

                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.clearCert();
                        }}
                        touchText="清除本地证书"
                    />

                    <SZYXButton
                        touchStyle={HomeViewStyles.buttonStyle}
                        touchTextStyle={HomeViewStyles.buttonTextStyle}
                        touchClick={() => {
                            SignModule.getVersion((result)=>{
                                alert(result)
                            });
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

const HomeViewStyles = StyleSheet.create({
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
