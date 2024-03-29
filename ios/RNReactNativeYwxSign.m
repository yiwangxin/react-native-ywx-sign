
#import "RNReactNativeYwxSign.h"
#import <UIKit/UIKit.h>
//#import <>
#import <BjcaSignSDK/BjcaSignManager.h>
#import <BjcaSignSDK/BjcaPublicConst.h>
#import "BjcaRNTools.h"
@interface RNReactNativeYwxSign()<BjcaSignDelegate>

@property (nonatomic,strong) BjcaSignManager *signer;

@property (nonatomic,strong) RCTResponseSenderBlock callBack;
@property (nonatomic,strong) RCTPromiseResolveBlock resolve;
@property (nonatomic,strong) RCTPromiseRejectBlock reject;

@end

@implementation RNReactNativeYwxSign

//lazy
- (BjcaSignManager *)signer{
    if (_signer) {
        _signer.bjcaSignDelegate = self;
        return _signer;
    }
    _signer = [BjcaSignManager bjcaShareBjcaSignManager];
    _signer.bjcaSignDelegate = self;
    
    return _signer;
}

+ (BOOL)requiresMainQueueSetup{
    return YES;
}
RCT_EXPORT_MODULE(YWXSignModule)

static NSString * const BjcaCertDoctor = @"CertDoctor";
static NSString * const BjcaCertMass = @"CertMass";

- (NSDictionary *)constantsToExport {
    return @{@"BjcaPublic": @(BjcaPublic),
             @"BjcaIntegrate": @(BjcaIntegrate),
             @"BjcaDev": @(BjcaDev),
             @"BjcaTest": @(BjcaTest),
             @"BjcaFingerSignOn": @"YES",
             @"BjcaFingerSignOff": @"NO",
             @"BjcaCertDoctor":BjcaCertDoctor,
             @"BjcaCertMass":BjcaCertMass,
             };
}

#pragma mark 证书下载
RCT_EXPORT_METHOD(certDown:(NSString *)clientId phone:(NSString *)phone completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaCertDown:clientId phoneNum:phone curViewCtrl:ctrl];
    });
}

#pragma mark 证书下载
RCT_EXPORT_METHOD(certDownWithFirmId:(NSString *)clientId phone:(NSString *)phone firmId:(NSString *)firmId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaCertDown:clientId phoneNum:phone firmId:firmId curViewCtrl:ctrl];
    });
}

#pragma mark 证书更新
RCT_EXPORT_METHOD(certUpdate:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaCertUpdate:clientId curViewCtrl:ctrl];
    });
}

#pragma mark 证书密码重置
RCT_EXPORT_METHOD(certResetPin:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaCertReset:clientId curViewCtrl:ctrl];
    });
}

#pragma mark 签章设置
RCT_EXPORT_METHOD(drawStamp:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaSetStamp:clientId curViewCtrl:ctrl navColor:[UIColor redColor] navFontColor:[UIColor whiteColor]];
    });
}

RCT_EXPORT_METHOD(drawStampWithFirmId:(NSString *)clientId
                  firmId:(NSString *)firmId
                  completion:(RCTResponseSenderBlock)callback) {
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        [self.signer bjcaSetStamp:clientId
                       firmIdList:@[firmId]
                      curViewCtrl:ctrl
                         navColor:[UIColor whiteColor]
                     navFontColor:[UIColor blackColor]];
    });
}

#pragma mark 获取签章图片
RCT_EXPORT_METHOD(getStampPic:(RCTResponseSenderBlock)callback){
  
    dispatch_async(dispatch_get_main_queue(), ^{
       
        NSString* pic = [BjcaSignManager bjcaStampPic];
        NSMutableArray *array = [[NSMutableArray alloc]init];
        
        if (pic)
        {
          [array addObject:pic];
        }
        
        if (callback) {
            callback(array);
        }
        
    });
}

#pragma mark 批量签名
RCT_EXPORT_METHOD(sign:(NSString *)clientId uniqueIds:(NSArray *)uniqueIds completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        NSMutableArray *array = [NSMutableArray arrayWithArray:uniqueIds];
        [self.signer bjcaBatchSignList:array userClientId:clientId curViewCtrl:ctrl];
    });
}

#pragma mark 批量签名业务2
RCT_EXPORT_METHOD(signWithFirmId:(NSString*)clientId FirmId:(NSString *)firmId uniqueIds:(NSArray *)uniqueIds  completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        NSMutableArray *array = [NSMutableArray arrayWithArray:uniqueIds];
        [self.signer signWithFirmId:firmId uniqueIds:array userClientId:clientId curViewCtrl:ctrl];
    });
}


#pragma mark  根据签名流水号签名
RCT_EXPORT_METHOD(signBySignet:(NSString *)signId completion:(RCTResponseSenderBlock)callback){
   
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
//        [self.signer bjcaBatchSignId:signId curViewCtrl:ctrl];
    });
}

