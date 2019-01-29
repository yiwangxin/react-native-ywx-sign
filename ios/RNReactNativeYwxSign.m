
#import "RNReactNativeYwxSign.h"
#import <UIKit/UIKit.h>
//#import "BjcaSignManager.h"
//#import "BjcaPublicConst.h"
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
    //设置默认环境
    [BjcaSignManager bjcaSetServerURL:BjcaDev];
    _signer.bjcaSignDelegate = self;
    
    return _signer;
}

+ (BOOL)requiresMainQueueSetup{
    return YES;
}
RCT_EXPORT_MODULE(SignModule)

- (NSDictionary *)constantsToExport {
    return @{@"BjcaPublic": @(BjcaPublic),
             @"BjcaIntegrate": @(BjcaIntegrate),
             @"BjcaDev": @(BjcaDev),
             @"BjcaTest": @(BjcaTest),
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
RCT_EXPORT_METHOD(sign:(NSArray *)uniqueIds clientId:(NSString *)clientId completion:(RCTResponseSenderBlock)callback){
    dispatch_async(dispatch_get_main_queue(), ^{
        UIViewController *ctrl = [BjcaRNTools getCurrentVC];
        self.callBack = callback;
        NSMutableArray *array = [NSMutableArray arrayWithArray:uniqueIds];
        [self.signer bjcaBatchSignList:array userClientId:clientId curViewCtrl:ctrl];
    });
}

#pragma mark 免密签名开启
RCT_EXPORT_METHOD(keepPin:(NSString *)clientId day:(NSString *)day completion:(RCTResponseSenderBlock)callback){
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
RCT_EXPORT_METHOD(qrDispose:(NSString *)qrString clientId:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaQrSign:qrString userClientId:clientId curViewCtrl:ctrl];
}

#pragma mark 获取用户信息
RCT_EXPORT_METHOD(getCertInfo:(NSString *)clientId){
    [self.signer bjcaUserInfo:clientId];
}


#pragma mark 打开证书详情页
RCT_EXPORT_METHOD(showCertView:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertDetail:clientId curViewCtrl:ctrl navColor:nil navFontColor:nil];
}

#pragma mark 获取当前环境地址
RCT_EXPORT_METHOD(getCurAddress:(NSString *)clientId){
    NSString *address = [BjcaSignManager bjcaAddress];
}

#pragma mark 是否存在证书
RCT_EXPORT_METHOD(existsCert){
    BOOL cert = [BjcaSignManager bjcaExistsCert];
}

#pragma mark 环境设置
RCT_EXPORT_METHOD(setServerUrl:(NSNumber *_Nonnull)severType){
    [BjcaSignManager bjcaSetServerURL:[severType intValue]];
}

#pragma mark 清除证书
RCT_EXPORT_METHOD(clearCert){
    
}



#pragma mark 获取sdk版本号
RCT_EXPORT_METHOD(getVersion){
    
}


#pragma mark -业务回调
- (void)BjcaFinished:(NSDictionary *)backParam{
    NSMutableArray *array = [[NSMutableArray alloc]init];
    [array addObject:backParam];
    if (self.callBack) {
        self.callBack(array);
    }
}
@end
