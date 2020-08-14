/** @format */
import {NativeModules, Platform} from 'react-native'

const SignModule = NativeModules.YWXSignModule

class _SignManager {
  /**
   * 配置sdk的地址类型
   * @type {{public: 正式环境, integrate: 集成环境, test: 测试环境, dev: 开发环境}}
   */
  envType = {
    public: SignModule.BjcaPublic,  //正式环境
    integrate: SignModule.BjcaIntegrate, //集成环境
    test: SignModule.BjcaTest,    //测试环境
    dev: SignModule.BjcaDev,      //开发环境
  }
  
  certEnvType = {
    doctor: SignModule.BjcaCertDoctor,
    mass: SignModule.BjcaCertMass,
  }
  
  /** 指纹*/
  fingerSignState = {
    on: SignModule.BjcaFingerSignOn, //指纹签名开启
    off: SignModule.BjcaFingerSignOff,  //指纹签名关闭
  }
  
  /**
   * 回调json对象（android需要进行json字符串转换，ios返回的是json对象，不需要转换）
   * @param callback
   * @param json
   */
  callbackJson (callback, json) {
    if (Platform.OS === 'android') {
      try {
        json = JSON.parse(json)
      } catch (e) {
        console.log(json, e)
      }
    }
    callback(json)
  }
  
  /**
   * 证书是否存在
   * @param callback  callback（result） result-true  存在    其他：不存在
   */
  existsCert (callback) {
    SignModule.existsCert((exists) => {
      callback && callback(exists)
    })
  }
  
  /**
   * 证书下载
   * @param clientId 厂商clienId
   * @param phone     手机号
   * @param callback
   */
  certDown (clientId, phone, callback) {
    SignModule.certDown(clientId, phone, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 证书更新
   * @param clientId 厂商clienId
   * @param callback
   */
  certUpdate (clientId, callback) {
    SignModule.certUpdate(clientId, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 设置医网信医师sdk的服务器类型
   * @param evnType 医师sdk的服务类型
   * @param callback
   *
   * @note 这个有必要加callback吗
   */
  setServerUrl (evnType, callback) {
    SignModule.setServerUrl(evnType, callback)
  }
  
  /**
   * 重置证书密码
   * @param clientId
   * @param callback
   */
  certResetPin (clientId, callback) {
    SignModule.certResetPin(clientId, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 展示证书详情
   * @param clientId
   * @param callback
   *
   */
  showCertView (clientId, callback) {
    SignModule.showCertView(clientId, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 获取证书信息
   * @param clientId
   * @param callback
   */
  getCertInfo (clientId, callback) {
    SignModule.getCertInfo(clientId, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 修改手写签名
   * @param clientId
   * @param callback
   */
  drawStamp (clientId, callback) {
    SignModule.drawStamp(clientId, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 清除本地证书
   *
   */
  clearCert () {
    SignModule.clearCert()
  }
  
  /**
   * 开启免密
   * @param clientId
   * @param keepDay
   * @param callback
   */
  keepPin (clientId, keepDay, callback) {
    SignModule.keepPin(clientId, keepDay, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 当前是否处于免密状态
   * @param callback
   */
  isPinExempt (callback) {
    SignModule.isPinExempt(callback)
  }
  
  /**
   * 取消免密
   */
  
  clearPin () {
    SignModule.clearPin()
  }
  
  /**
   * 二维码业务处理
   * @param clientId
   * @param qrText
   * @param callback
   */
  qrDispose (clientId, qrText, callback) {
    SignModule.qrDispose(clientId, qrText, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 获取sdk的版本号
   * @param callback
   */
  getVersion (callback) {
    SignModule.getVersion(callback)
  }
  
  /**
   * 签名操作
   * @param clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  sign (clientId, uniqueIdList, callback) {
    SignModule.sign(clientId, uniqueIdList, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 签名操作
   * @param clientId  app的clientId
   * @param firmId    签名数据的clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  signWithFirmId (clientId, firmId, uniqueIdList, callback) {
    SignModule.signWithFirmId(clientId, firmId, uniqueIdList, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 签名操作——协同办公
   * @param clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  signForTeam (clientId, uniqueIdList, callback) {
    SignModule.signForTeam(clientId, uniqueIdList, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 获取签章图片
   * @param callback callback返回签章图片的base64
   */
  getStampPic (callback) {
    SignModule.getStampPic(callback)
  }
  
  /**
   * 修改指纹签名状态
   * @param fingerSignState
   * @param callback
   */
  alterFingerSignState (fingerSignState, callback) {
    SignModule.alterFingerSignState(fingerSignState, (result) => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 获取指纹钱名开启状态
   * @param callback
   * return fingerSignState
   */
  getFingerSignState (callback) {
    SignModule.getFingerSignState(fingerSignState => {
      callback && callback(fingerSignState)
    })
  }
  
  /**
   * 初始化证书环境（医师或公众）
   * @param certEnvType
   */
  initCertEnvType (certEnvType) {
    SignModule.initCertEnvType(certEnvType)
  }
  
  /**
   * 根据信步云签名流水号进行签名
   * @param signId
   * @param callback
   * result的格式
   * {
        "status":"0",
        "message":"操作成功",
        "signId":"11231231231signId",
        "signedList":[{"uniqueId":"21312312312","signP1Data":"djaksljfldsajfds"}]
        }
   */
  signBySignet (signId, callback) {
    SignModule.signBySignet(signId, result => {
      this.callbackJson(callback, result)
    })
  }
  
  /**
   * 请求开启自动签名
   * @param clientId 医网信clientId
   * @param firmId   开启自动签名的厂商id
   * @param sysTag   开启自动签名的sysTag
   * @return {Promise<R>}
   */
  signAutoRequest (clientId, firmId, sysTag) {
    return new Promise((resolve) => {
      SignModule.signAutoRequest(clientId, firmId, sysTag).then((result) => {
        resolve(this.translateJsonBean(result))
      })
    })
  }
  
  /**
   * 自动签名信息
   * @param clientId
   * @param sysTag
   * @return {Promise<R>}
   */
  signAutoInfo (clientId) {
    return new Promise((resolve) => {
      SignModule.signAutoInfo(clientId).then((result) => {
        resolve(this.translateJsonBean(result))
      })
    })
  }
  
  /**
   * 自动签名——停止
   * @param clientId
   * @param firmId
   * @param sysTag
   */
  signAutoStop (clientId, firmId, sysTag) {
    return new Promise((resolve) => {
      SignModule.signAutoStop(clientId, firmId, sysTag).then((result) => {
        resolve(this.translateJsonBean(result))
      })
    })
  }
  
  /**
   * 将json字符串转换为你json对象
   * @param json
   * @return {*}
   */
  translateJsonBean (json) {
    if (Platform.OS === 'android' && typeof json === 'string') {
      try {
        json = JSON.parse(json)
      } catch (e) {
        console.log(json, e)
      }
    }
    return json
  }
}

const SignManager = new _SignManager()

export {SignManager}
