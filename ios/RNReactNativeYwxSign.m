
#import "RNReactNativeYwxSign.h"
#import <UIKit/UIKit.h>
//#import "BjcaSignManager.h"
//#import "BjcaPublicConst.h"
#import <BjcaSignSDK/BjcaSignManager.h>
#import <BjcaSignSDK/BjcaPublicConst.h>
#import "BjcaRNTools.h"
@interface RNReactNativeYwxSign()<BjcaSignDelegate>

@property (nonatomic,strong) BjcaSignManager *signer;

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
RCT_EXPORT_MODULE(SignModule)

- (NSDictionary *)constantsToExport {
    return @{@"BjcaPublic": @(BjcaPublic),
             @"BjcaIntegrate": @(BjcaIntegrate),
             @"BjcaDev": @(BjcaDev),
             @"BjcaTest": @(BjcaTest),
             };
}

#pragma mark 证书下载
RCT_EXPORT_METHOD(CertDown:(NSString *)clientId phone:(NSString *)phone){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertDown:clientId phoneNum:phone curViewCtrl:ctrl];
}

#pragma mark 证书更新
RCT_EXPORT_METHOD(CertUpdate:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertUpdate:clientId curViewCtrl:ctrl];
}

#pragma mark 证书密码重置
RCT_EXPORT_METHOD(CertReset:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertReset:clientId curViewCtrl:ctrl];
}

#pragma mark 签章设置
RCT_EXPORT_METHOD(setStamp:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaSetStamp:clientId curViewCtrl:ctrl navColor:nil navFontColor:nil];
}


#pragma mark 批量签名
RCT_EXPORT_METHOD(SignList:(NSMutableArray *)uniqueIds clientId:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaBatchSignList:uniqueIds userClientId:clientId curViewCtrl:ctrl];
}

#pragma mark 免密签名开关
RCT_EXPORT_METHOD(FreePin:(int)day clientId:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaFreePinSign:day clientId:clientId curViewCtrl:ctrl];
}

#pragma mark 二维码解析
RCT_EXPORT_METHOD(qrSign:(NSString *)qrString clientId:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaQrSign:qrString userClientId:clientId curViewCtrl:ctrl];
}

#pragma mark 获取用户信息
RCT_EXPORT_METHOD(getUserInfo:(NSString *)clientId){
    [self.signer bjcaUserInfo:clientId];
}


#pragma mark 打开证书详情页
RCT_EXPORT_METHOD(openCertDetails:(NSString *)clientId){
    UIViewController *ctrl = [BjcaRNTools getCurrentVC];
    [self.signer bjcaCertDetail:clientId curViewCtrl:ctrl navColor:nil navFontColor:nil];
}

#pragma mark 获取当前环境地址
RCT_EXPORT_METHOD(getCurAddress:(NSString *)clientId){
    NSString *address = [BjcaSignManager bjcaAddress];
}

#pragma mark 是否存在证书
RCT_EXPORT_METHOD(exiestCert){
    BOOL cert = [BjcaSignManager bjcaExistsCert];
}

#pragma mark 环境设置
RCT_EXPORT_METHOD(setServerUrl:(NSNumber *_Nonnull)severType){
    [BjcaSignManager bjcaSetServerURL:[severType intValue]];
}

#pragma mark -业务回调
- (void)BjcaFinished:(NSDictionary *)backParam{
    NSLog(@"%@",backParam);
}
@end
