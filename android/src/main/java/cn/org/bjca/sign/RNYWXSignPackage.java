package cn.org.bjca.sign;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/*************************************************************************************************
 * <pre>
 * @包路径： cn.org.bjca.sign
 * @版权所有： 北京数字认证股份有限公司 (C) 2018
 *
 * @类描述:
 * @版本: V1.5.1
 * @作者 daizhenhong
 * @创建时间 2018/12/12 上午11:41
 *
 * @修改记录：
-----------------------------------------------------------------------------------------------
----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
-----------------------------------------------------------------------------------------------
</pre>
 ************************************************************************************************/
public class RNYWXSignPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new RNYWXSignModule(reactContext));
        return modules;
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList();
    }
}
