package cn.org.bjca.sign;

import android.app.Activity;
import android.text.TextUtils;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import cn.org.bjca.sdk.core.bean.FingerSignState;
import cn.org.bjca.sdk.core.inner.values.CertEnvType;
import cn.org.bjca.sdk.core.inner.values.SignetCode;
import cn.org.bjca.sdk.core.kit.BJCASDK;
import cn.org.bjca.sdk.core.kit.InnerSdk;
import cn.org.bjca.sdk.core.kit.YWXListener;
import cn.org.bjca.sdk.core.values.ConstantParams;
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
        callback.invoke(existsCert);
    }


    @ReactMethod
    public void certDown(String clientId, String phone, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certDown(mActivity, clientId, phone, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void certUpdate(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certUpdate(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void certResetPin(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().certResetPin(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void showCertView(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().showCertActivity(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void getCertInfo(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().getUserInfo(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void drawStamp(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().drawStamp(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    /**
     *
     * @param clientId
     * @param firmId
     * @param callback
     */
    @ReactMethod
    public void drawStampWidthFirmId(String clientId,String firmId, final Callback callback) {
        mActivity = getCurrentActivity();
        InnerSdk.get().drawStamp(mActivity, clientId,firmId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }
    @ReactMethod
    public void showPinWindow(String clientId, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().showPinWindow(mActivity, clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }
    @ReactMethod
    public void hidePinWindow(final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().hidePinWindow( new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    /**
     * 获取签章图片
     */
    @ReactMethod
    public void getStampPic(final Callback callback) {
        mActivity = getCurrentActivity();
        String stampPic = BJCASDK.getInstance().getStampPic(mActivity);
        callback.invoke(stampPic);
    }


    @ReactMethod
    public void clearCert() {
        mActivity = getCurrentActivity();
        String openId = BJCASDK.getInstance().clearCert(mActivity);
    }


    @ReactMethod
    public void keepPin(String clientId, int keepDay, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().keepPin(mActivity, clientId, keepDay, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }

    @ReactMethod
    public void isPinExempt(final Callback callback) {
        mActivity = getCurrentActivity();
        boolean isPinExempt = BJCASDK.getInstance().isPinExempt(mActivity);
        callback.invoke(isPinExempt);
    }

    @ReactMethod
    public void clearPin() {
        mActivity = getCurrentActivity();
        boolean success = BJCASDK.getInstance().clearPin(mActivity);
    }


    @ReactMethod
    public void sign(String clientId, ReadableArray uniqueIdList, final Callback callback) {
        this.signWithFirmId(clientId, clientId, uniqueIdList, callback);
    }


    @ReactMethod
    public void signWithFirmId(String clientId, String firmId, ReadableArray uniqueIdList, final Callback callback) {

        final String callbackKey = CallbackHelper.sign;
        CallbackHelper.putCallback(callbackKey, callback);
        mActivity = getCurrentActivity();

        if (uniqueIdList != null) {
            List list = uniqueIdList.toArrayList();
            InnerSdk.get().signWithFirmId(mActivity, clientId, firmId, list, new YWXListener() {
                @Override
                public void callback(String s) {
                    CallbackHelper.invoke(callbackKey, s);
                }
            });
        }
    }

    @ReactMethod
    public void signForTeam(String clientId, ReadableArray uniqueIdList, final Callback callback) {

        final String callbackKey = CallbackHelper.signForTeam;
        CallbackHelper.putCallback(callbackKey, callback);

        mActivity = getCurrentActivity();
        if (uniqueIdList != null) {
            List list = uniqueIdList.toArrayList();
            InnerSdk.get().signForTeam(mActivity, clientId, list, new YWXListener() {
                @Override
                public void callback(String s) {
                    CallbackHelper.invoke(callbackKey, s);
                }
            });
        }
    }


    @ReactMethod
    public void qrDispose(String clientId, String qrText, final Callback callback) {
        mActivity = getCurrentActivity();
        BJCASDK.getInstance().qrDispose(mActivity, clientId, qrText, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });
    }


    @ReactMethod
    public void getVersion(final Callback callback) {
        String version = BJCASDK.getInstance().getVersion();
        callback.invoke(version);
    }

    @ReactMethod
    public void getOpenId(final Callback callback) {
        mActivity = getCurrentActivity();
        String openId = BJCASDK.getInstance().getOpenId(mActivity);
        if (TextUtils.isEmpty(openId)) {
            openId = "";
        }
        callback.invoke(openId);
    }


    @ReactMethod
    public void setServerUrl(int env,String clientId, final Callback callback) {
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
     *
     * @param fingerSignState
     * @param callback
     */
    @ReactMethod
    public void alterFingerSignState(int fingerSignState, final Callback callback) {
        mActivity = getCurrentActivity();
        FingerSignState state = null;
        try {
            state = FingerSignState.values()[fingerSignState];
        } catch (IndexOutOfBoundsException ex) {
            throw ex;
        }
        BJCASDK.getInstance().alterFingerSignState(mActivity, state, new YWXListener() {
            @Override
            public void callback(String s) {
                invokeJsonCallback(callback, s);
            }
        });

    }

    @ReactMethod
    public void getFingerSignState(final Callback callback) {
        mActivity = getCurrentActivity();
        FingerSignState fingerSignState = BJCASDK.getInstance().getFingerSignState(mActivity);
        callback.invoke(fingerSignState.ordinal());
    }

    /**
     * 重新初始化证书用户类型   0-医师用户  1-公众用户
     *
     * @param certEnvIndex
     */
    @ReactMethod
    public void initCertEnvType(int certEnvIndex) {
        CertEnvType envType = CertEnvType.DOCTOR;
        int length = EnvType.values().length;
        if (certEnvIndex >= 0 && certEnvIndex < length) {
            envType = CertEnvType.values()[certEnvIndex];
        }
        BJCASDK.getInstance().initCertEnvType(envType);
    }

    @ReactMethod
    public void signAutoRequest(String clientId, String firmId, String sysTag, Promise promise) {
        PromiseHelper.putPromise(PromiseHelper.signAutoRequest, promise);
        InnerSdk.get().signForSignAuto(getCurrentActivity(), clientId, firmId, sysTag, new YWXListener() {
            @Override
            public void callback(String s) {
                PromiseHelper.resolve(PromiseHelper.signAutoRequest, s);
            }
        });
    }

    @ReactMethod
    public void sureGrantSign(String clientId, String firmId, String grantedUserId, int timeOut, Promise promise) {
        PromiseHelper.putPromise(PromiseHelper.sureGrantSign, promise);
        InnerSdk.get().sureGrantSign(getCurrentActivity(), clientId, firmId, grantedUserId, timeOut, new YWXListener() {
            @Override
            public void callback(String s) {
                PromiseHelper.resolve(PromiseHelper.sureGrantSign, s);
            }
        });
    }

    @ReactMethod
    public void signAutoInfo(String clientId, Promise promise) {
        PromiseHelper.putPromise(PromiseHelper.signAutoInfo, promise);
        BJCASDK.getInstance().signAutoInfo(getCurrentActivity(), clientId, new YWXListener() {
            @Override
            public void callback(String s) {
                PromiseHelper.resolve(PromiseHelper.signAutoInfo, s);
            }
        });
    }

    @ReactMethod
    public void signAutoStop(String clientId, String firmId, String sysTag, Promise promise) {
        PromiseHelper.putPromise(PromiseHelper.signAutoStop, promise);
        InnerSdk.get().stopSignAuto(getCurrentActivity(), clientId, firmId, sysTag, new YWXListener() {
            @Override
            public void callback(String s) {
                PromiseHelper.resolve(PromiseHelper.signAutoStop, s);
            }
        });
    }

    @ReactMethod
    public void setLanguage(String language) {
        BJCASDK.getInstance().setLanguage(language);
    }


    @ReactMethod
    public void setIsHideSignLoading(boolean hide) {
        InnerSdk.get().setIsHideSignLoading(hide);
    }


    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put("BjcaPublic", EnvType.PUBLIC.ordinal());
        constants.put("BjcaIntegrate", EnvType.INTEGRATE.ordinal());
        constants.put("BjcaTest", EnvType.TEST_DOMAIN.ordinal());
        constants.put("BjcaDev", EnvType.DEV_DOMAIN.ordinal());


        constants.put("BjcaCertDoctor", CertEnvType.DOCTOR.ordinal());
        constants.put("BjcaCertMass", CertEnvType.MASS.ordinal());

        constants.put("BjcaFingerSignOn", FingerSignState.on.ordinal());
        constants.put("BjcaFingerSignOff", FingerSignState.off.ordinal());

        constants.put("BJCAVersion", BJCASDK.getInstance().getVersion());
        return constants;
    }

    private void invokeJsonCallback(Callback callback, String jsonStr) {
        callback.invoke(jsonStr);
    }


    private final static class CallbackHelper {

        private static Map<String, Callback> mCallbackMap = new HashMap<>();

        final static String sign = "sign";
        final static String signBySignet = "signBySignet";
        final static String signForTeam = "signForTeam";

        static boolean hasCallback(String key) {
            return mCallbackMap.get(key) != null;
        }

        static Callback getCallback(String key) {
            Callback callback = mCallbackMap.get(key);
            if (callback != null) {
                mCallbackMap.remove(key);
            }
            return callback;
        }

        static void putCallback(String key, Callback callback) {
            mCallbackMap.put(key, callback);
        }

        static void invokeWorking(Callback callback) {
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("status", "9000");
                jsonObject.put("message", "当前任务正在进行，请稍后再试～");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            callback.invoke(jsonObject.toString());
        }

        static void invoke(String key, String json) {
            synchronized (CallbackHelper.class) {
                Callback callback = getCallback(key);
                if (callback != null) {
                    callback.invoke(json);
                    mCallbackMap.remove(key);
                }
            }

        }
    }

    private final static class PromiseHelper {

        private static Map<String, Promise> mPromiseMap = new HashMap<>();

        final static String signAutoRequest = "signAutoRequest";
        final static String sureGrantSign = "sureGrantSign";
        final static String signAutoInfo = "signAutoInfo";
        final static String signAutoStop = "signAutoStop";

        static boolean hasPromise(String key) {
            return mPromiseMap.get(key) != null;
        }

        static Promise getPromise(String key) {
            Promise promise = mPromiseMap.get(key);
            if (promise != null) {
                mPromiseMap.remove(key);
            }
            return promise;
        }

        static void putPromise(String key, Promise promise) {
            mPromiseMap.put(key, promise);
        }

        static void resolveWorking(Callback callback) {
            JSONObject jsonObject = new JSONObject();
            try {
                jsonObject.put("status", "9000");
                jsonObject.put("message", "当前任务正在进行，请稍后再试～");
            } catch (JSONException e) {
                e.printStackTrace();
            }
            callback.invoke(jsonObject.toString());
        }

        static void resolve(String key, String json) {
            Promise promise = getPromise(key);
            if (promise != null) {
                promise.resolve(json);
                mPromiseMap.remove(key);
            }
        }
    }

}