#pragma mark 协同签名
RCT_EXPORT_METHOD(signForTeam:(NSString *)clientId uniqueIds:(NSArray *)uniqueIds completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        NSMutableArray *array = [NSMutableArray arrayWithArray:uniqueIds];
        NSMutableDictionary *dic = [[NSMutableDictionary alloc]init];
        [dic setObject:clientId forKey:@"clientId"];
        [dic setObject:array forKey:@"uniqueIds"];
        [dic setObject:ctrl forKey:@"ctrl"];
        [self.signer performSelector:@selector(bjcaTeamSign:) withObject:dic];
    });
}

#pragma mark 免密签名开启
RCT_EXPORT_METHOD(keepPin:(NSString *)clientId day:(nonnull NSNumber *)day completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        [self.signer bjcaFreePinSign:[day intValue] clientId:clientId curViewCtrl:ctrl];
    });
}


#pragma mark 当前是否处于免密状态
RCT_EXPORT_METHOD(isPinExempt:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL isPin = [BjcaSignManager bjcaExistsFreePin];
        NSMutableArray *array = [[NSMutableArray alloc]init];
        
        [array addObject:[NSNumber numberWithBool:isPin]];
        if (callback) {
            callback(array);
        }
    });
    
}

#pragma mark 关闭免密
RCT_EXPORT_METHOD(clearPin){
    dispatch_async(dispatch_get_main_queue(), ^{
        [BjcaSignManager bjcaRemovePin];
    });
    
}

#pragma mark 二维码解析
RCT_EXPORT_METHOD(qrDispose:(NSString *)clientId qrString:(NSString *)qrString completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        [self.signer bjcaQrSign:qrString userClientId:clientId curViewCtrl:ctrl];
    });
}

#pragma mark 获取用户信息
RCT_EXPORT_METHOD(getCertInfo:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        [self.signer bjcaUserInfo:clientId];
    });
    
}


#pragma mark 打开证书详情页
RCT_EXPORT_METHOD(showCertView:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack=callback;
        [self.signer bjcaCertDetail:clientId curViewCtrl:ctrl navColor:nil navFontColor:nil];
    });
    
}

//#pragma mark 获取当前环境地址
//RCT_EXPORT_METHOD(getCurAddress:(NSString *)clientId){
//    NSString *address = [BjcaSignManager bjcaAddress];
//}

#pragma mark 是否存在证书
RCT_EXPORT_METHOD(existsCert:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL cert = [BjcaSignManager bjcaExistsCert];
        NSMutableArray *array = [[NSMutableArray alloc]init];
        
        [array addObject:[NSNumber numberWithBool:cert]];
        if (callback) {
            callback(array);
        }
    });
}

#pragma mark 环境设置
RCT_EXPORT_METHOD(setServerUrl:(NSNumber *_Nonnull)severType clientId:(NSString*)clientId completion:(RCTResponseSenderBlock)callback){
    // 对安卓的兼容保留callback
    [BjcaSignManager.bjcaShareBjcaSignManager startWithClientId:clientId
                                                    environment:[severType intValue]];
    [BjcaSignManager.bjcaShareBjcaSignManager setupUIForNavigationBarTintColor:[UIColor blackColor] navigationBarBackgroundColor:[UIColor whiteColor]];
}

#pragma mark 清除证书
RCT_EXPORT_METHOD(clearCert){
    [BjcaSignManager bjcaRemoveCert];
}



#pragma mark 获取sdk版本号
RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *version = [BjcaSignManager bjcaVersion];
        NSMutableArray *array = [[NSMutableArray alloc]init];
        [array addObject:version];
        if(callback){
            callback(array);
        }
    });
    
}

#pragma mark 获取指纹签名状态
RCT_EXPORT_METHOD(getFingerSignState:(RCTResponseSenderBlock)callback){
   
    dispatch_async(dispatch_get_main_queue(), ^{
      
        BOOL flag = [BjcaSignManager bjcaFingerState];
        NSMutableArray *array = [[NSMutableArray alloc]init];
        if (flag) {
            [array addObject:@"YES"];
        }else{
            [array addObject:@"NO"];
        }
        if(callback){
            callback(array);
        }
    });
    
}

#pragma mark 设置证书类型为公众类型证书
RCT_EXPORT_METHOD(initCertEnvType:(NSString *)certType){
    
    dispatch_async(dispatch_get_main_queue(), ^{
      
        if ([certType isEqualToString:BjcaCertMass]) {
            [BjcaSignManager performSelector:@selector(setCertTypeToMass)];
        }else{
            
            [BjcaSignManager performSelector:@selector(setCertTypeToDoctor)];
        }
        
    });
    
    
}

#pragma mark 开启指纹签名状态
RCT_EXPORT_METHOD(alterFingerSignState:(NSString*)fingerSignState completion:(RCTResponseSenderBlock)callback){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    
        if ([fingerSignState isEqualToString:@"YES"])
        {
            [self.signer bjcaFingerSign: ctrl];
        }
        else
        {
            [self.signer bjcaFingerSignClose:ctrl];
        }
    });
}

