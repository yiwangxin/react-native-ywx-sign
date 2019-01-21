package cn.org.bjca.sign;

import android.app.Activity;
import android.content.Context;
import android.text.TextUtils;
import android.util.JsonReader;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JsonWriter;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import java.util.List;

import cn.org.bjca.sdk.core.bean.FingerSignState;
import cn.org.bjca.sdk.core.kit.BJCASDK;
import cn.org.bjca.sdk.core.kit.YWXListener;
import cn.org.bjca.sdk.core.utils.Logs;
import cn.org.bjca.sdk.core.values.EnvType;

/*************************************************************************************************
 * <pre>
 * @包路径： cn.org.bjca.sign
 * @版权所有： 北京数字医信科技有限公司 (C) 2018
 *
 * @类描述:
 * @版本: V3.0.0
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
    private Activity mActivity;
    private final String TAG = this.getClass().getSimpleName();

    public RNYWXSignModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.mActivity = getCurrentActivity();
    }

    @Override
    public String getName() {
        return "YWXSignModule";
    }

    @ReactMethod
    public void existsCert(Callback callback) {
        mActivity = getCurrentActivity();
        boolean existsCert = BJCASDK.getInstance().existsCert(this.mActivity);
        this.invokeBoolean(callback, existsCert);
    }


    @ReactMethod
    public void certDown(String clientId, String phone, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certDown(mActivity, clientId, phone, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void certUpdate(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certUpdate(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void certResetPin(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certResetPin(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void showCertView(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().showCertActivity(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void getCertInfo(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().getUserInfo(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void drawStamp(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().drawStamp(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }


    @ReactMethod
    public void clearCert(final Callback callback) {
        mActivity = getCurrentActivity();
        String openId = BJCASDK.getInstance().clearCert(mActivity);
        callback.invoke(openId);
    }


    @ReactMethod
    public void keepPin(String clientId, int keepDay, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().keepPin(mActivity, clientId, keepDay, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }

    @ReactMethod
    public void isPinExempt(final Callback callback) {
        mActivity = getCurrentActivity();
        boolean isPinExempt = BJCASDK.getInstance().isPinExempt(mActivity);
        this.invokeBoolean(callback, isPinExempt);
    }

    @ReactMethod
    public void clearPin(final Callback callback) {
        mActivity = getCurrentActivity();
        boolean success = BJCASDK.getInstance().clearPin(mActivity);
        this.invokeBoolean(callback, success);
    }


    @ReactMethod
    public void sign(String clientId, ReadableArray uniqueIdList, final Callback callback) {
        mActivity = getCurrentActivity();
        List list = uniqueIdList.toArrayList();
        BJCASDK.getInstance().sign(mActivity, clientId, list, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });

    }


    @ReactMethod
    public void qrDispose(String clientId, String qrText, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().qrDispose(mActivity, clientId, qrText, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });
    }


    @ReactMethod
    public void getVersion(final Callback callback) {
        String version = BJCASDK.getInstance().getVersion();
        callback.invoke(version);
    }


    @ReactMethod
    public void setServerUrl(int env, final Callback callback) {
        EnvType envType = EnvType.PUBLIC;
        int length = EnvType.values().length;
        if (env >= 0 && env < length) {
            envType = EnvType.values()[env];
        }
        String serverUrl = BJCASDK.getInstance().setServerUrl(envType);
        callback.invoke(serverUrl);
    }


    /**
     * 修改指纹签名
     * @param fingerSignState
     * @param callback
     */
    @ReactMethod
    public void alterFingerSignState(int fingerSignState, final Callback callback) {
        mActivity = getCurrentActivity();
        FingerSignState state =null;
        try {
            state = FingerSignState.values()[fingerSignState];
        } catch (IndexOutOfBoundsException ex) {
            Logs.e(ex);
            throw ex;
        }
        BJCASDK.getInstance().alterFingerSignState(mActivity,state, new YWXListener() {
            @Override
            public void callback(String s) {
                callback.invoke(s);
            }
        });

    }
    @ReactMethod
    public void getFingerSignState(final Callback callback) {
        mActivity = getCurrentActivity();
        FingerSignState fingerSignState = BJCASDK.getInstance().getFingerSignState(mActivity);
        callback.invoke(fingerSignState.ordinal());
    }


    private void invokeBoolean(Callback callback,boolean flag){
        callback.invoke(flag);
    }

}
