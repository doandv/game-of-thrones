import { Component } from "react";
import logoLogin from '../assets/images/logo.png';
import { FieldErrorEnum, FieldNameEnum, PageRouterEnum } from "../constants/enum";
import IconEyeCloseSvg from "../assets/svg/login/IconEyeCloseSvg";
import IconEyeOpenSvg from "../assets/svg/login/IconEyeOpenSvg";
import '../assets/css/login.css';
import { createJWTFake, getAccessToken } from "../commons/jwtToken";
import { LS_TOKEN_KEY } from "../constants";

type LoginCompProps = {};
type LoginCompState = {
    isLoading: boolean,
    loginFormData: LoginForm,
    loginFormError: LoginForm,
    isShowPwd: boolean,
    isLoginFail: boolean,
    isSubmitForm: boolean,
    isCheckedLogin: boolean
};
interface LoginForm {
    Email: string,
    Password: string
}

export default class LoginComp extends Component<LoginCompProps, LoginCompState> {
    state: LoginCompState = {
        isLoading: false,
        loginFormData: {
            Email: "",
            Password: ""
        },
        loginFormError: {
            Email: "",
            Password: ""
        },
        isShowPwd: false,
        isLoginFail: false,
        isSubmitForm: false,
        isCheckedLogin: false
    }

    componentWillMount() {
        let accessToken = getAccessToken();
        if(accessToken) {
            window.location.href = PageRouterEnum.HomePage;
        }
        this.setState({
            isCheckedLogin: true
        })
    }

    changeFieldInfo(fieldName: string, e:any) {
        let { loginFormData, isSubmitForm } = this.state;
        if (e != null && e.target != null) {
            let valueField = e.target.value != null ? e.target.value.trim() : "";
            switch (fieldName) {
                case FieldNameEnum.Email:
                    loginFormData.Email = valueField;
                    break;
                case FieldNameEnum.Password:
                    loginFormData.Password = valueField;
                    break;
            }
            this.setState({
                loginFormData: loginFormData
            });
            if(isSubmitForm) {
                this.validateFormData(loginFormData, fieldName);
            }
        }
    }

    onKeyDownFieldInfo(e:any) {
        if(e.keyCode === 13){
            this.handleLogin();
        }
    }

    validateFormData(loginFormData:LoginForm, fieldName:string | null) {
        let isValid = true;
        let { loginFormError } = this.state;

        // Email
        if (fieldName == null || fieldName === FieldNameEnum.Email) {
            loginFormError.Email = "";
            if (loginFormData.Email == null || loginFormData.Email.trim() === "") {
                loginFormError.Email = FieldErrorEnum.FieldEmptyError;
                isValid = false;
            }
            else if (!this.validateEmail(loginFormData.Email)) {
                loginFormError.Email = FieldErrorEnum.EmailInValid;
                isValid = false;
            }
        }

        // Password
        if (fieldName == null || fieldName === FieldNameEnum.Password) {
            loginFormError.Password = "";
            if (loginFormData.Password == null || loginFormData.Password.trim() === "") {
                loginFormError.Password = FieldErrorEnum.FieldEmptyError;
                isValid = false;
            }
        }
        this.setState({
            loginFormError: loginFormError
        })
        return isValid;
    }

    validateEmail(email: string) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    handleLogin() {
        let _this = this;
        let { loginFormData } = _this.state;
        this.setState({ isSubmitForm: true });
        if (!_this.validateFormData(loginFormData, null)) {
            return;
        }
        this.setState({ isSubmitForm: false });

        if(loginFormData.Email === "admin@gmail.com" && loginFormData.Password === "admin@123") {
            let token = createJWTFake(loginFormData.Email);
            if(token) {
                localStorage.setItem(LS_TOKEN_KEY, token);
                window.location.href = PageRouterEnum.HomePage;
            }            
        } 
        else {
            _this.setState({
                isLoginFail: true
            })
        }
    }

    createJwtUser() {

    }

