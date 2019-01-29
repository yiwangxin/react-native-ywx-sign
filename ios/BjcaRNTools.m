//
//  BjcaTools.m
//  RNReactNativeYwxSign
//
//  Created by 吴兴 on 2018/12/21.
//  Copyright © 2018 Facebook. All rights reserved.
//
#import <UIKit/UIKit.h>
#import "BjcaRNTools.h"
@implementation BjcaRNTools
//获取当前屏幕显示的viewcontroller
+ (UIViewController *)getCurrentVC1
{
    UIViewController *rootViewController = [self getViewControllerWindow].rootViewController;
    UIViewController *currentVC = [self getCurrentVCFrom:rootViewController];
    return currentVC;
}

//获取RootViewController所在的window
+ (UIWindow*)getViewControllerWindow{
    UIWindow *window = [UIApplication sharedApplication].delegate.window;
    if (window.windowLevel != UIWindowLevelNormal) {
        NSArray *windows = [UIApplication sharedApplication].windows;
        for (UIWindow *target in windows) {
            if (target.windowLevel == UIWindowLevelNormal) {
                window = target;
                break;
            }
        }
    }
    return window;
}

+ (UIViewController *)getCurrentVCFrom:(UIViewController *)rootVC
{
    UIViewController *currentVC;
    
    if ([rootVC presentedViewController]) {
        // 视图是被presented出来的
        while ([rootVC presentedViewController]) {
            rootVC = [rootVC presentedViewController];
        }
    }
    
    if ([rootVC isKindOfClass:[UITabBarController class]]) {
        // 根视图为UITabBarController
        currentVC = [self getCurrentVCFrom:[(UITabBarController *)rootVC selectedViewController]];
    } else if ([rootVC isKindOfClass:[UINavigationController class]]){
        // 根视图为UINavigationController
        currentVC = [self getCurrentVCFrom:[(UINavigationController *)rootVC visibleViewController]];
    } else {
        // 根视图为非导航类
        currentVC = rootVC;
        
    }
    
    return currentVC;
}


+ (UIViewController *)getCurrentVC{
     UIWindow *window = [[[UIApplication sharedApplication] windows] firstObject];
    return window.rootViewController;
}

+  (UIViewController *)getCurrentVC2 {
    for (UIWindow *window in [UIApplication sharedApplication].windows.reverseObjectEnumerator) {
        
        UIView *tempView = window.subviews.lastObject;
        
        for (UIView *subview in window.subviews.reverseObjectEnumerator) {
            if ([subview isKindOfClass:NSClassFromString(@"UILayoutContainerView")]) {
                tempView = subview;
                break;
            }
        }
        
        BOOL(^canNext)(UIResponder *) = ^(UIResponder *responder){
            if (![responder isKindOfClass:[UIViewController class]]) {
                return YES;
            } else if ([responder isKindOfClass:[UINavigationController class]]) {
                return YES;
            } else if ([responder isKindOfClass:[UITabBarController class]]) {
                return YES;
            } else if ([responder isKindOfClass:NSClassFromString(@"UIInputWindowController")]) {
                return YES;
            }
            return NO;
        };
        
        UIResponder *nextResponder = tempView.nextResponder;
        
        while (canNext(nextResponder)) {
            tempView = tempView.subviews.firstObject;
            if (!tempView) {
                return nil;
            }
            nextResponder = tempView.nextResponder;
        }
        
        UIViewController *currentVC = (UIViewController *)nextResponder;
        if (currentVC) {
            return currentVC;
        }
    }
    return nil;
    
}
@end
