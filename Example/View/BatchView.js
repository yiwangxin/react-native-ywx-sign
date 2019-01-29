/*************************************************************************************************
 * <pre>
 * @包路径：
 * @版权所有： 北京数字医信科技有限公司 (C) 2019
 *
 * @类描述:
 * @版本:       V3.1.0
 * @作者        wuxing
 * @邮箱        wuxing@bjca.org.cn
 * @创建时间    2019/1/28 10:43 AM
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
    Image,
    TouchableOpacity, TextInput, NativeModules,
} from 'react-native';

const {
    SignModule
} = NativeModules;

export class BatchView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nums: "0",
            curnums: "0",
            doctorId: "15015617121",
            uniqueIds: new Array()
        }
    }

    render() {
        return (
            <View style={BatchViewStyles.container}>

                <View style={{justifyContent: "center", flexDirection: "row"}}>
                    <Text style={{fontSize: 18}}>请输入doctorId </Text>
                    <TextInput
                        style={{fontSize: 18}}
                        placeholder="请输入doctorId"
                        onChangeText={(value) => {
                            this.setState({doctorId: value})
                        }}
                        value={this.state.doctorId}
                    />
                </View>

                <View style={{justifyContent: "center", flexDirection: "row"}}>
                    <Text style={{fontSize: 18}}>请输入批量签名条数 </Text>
                    <TextInput
                        style={{fontSize: 18}}
                        placeholder="填写数字"
                        onChangeText={(value) => {
                            this.setState({nums: value})
                        }}
                    />
                </View>

                <Text style={{
                    fontSize: 18,
                    alignSelf: "center",
                    marginTop: 20
                }}>已同步{this.state.curnums}/{this.state.nums} </Text>

                <TouchableOpacity
                    style={{
                        backgroundColor: "red",
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                    }}
                    onPress={() => {
                        this.getUniqueIds()

                    }}
                >
                    <Text>点击获取待签名数据</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    style={{
                        backgroundColor: "red",
                        padding: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 20
                    }}
                    onPress={() => {
                        this.sign()
                    }}
                >
                    <Text>点击签名</Text>
                </TouchableOpacity>
            </View>
        );
    }

    sign() {
        SignModule.sign(this.state.uniqueIds,this.props.navigation.state.params.clientId, (response) => {
            alert("状态码：" + response.status + "message：" + response.message)
        })
    }

    //获取待签数据
    async getUniqueIds() {
        let url = "http://192.168.126.13" + "/AppOAuthDemo/synSdkRecipeInfoForBatch"
        let params = {
            clientId: this.props.navigation.state.params.clientId,
            doctorId: this.state.doctorId
        }
        let array = new Array()
        let nums = parseInt(this.state.nums)
        for (let i = 0; i < nums; i++) {
            try {
                let result = await this.getServer(url, params)
                if (result.data.uniqueId) {
                    array.push(result.data.uniqueId)
                }
                this.setState({
                    curnums: array.length.toString()
                })
            } catch (e) {
                console.log(e)
            }
        }
        this.setState({
            uniqueIds: array
        })
    }

    getServer(url, params) {
        let paramsArray = [];
        //拼接参数
        if (params) {
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
            if (url.search(/\?/) === -1) {
                //     if(!url.contains('\?')){
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }

        let promise = new Promise((resolve, reject) => {
            fetch(url, {
                method: 'GET',
            }).then((response) => {
                return response.json()
            }).then((response) => {
                if (response.status == "0") {
                    resolve(response)
                } else {
                    reject(response.message)
                }
            }).catch(err => {
                reject(err)
            })
        })
        return promise
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

}

let BatchViewStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
