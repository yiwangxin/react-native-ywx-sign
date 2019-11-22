package cn.org.bjca.sign;

import android.app.Activity;
import android.content.Context;
import android.telecom.Call;
import android.text.TextUtils;
import android.util.JsonReader;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JsonWriter;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.module.annotations.ReactModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nullable;

import cn.org.bjca.sdk.core.bean.FingerSignState;
import cn.org.bjca.sdk.core.bean.ResultBean;
import cn.org.bjca.sdk.core.inner.activity.CertActivity;
import cn.org.bjca.sdk.core.inner.bean.SignP1Bean;
import cn.org.bjca.sdk.core.inner.listener.ISignetSign;
import cn.org.bjca.sdk.core.inner.manage.SignetSignManage;
import cn.org.bjca.sdk.core.inner.values.CertEnvType;
import cn.org.bjca.sdk.core.inner.values.SignetCode;
import cn.org.bjca.sdk.core.kit.BJCASDK;
import cn.org.bjca.sdk.core.kit.YWXListener;
import cn.org.bjca.sdk.core.manage.SignetManager;
import cn.org.bjca.sdk.core.values.ConstantParams;
import cn.org.bjca.sdk.core.values.EnvType;
import cn.org.bjca.signet.component.core.bean.params.SignDataInfos;
import cn.org.bjca.signet.component.core.bean.results.SignDataPinResult;

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

        final String callbackKey = CallbackHelper.sign;
//        if (CallbackHelper.checkCallback(callbackKey, callback)) {
//            return;
//        }
        mActivity = getCurrentActivity();

        if (uniqueIdList != null) {
            List list = uniqueIdList.toArrayList();
            BJCASDK.getInstance().sign(mActivity, clientId, list, new YWXListener() {
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
//        if (CallbackHelper.checkCallback(callbackKey, callback)) {
//            return;
//        }

        mActivity = getCurrentActivity();
        if (uniqueIdList != null) {
            List list = uniqueIdList.toArrayList();
            BJCASDK.getInstance().signForTeam(mActivity, clientId, list, new YWXListener() {
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
    public void signBySignet(String signId, final Callback callback) {
//        final String callbackKey = CallbackHelper.sign;
//        if (CallbackHelper.checkCallback(callbackKey, callback)) {
//            return;
//        }
        mActivity = getCurrentActivity();
        SignetSignManage.signBySignet(getCurrentActivity(), signId, new ISignetSign() {
            @Override
            public void signDataWithPinCallBack(SignDataPinResult signDataResult) {
                signetSignBack(signDataResult, callback);
            }

            @Override
            public void signDataPinResult(SignDataPinResult signDataResult) {
                signetSignBack(signDataResult, callback);

            }
        });
    }

    private void signetSignBack(SignDataPinResult signDataResult, Callback callback) {
        SignResultBean signResultBean = new SignResultBean();
        signResultBean.setStatus(signDataResult.getErrCode());
        signResultBean.setMessage(signDataResult.getErrMsg());

        if (TextUtils.equals(signDataResult.getErrCode(), SignetCode.SUCCESS)) {
            signResultBean.setStatus(ConstantParams.SUCCESS);
            signResultBean.setSignId(signDataResult.getSignDataJobId());

            List<SignDataInfos> list = signDataResult.getSignDataInfos();
            List signP1List = new ArrayList();
            for (int i = 0; i < list.size(); i++) {
                SignResultBean.SignedBean signP1Bean = new SignResultBean.SignedBean();

                signP1Bean.setUniqueId(list.get(i).getBusinessId());
                signP1Bean.setSignP1Data(list.get(i).getSignature());
                signP1List.add(signP1Bean);
            }
            signResultBean.setSignedList(signP1List);
        }

        final String callbackKey = CallbackHelper.signForTeam;
//        CallbackHelper.invoke(callbackKey,jsonObject.toString());
        invokeJsonCallback(callback, signResultBean.toJson());

    }


    @Nullable
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

        static boolean checkCallback(String key, Callback callback) {
            boolean hasCallback = hasCallback(key);
            putCallback(key, callback);
//            if (!hasCallback) {
//                putCallback(key, callback);
//            }
//            else {
//                invokeWorking(callback);
//            }
            return hasCallback;
        }

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
            Callback callback = getCallback(key);
            if (callback != null) {
                callback.invoke(json);
                mCallbackMap.remove(key);
            }
        }
    }

}