#pragma mark 开启自动签名
RCT_EXPORT_METHOD(signAutoRequest:(NSString*)clientId firmId:(NSString*)firmId sysTag:(NSString*)sysTag resolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.resolve = resolve;
        self.reject = reject;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        [self.signer signForSignAutoWithFirmId:firmId
                                      clientId:clientId
                                        sysTag:sysTag
                                   curViewCtrl:ctrl];
    });
}

#pragma mark 获取自动签信息
RCT_EXPORT_METHOD(signAutoInfo:(NSString *)clientId
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    dispatch_async(dispatch_get_main_queue(), ^{
        self.resolve = resolve;
        self.reject = reject;
        [self.signer signAutoInfo:clientId];
    });
}

#pragma mark 关闭自动签名
RCT_EXPORT_METHOD(signAutoStop:(NSString*)clientId firmId:(NSString*)firmId sysTag:(NSString*)sysTag resolver:(RCTPromiseResolveBlock)resolve
rejecter:(RCTPromiseRejectBlock)reject){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.resolve = resolve;
        self.reject = reject;
        [self.signer stopSignAutoWithFirmId:firmId clientId:clientId sysTag:sysTag];
    });
}

#pragma mark 开启授权签名
RCT_EXPORT_METHOD(sureGrantSign:(NSString*)clientId
                  firmId:(NSString*)firmId
                  grantedUserId:(NSString*)grantedUserId
                  timeOut:(NSNumber *_Nonnull)timeOut
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.resolve = resolve;
        self.reject = reject;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        [self.signer startGrantSign:clientId
                             firmId:firmId
                      grantedUserId:grantedUserId
                            timeOut:[timeOut intValue]
              currentViewController:ctrl];
    });
}


#pragma mark 设置本地保存的显示语言
RCT_EXPORT_METHOD(setLanguage:(NSString *)appLanguage){
    dispatch_async(dispatch_get_main_queue(), ^{
        [BjcaSignManager bjcaSetAppLanguage:appLanguage];
    });
}

#pragma mark 获取openId
RCT_EXPORT_METHOD(getOpenId:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        NSString *openId = [BjcaSignManager bjcaOpenId];
        if (openId == nil) {
            openId = @"";
        }
        if (callback) {
            NSMutableArray *array = [[NSMutableArray alloc]init];
            [array addObject:openId];
            callback(array);
        }
    });
}

#pragma mark 显示Pin码键盘
RCT_EXPORT_METHOD(showPinWindow:(NSString*)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        [self.signer showPinWindow];
    });
}

#pragma mark 消失Pin码键盘
RCT_EXPORT_METHOD(hidePinWindow:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
//        self.callBack = callback;
//        [self.signer showPinWindow];
    });
}

#pragma mark -业务回调
- (void)BjcaFinished:(NSDictionary *)backParam{
    NSMutableArray *array = [[NSMutableArray alloc]init];
    //    签名操作，iOS和安卓协定的sdk返回值不一致，iOS原生处理一下
    //    如果成功
    if([backParam[@"status"] isEqualToString:@"0"] && [backParam[@"businessType"] integerValue] == BjcaBusinessSignList){
        
        NSMutableDictionary *result = [NSMutableDictionary dictionaryWithDictionary:backParam];
        [result removeObjectForKey:@"data"];
        NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithDictionary:backParam[@"data"]];
        NSMutableArray *uniqueIds = dic[@"uniqueIds"];
        [dic removeObjectForKey:@"uniqueId"];
        [dic setObject:uniqueIds forKey:@"uniqueIds"];
        
        [result addEntriesFromDictionary:dic];
        [array addObject:result];
        
    }else if([backParam[@"status"] isEqualToString:@"0"] &&[backParam[@"businessType"] integerValue] == BjcaBusinessAutomationSign){
        
        NSDictionary*backDictData=backParam[@"data"];
        NSArray*SignDataArr=backDictData[@"SignDataArr"];

        NSDictionary*dictData=SignDataArr[0];
        NSMutableArray*dataAry=[NSMutableArray arrayWithObjects:@{@"uniqueId":dictData[@"signDataJobID"],@"signP1Data":dictData[@"signature"]}, nil];

        NSMutableDictionary*dict =[NSMutableDictionary dictionaryWithObjectsAndKeys:@"0",@"status",@"操作成功",@"message",backDictData[@"SignJobID"],@"signId",dataAry,@"signedList", nil];

        [array addObject:dict];

    }else{
        [array addObject:backParam];
    }
    
    if (self.callBack) {
        self.callBack(array);
        self.callBack = nil;
    }
    if (self.resolve) {
        self.resolve(backParam);
        self.resolve = nil;
        self.reject = nil;
    }
}
@end



