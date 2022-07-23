import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { authSetUserInfo } from "../actions/actionCreators";
import { AppAction } from "../actions/actionTypes";
import { UserInfoModel } from "../model";
import { AppState } from "../reducers";
import { getAccessToken, getUserInfo } from "../commons/jwtToken";
import HeaderComp from "../components/base/headerComp";
import BookComp from "../components/home/bookComp";
import CharacterComp from "../components/home/characterComp";
import { PageRouterEnum } from "../constants/enum";
import '../assets/css/home.css';
import HouseComp from "../components/home/houseComp";

interface HomeProps {
    authSetUserInfo(userInfo: UserInfoModel): void;
}
class HomeComp extends Component<HomeProps, {}> {

    componentDidMount() {
        let accessToken = getAccessToken();
        if(accessToken) {
            let userInfo = getUserInfo(accessToken);
            this.props.authSetUserInfo(userInfo);
        }
        else {
            window.location.href = PageRouterEnum.LoginPage;
        }
    }

    render() {
        return(
            <div className="home-page">
                <header>
                    <HeaderComp/>
                </header>
                <section className="home-container">
                    <BookComp />
                    <CharacterComp />
                    <HouseComp />
                </section>
                <footer className="home-footer">
                    
                </footer>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    authSetUserInfo: (userInfo: UserInfoModel) => {
        dispatch(authSetUserInfo(userInfo));
    }
});
export default connect(null,mapDispatchToProps)(HomeComp);