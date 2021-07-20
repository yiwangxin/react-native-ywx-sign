declare module 'ywx' {

  type YwxResultProps = {
    status?: string,
    message?: string,
    data?: any
  } | string | boolean | any

  /*配置SDK的地址类型*/
  export const envType: any

  /*证书用户的类型*/
  export const certEnvType: any

  /*生物识别开启状态*/
  export const fingerSignState: any

  export type IFingerSignStateProps = 0 | 1

  /**
   * 证书是否存在
   * @param callback  callback（result） result-true  存在    其他：不存在
   */
  export function existsCert(callback: (exists: boolean) => void): void;

  /**
   * 证书下载
   * @param clientId 厂商clienId
   * @param phone     手机号
   * @param callback
   */
  export function certDown(clientId: string, phone: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 证书下载，指定渠道
   * @param clientId
   * @param phone
   * @param firmId
   * @param callback
   */
  export function certDownWithFirmId(clientId: string, phone: string, firmId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 证书更新
   * @param clientId 厂商clienId
   * @param callback
   */
  export function certUpdate(clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 设置医网信医师sdk的服务器类型
   * @param evnType 医师sdk的服务器环境类型
   * @param callback
   *
   * @note 这个有必要加callback吗
   */
  export function setServerUrl(envNo: any, clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 重置证书密码
   * @param clientId
   * @param callback
   */
  export function certResetPin(clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 展示证书详情
   * @param clientId
   * @param callback
   *
   */
  export function showCertView(clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 获取证书信息
   * @param clientId
   * @param callback
   */
  export function getCertInfo(clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 修改手写签名
   * @param clientId
   * @param callback
   */
  export function drawStamp(clientId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 清除本地证书
   *
   */
  export function clearCert(): void;

  /**
   * 开启免密
   * @param clientId
   * @param keepDay
   * @param callback
   */
  export function keepPin(clientId: string, keepDay: number, callback?: (response: YwxResultProps) => void): void;

  /**
   * 当前是否处于免密状态
   * @param callback
   */
  export function isPinExempt(callback: (isFree: boolean) => void): void;

  /**
   * 取消免密
   */
  export function clearPin(): void;

  /**
   * 二维码业务处理
   * @param clientId
   * @param qrText
   * @param callback
   */
  export function qrDispose(clientId: string, qrText: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 获取sdk的版本号
   * @param callback
   */
  export function getVersion(callback: (version: string) => void): void;

  /**
   * 获取证书的openId
   * @param callback:(openId)=>{}   当存在证书时：返回证书用户的openId，不存在证书时候，返回空字符串 ""
   */
  export function getOpenId(callback: (openId: string) => void): void;

  /**
   * 签名操作
   * @param clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  export function sign(clientId: string, uniqueIdList: string[], callback: (response: YwxResultProps) => void): void;

  /**
   * 签名操作
   * @param clientId  app的clientId
   * @param firmId    签名数据的clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  export function signWithFirmId(clientId: string, firmId: string, uniqueIdList: string[], callback: (response: YwxResultProps) => void): void;

  /**
   * 签名操作——协同办公
   * @param clientId
   * @param uniqueIdList  待签列表的uniqueId列表
   * @param callback
   */
  export function signForTeam(clientId: string, uniqueIdList: string[], callback: (response: YwxResultProps) => void): void;

  /**
   * 获取签章图片
   * @param callback callback返回签章图片的base64
   */
  export function getStampPic(callback: (stampPicture: string) => void): void;

  /**
   * 修改指纹签名状态
   * @param fingerSignState
   * @param callback
   */
  export function alterFingerSignState(fingerSignState: IFingerSignStateProps, callback?: (response: YwxResultProps) => void): void;

  /**
   * 获取指纹钱名开启状态
   * @param callback
   * return fingerSignState
   */
  export function getFingerSignState(callback?: (response: boolean) => void): void;

  /**
   * 初始化证书环境（医师或公众）
   * @param certEnvType
   */
  export function initCertEnvType(type: any): void;

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
  export function signBySignet(signId: string, callback?: (response: YwxResultProps) => void): void;

  /**
   * 请求开启自动签名
   * @param clientId 医网信clientId
   * @param firmId   开启自动签名的厂商id
   * @param sysTag   开启自动签名的sysTag
   * @return {Promise<R>}
   */
  export function signAutoRequest(clientId: string, firmId: string, sysTag: string): Promise<any>;

  /**
   * 自动签名信息
   * @param clientId
   * @return {Promise<R>}
   */
  export function signAutoInfo(clientId: string): Promise<any>;

  /**
   * 自动签名——停止
   * @param clientId
   * @param firmId
   * @param sysTag
   */
  export function signAutoStop(clientId: string, firmId: string, sysTag: string): Promise<any>;

  /**
   * 开启授权签名
   * @param clientId
   * @param firmId
   * @param grantedUserId
   * @param timeOut
   * @return {Promise<unknown>}
   */
  export function sureGrantSign(clientId: string, firmId: string, grantedUserId: string, timeOut: number): Promise<any>;

  /**
   * 设置语言（String类型）
   * en-英文
   * zh-中文
   * @param language
   */
  export function setLanguage(language: string): void;

  /**
   * 设置是否隐藏签名等待框（android默认开启等待框，ios没有等待框）
   * @param hide - boolean
   */
  export function setIsHideSignLoading(hide: boolean): void

  export function showPinWindow(clientId: string): Promise<YwxResultProps>

  export function hidePinWindow(): Promise<YwxResultProps>

  export function drawStampWidthFirmId(clientId: string, frimId: string): Promise<YwxResultProps>

  //export function certDownSuccess(): void;
  //export function disableFingerSign(callback?: (response: YwxResultProps) => void): void;
  //export function drawStamp(clientId: string, callback?: (response: YwxResultProps) => void): void;
}
