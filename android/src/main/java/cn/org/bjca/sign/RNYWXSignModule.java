package cn.org.bjca.sign;

import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/*************************************************************************************************
 * <pre>
 * @包路径： cn.org.bjca.sign
 * @版权所有： 北京数字认证股份有限公司 (C) 2018
 *
 * @类描述:
 * @版本: V1.5.1
 * @作者 daizhenhong
 * @创建时间 2018/12/12 上午11:42
 *
 * @修改记录：
-----------------------------------------------------------------------------------------------
----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
-----------------------------------------------------------------------------------------------
</pre>
 ************************************************************************************************/
public class RNYWXSignModule extends ReactContextBaseJavaModule {
    public RNYWXSignModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "YWXSignModule";
    }

    @ReactMethod
    public void showLog(String log) {
        Log.e("TAG", log);
    }

    @ReactMethod
    public void showToast(String message) {
        if (!TextUtils.isEmpty(message)) {
            Toast.makeText(getCurrentActivity(), message, Toast.LENGTH_SHORT).show();
        }
    }
}
