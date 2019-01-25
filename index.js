/** @format */
import {NativeModules, Platform} from 'react-native';

const SignModule = NativeModules.YWXSignModule;

const SignManager = {
        /**
         * 配置sdk的地址类型
         * @type {{public: 正式环境, integrate: 集成环境, test: 测试环境, dev: 开发环境}}
         */
        envType: {
            public: SignModule.BjcaPublic,  //正式环境
            integrate: SignModule.BjcaIntegrate, //集成环境
            test: SignModule.BjcaTest,    //测试环境
            dev: SignModule.BjcaDev,      //开发环境
        },

        /** 指纹*/
        fingerSignState: {
            off: SignModule.BjcaFingerSignOn, //指纹签名开启
            on: SignModule.BjcaFingerSignOff  //指纹签名关闭
        },

        /**
         * 回调json对象（android需要进行json字符串转换，ios返回的是json对象，不需要转换）
         * @param callback
         * @param json
         */
        callbackJson: function (callback, json) {
            if (Platform.OS === "android") {
                try {
                    json = JSON.parse(json)
                } catch (e) {
                    console.log(json, e)
                }
            }
            callback(json);
        },

        /**
         * 证书是否存在
         * @param callback  callback（result） result-true  存在    其他：不存在
         */
        existsCert: function (callback) {
            SignModule.existsCert((exists) => {
                callback && callback(exists);
            });
        },
        /**
         * 证书下载
         * @param clientId 厂商clienId
         * @param phone     手机号
         * @param callback
         */
        certDown: function (clientId, phone, callback) {
            SignModule.certDown(clientId, phone, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },

        /**
         * 证书更新
         * @param clientId 厂商clienId
         * @param callback
         */
        certUpdate: function (clientId, callback) {
            SignModule.certUpdate(clientId, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 设置医网信医师sdk的服务器类型
         * @param evnType 医师sdk的服务类型
         * @param callback
         */
        setServerUrl: function (evnType, callback) {
            SignModule.setServerUrl(evnType, callback);
        },
        /**
         * 重置证书密码
         * @param clientId
         * @param callback
         */
        certResetPin: function (clientId, callback) {
            SignModule.certResetPin(clientId, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 展示证书详情
         * @param clientId
         * @param callback
         */
        showCertView: function (clientId, callback) {
            SignModule.showCertView(clientId, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 获取证书信息
         * @param clientId
         * @param callback
         */
        getCertInfo: function (clientId, callback) {
            SignModule.getCertInfo(clientId, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 修改手写签名
         * @param clientId
         * @param callback
         */
        drawStamp: function (clientId, callback) {
            SignModule.drawStamp(clientId, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 清除本地证书
         * @param callback
         */
        clearCert: function (callback) {
            SignModule.clearCert(callback);
        },
        /**
         * 开启免密
         * @param clientId
         * @param keepDay
         * @param callback
         */
        keepPin: function (clientId, keepDay, callback) {
            SignModule.keepPin(clientId, keepDay, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 当前是否处于免密状态
         * @param callback
         */
        isPinExempt: function (callback) {
            SignModule.isPinExempt(callback);
        },
        /**
         * 取消免密
         * @param callback
         */
        clearPin: function (callback) {
            SignModule.clearPin((result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 二维码业务处理
         * @param clientId
         * @param qrText
         * @param callback
         */
        qrDispose: function (clientId, qrText, callback) {
            SignModule.qrDispose(clientId, qrText, (result) => {
                this.callbackJson(callback, result);
                ;
            });
        },
        /**
         * 获取sdk的版本号
         * @param callback
         */
        getVersion: function (callback) {
            SignModule.getVersion(callback);
        },
        /**
         * 签名操作
         * @param clientId
         * @param uniqueIdList  待签列表的uniqueId列表
         * @param callback
         */
        sign: function (clientId, uniqueIdList, callback) {
            SignModule.sign(clientId, uniqueIdList, (result) => {
                this.callbackJson(callback, result);
            });
        },

        /**
         * 修改指纹签名状态
         * @param fingerSignState
         * @param callback
         */
        alterFingerSignState: function (fingerSignState, callback) {
            SignModule.alterFingerSignState(fingerSignState, (result) => {
                this.callbackJson(callback, result);
                ;
            })
        },


        /**
         * 获取指纹钱名开启状态
         * @param callback
         * return fingerSignState
         */
        getFingerSignState: function (callback) {
            SignModule.getFingerSignState(fingerSignState => {
                callback && callback(fingerSignState)
            })
        }
    }
;

module.exports = {SignManager};
