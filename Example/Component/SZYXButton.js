/*************************************************************************************************
 * <pre>
 * @包路径：
 * @版权所有： 北京数字医信科技有限公司 (C) 2018
 *
 * @类描述:    按钮组件
 * @版本:       V3.1.0
 * @作者        wuxing
 * @邮箱        wuxing@bjca.org.cn
 * @创建时间    2018/11/1 3:16 PM
 *
 * @修改记录：
 -----------------------------------------------------------------------------------------------
 ----------- 时间      |   修改人    |     修改的方法       |         修改描述   ---------------
 -----------------------------------------------------------------------------------------------
 </pre>
 ************************************************************************************************/
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

export class SZYXButton extends PureComponent {
    constructor(props) {
        super(props)
        if (!this.props.touchClick) {
            throw new Error("请给touchClick添加方法")
        }
    }

    render() {
        return (
            <TouchableOpacity
                disabled={this.props.disabled ? this.props.disabled : false}
                style={this.props.touchStyle ? this.props.touchStyle : SZYXButtonStyles.touchDefault}
                onPress={() => {
                    if (this.props.touchClick)
                        this.props.touchClick()
                }}
            >

                <Text
                    style={this.props.touchTextStyle ? this.props.touchTextStyle : SZYXButtonStyles.touchTextDefault}
                >{this.props.touchText}</Text>
            </TouchableOpacity>
        );
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }
}

const SZYXButtonStyles = StyleSheet.create({
    touchDefault: {},
    touchTextDefault: {}
});
