/** @format */
import {NativeModules} from 'react-native';

const SignModule = NativeModules.YWXSignModule;

const SignManager = {
        /**
         * 配置sdk的地址类型
         * @type {{public: number, integrate: number, test: number, dev: number, testDomain: number, devDomain: number}}
         */
        envType: {
            public: 0,  //正式环境
            integrate: 1, //集成环境
            test: 2,    //测试环境-ip地址
            dev: 3,      //开发环境-ip地址
            testDomain: 4,    //测试环境-域名
            devDomain: 5     //开发环境-域名
        },

        /** 指纹*/
        fingerSignState: {
            off: 0,
            on: 1
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
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },

        /**
         * 证书更新
         * @param clientId 厂商clienId
         * @param callback
         */
        certUpdate: function (clientId, callback) {
            SignModule.certUpdate(clientId, (result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },
        /**
         * 展示证书详情
         * @param clientId
         * @param callback
         */
        showCertView: function (clientId, callback) {
            SignModule.showCertView(clientId, (result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },
        /**
         * 获取证书信息
         * @param clientId
         * @param callback
         */
        getCertInfo: function (clientId, callback) {
            SignModule.getCertInfo(clientId, (result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },
        /**
         * 修改手写签名
         * @param clientId
         * @param callback
         */
        drawStamp: function (clientId, callback) {
            SignModule.drawStamp(clientId, (result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
                console.log(result)
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },
        /**
         * 开启指纹签名
         * @param callback
         */
        enableFingerSign: function (callback) {
            SignModule.enableFingerSign((result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },

        disableFingerSign: function (callback) {
            SignModule.disableFingerSign((result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
            });
        },

        /**
         * 修改指纹签名状态
         * @param fingerSignState
         * @param callback
         */
        alterFingerSignState: function (fingerSignState, callback) {
            console.log(fingerSignState)
            SignModule.alterFingerSignState(fingerSignState, (result) => {
                let resultJson = JSON.parse(result);
                callback && callback(resultJson);
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
