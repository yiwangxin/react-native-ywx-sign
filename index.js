/** @format */
import {NativeModules} from 'react-native';

const SignModule = NativeModules.YWXSignModule;

const SignManager = {
    // ...SignModule,

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

    existsCert: function existsCert(callback) {
        return SignModule.existsCert(callback);
    },
    certDown: function certDown(clientId, phone, callback) {
        return SignModule.certDown(clientId, phone, callback);
    },
    certUpdate: function certUpdate(clientId, callback) {
        return SignModule.certUpdate(clientId, callback);
    },
    setServerUrl: function setServerUrl(evnNo, callback) {
        return SignModule.setServerUrl(evnNo, callback);
    },
    certResetPin: function certResetPin(clientId, callback) {
        return SignModule.certResetPin(clientId, callback);
    },
    showCertView: function showCertView(clientId, callback) {
        return SignModule.showCertView(clientId, callback);
    },
    getCertInfo: function getCertInfo(clientId, callback) {
        return SignModule.getCertInfo(clientId, callback);
    },
    drawStamp: function drawStamp(clientId, callback) {
        return SignModule.drawStamp(clientId, callback);
    },
    clearCert: function clearCert(callback) {
        return SignModule.clearCert(callback);
    },
    keepPin: function keepPin(clientId, keepDay, callback) {
        return SignModule.keepPin(clientId, keepDay, callback);
    },
    isPinExempt: function isPinExempt(callback) {
        return SignModule.isPinExempt(callback);
    },
    clearPin: function clearPin(callback) {
        return SignModule.clearPin(callback);
    },
    qrDispose: function qrDispose(clientId, qrText, callback) {
        return SignModule.qrDispose(clientId, qrText, callback);
    },
    getVersion: function getVersion(callback) {
        return SignModule.getVersion(callback);
    }
};


module.exports = {SignManager}




