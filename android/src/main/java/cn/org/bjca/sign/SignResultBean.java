package cn.org.bjca.sign;

import com.google.gson.Gson;

import java.io.Serializable;
import java.util.List;

/*************************************************************************************************
 * <pre>
 * @包路径： cn.org.bjca.sign
 * @版权所有： 北京数字认证股份有限公司 (C) 2019
 *
 * @类描述:
 * @版本: V1.5.1
 * @作者 daizhenhong
 * @创建时间 2019/11/19 3:42 PM
 *
 * @修改记录：
-----------------------------------------------------------------------------------------------
----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
-----------------------------------------------------------------------------------------------
</pre>
 ************************************************************************************************/
public class SignResultBean implements Serializable {

    private String status;
    private String message;
    private List<SignedBean> signedList;
    private String signId;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<SignedBean> getSignedList() {
        return signedList;
    }

    public void setSignedList(List<SignedBean> signedList) {
        this.signedList = signedList;
    }

    public String getSignId() {
        return signId;
    }

    public void setSignId(String signId) {
        this.signId = signId;
    }

    public static class SignedBean implements Serializable {
        private String signP1Data;
        private String uniqueId;

        public SignedBean() {
        }

        public String getSignP1Data() {
            return this.signP1Data;
        }

        public void setSignP1Data(String var1) {
            this.signP1Data = var1;
        }

        public String getUniqueId() {
            return this.uniqueId;
        }

        public void setUniqueId(String var1) {
            this.uniqueId = var1;
        }
    }

    public String toJson() {
        return (new Gson()).toJson(this);
    }

}
