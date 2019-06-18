
#import "RNReactNativeYwxSign.h"
#import <UIKit/UIKit.h>
//#import <>
#import <BjcaSignSDK/BjcaSignManager.h>
#import <BjcaSignSDK/BjcaPublicConst.h>
#import "BjcaRNTools.h"
@interface RNReactNativeYwxSign()<BjcaSignDelegate>

@property (nonatomic,strong) BjcaSignManager *signer;

@property (nonatomic,strong) RCTResponseSenderBlock callBack;

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


#pragma mark 批量签名
RCT_EXPORT_METHOD(sign:(NSString *)clientId uniqueIds:(NSArray *)uniqueIds completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        NSMutableArray *array = [NSMutableArray arrayWithArray:uniqueIds];
        [self.signer bjcaBatchSignList:array userClientId:clientId curViewCtrl:ctrl];
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
    BOOL isPin = [BjcaSignManager bjcaExistsFreePin];
    NSMutableArray *array = [[NSMutableArray alloc]init];
    
    [array addObject:[NSNumber numberWithBool:isPin]];
    if (callback) {
        callback(array);
    }
    
}

#pragma mark 关闭免密
RCT_EXPORT_METHOD(clearPin){
    [BjcaSignManager bjcaRemovePin];
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
    self.callBack = callback;
    [self.signer bjcaUserInfo:clientId];
}


#pragma mark 打开证书详情页
RCT_EXPORT_METHOD(showCertView:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertDetail:clientId curViewCtrl:ctrl navColor:nil navFontColor:nil];
}

//#pragma mark 获取当前环境地址
//RCT_EXPORT_METHOD(getCurAddress:(NSString *)clientId){
//    NSString *address = [BjcaSignManager bjcaAddress];
//}

#pragma mark 是否存在证书
RCT_EXPORT_METHOD(existsCert:(RCTResponseSenderBlock)callback){
    BOOL cert = [BjcaSignManager bjcaExistsCert];
    NSMutableArray *array = [[NSMutableArray alloc]init];
    
    [array addObject:[NSNumber numberWithBool:cert]];
    if (callback) {
        callback(array);
    }
}

#pragma mark 环境设置
RCT_EXPORT_METHOD(setServerUrl:(NSNumber *_Nonnull)severType completion:(RCTResponseSenderBlock)callback){
    //    对安卓的兼容保留callback
    [BjcaSignManager bjcaSetServerURL:[severType intValue]];
}

#pragma mark 清除证书
RCT_EXPORT_METHOD(clearCert){
    [BjcaSignManager bjcaRemoveCert];
}



#pragma mark 获取sdk版本号
RCT_EXPORT_METHOD(getVersion:(RCTResponseSenderBlock)callback){
    NSString *version = [BjcaSignManager bjcaVersion];
    NSMutableArray *array = [[NSMutableArray alloc]init];
    
    [array addObject:version];
    if(callback){
        callback(array);
    }
}

#pragma mark 获取指纹签名状态
RCT_EXPORT_METHOD(getFingerSignState:(RCTResponseSenderBlock)callback){
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
}

#pragma mark 设置证书类型为公众类型证书
RCT_EXPORT_METHOD(initCertEnvType:(NSString *)certType){
    if ([certType isEqualToString:BjcaCertMass]) {
        [BjcaSignManager performSelector:@selector(setCertTypeToMass)];
    }
}

#pragma mark 开启指纹签名状态
RCT_EXPORT_METHOD(alterFingerSignState:(NSString*)fingerSignState :(RCTResponseSenderBlock)callback){
    
    dispatch_async(dispatch_get_main_queue(), ^{
        self.callBack = callback;
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        NSMutableArray *array = [[NSMutableArray alloc]init];
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

#pragma mark -业务回调
- (void)BjcaFinished:(NSDictionary *)backParam{
    NSMutableArray *array = [[NSMutableArray alloc]init];
    //    签名操作，iOS和安卓协定的sdk返回值不一致，iOS原生处理一下
    //    如果成功
    if([backParam[@"status"] isEqualToString:@"0"] && [backParam[@"businessType"] integerValue] == BjcaBusinessSignList){
        
        NSMutableDictionary *result = [NSMutableDictionary dictionaryWithDictionary:backParam];
        [result removeObjectForKey:@"data"];
        NSMutableDictionary *dic = [NSMutableDictionary dictionaryWithDictionary:backParam[@"data"]];
        NSMutableArray *uniqueIds = dic[@"uniqueId"];
        [dic removeObjectForKey:@"uniqueId"];
        [dic setObject:uniqueIds forKey:@"uniqueIds"];
        
        [result addEntriesFromDictionary:dic];
        [array addObject:result];
    }else{
        [array addObject:backParam];
    }
    
    if (self.callBack) {
        self.callBack(array);
    }
}
@end

