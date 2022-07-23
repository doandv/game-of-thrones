import React, { Component } from 'react';
import '../../../css/MgLoading.scss';
import PropTypes from 'prop-types';
import { type } from '@testing-library/user-event/dist/type';
type LoadingProps = {
    isShow: boolean,
    callback: any
}
type LoadingState = {
    isShow: boolean,
}

export default class LoadingComp extends Component<LoadingProps, LoadingState> {
    state: LoadingState = {
        isShow: this.props.isShow ? this.props.isShow : false
    };
  
    onClose() {
        let _this = this;
        _this.setState({
            isShow: false
        }, () => {
            if (_this.props.callback) _this.props.callback();
        });
    }
    onShow() {
        let _this = this;
        _this.setState({
            isShow: true
        }, () => {
            if (_this.props.callback) _this.props.callback();
        })
    }

    render() {
        const { isShow } = this.state;
        if (!isShow) {
            return null;
        }
        return (<div className='loading-container'>
            <div className='loading'>
                <div className='loading'>
                    <div className="loading-item l-1">
                        <div className="item-content itm-1">
                        </div>
                    </div>
                    <div className="loading-item l-2" >
                        <div className="item-content itm-2">
                        </div>
                    </div>
                    <div className="loading-item l-3" >
                        <div className="item-content itm-3">
                        </div>
                    </div>
                    <div className="loading-item l-4" >
                        <div className="item-content itm-4">
                        </div>
                    </div>
                    <div className="loading-item l-5" >
                        <div className="item-content itm-5">
                        </div>
                    </div>
                    <div className="loading-item l-6" >
                        <div className="item-content itm-6">
                        </div>
                    </div>
                    <div className="loading-item l-7" >
                        <div className="item-content itm-7">
                        </div>
                    </div>
                    <div className="loading-item l-8" >
                        <div className="item-content itm-8">
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}