    resetForm() {
        this.setState({
            loginFormData: {
                Email: "",
                Password: ""
            },
            loginFormError: {
                Email: "",
                Password: ""
            },
            isShowPwd: false
        })
    }

    hideModal() {
        this.setState({
            isLoginFail: false
        });
        this.resetForm();
    }

    render() {
        let _this = this;
        let { loginFormData, loginFormError, isShowPwd, isLoginFail, isCheckedLogin} = _this.state;
        if(!isCheckedLogin) {
            return <></>
        }
        return(
            <>
            <div className="login-popup">
                <div className="popup__header">
                <div className="display-flex-center"><img src={logoLogin} alt="Login logo" /></div>
                    <p className="header__title">Login to your account</p>
                    
                </div>
                <div className="popup__content">
                    <div className="popup-content__form">
                        <div className="col-12">
                            <label>Email <span className="text-red">*</span></label>
                            <input type="text" name={FieldNameEnum.Email} placeholder="Enter email"
                                className={loginFormError.Email.length > 0 ? "input-err" : ""}
                                value={loginFormData.Email}
                                onChange={this.changeFieldInfo.bind(this, FieldNameEnum.Email)}
                                onBlur={this.changeFieldInfo.bind(this, FieldNameEnum.Email)}
                                onKeyDown={this.onKeyDownFieldInfo.bind(this)}
                            />
                            <span className="text-red">{loginFormError.Email}</span>
                        </div>
                        <div className="col-12">
                            <label>Password <span className="text-red">*</span></label>
                            <input type={isShowPwd ? "text" : "password"} name={FieldNameEnum.Password} placeholder="Enter password"
                                className={loginFormError.Password.length > 0 ? "input-err" : ""}
                                value={loginFormData.Password}
                                onChange={this.changeFieldInfo.bind(this, FieldNameEnum.Password)}
                                onBlur={this.changeFieldInfo.bind(this, FieldNameEnum.Password)}
                                onKeyDown={this.onKeyDownFieldInfo.bind(this)}
                            />
                            <span className="text-red">{loginFormError.Password}</span>
                            <div className={isShowPwd ? "icon-close-pwd": "icon-show-pwd"} onClick={() => { this.setState({ isShowPwd: !isShowPwd }) }}>
                                {
                                    isShowPwd ? <IconEyeCloseSvg/> : <IconEyeOpenSvg />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="popup-content__submit">
                        <div className="btn btn-outline-purple">
                            <a href="/" className="text-purple">Cancel</a>
                        </div>
                        <div className="btn btn-purple" onClick={() => this.handleLogin()}>Login</div>
                    </div>
                </div>
                <div className="popup__footer">
                    <p>Note: Please use this account to login: </p>
                    <p>Email:<b> admin@gmail.com</b><br/>Password: <b> admin@123</b></p>
                </div>
            </div>
                {
                    isLoginFail &&
                    <div className="app-modal" >
                        <div className="modal-container">
                            <div className="modal-body">
                                <div className="modal-close-btn" onClick={() => this.hideModal()}>
                                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.937042 21.1395C0.937042 9.54149 10.3391 0.139465 21.937 0.139465C33.535 0.139465 42.937 9.54149 42.937 21.1395C42.937 32.7374 33.535 42.1395 21.937 42.1395C10.3391 42.1395 0.937042 32.7374 0.937042 21.1395Z" fill="#D8D7DB" />
                                        <path d="M30.311 13.867L28.5587 12.1147L21.6116 19.0618L14.6646 12.1147L12.9122 13.867L19.8593 20.8141L12.9122 27.7611L14.6646 29.5134L21.6116 22.5664L28.5587 29.5134L30.311 27.7611L23.3639 20.8141L30.311 13.867Z" fill="white" />
                                    </svg>

                                </div>
                                <div className='row'>
                                    <div className='col-12 modal-login-text'>
                                        <span>Incorrect email or password</span>
                                    </div>
                                </div>
                                <div className='row text-center'>
                                    <div className='col-12'>
                                        <button className="modal-retry-login-btn" type="button" onClick={() => this.hideModal()}>
                                            Retry
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}