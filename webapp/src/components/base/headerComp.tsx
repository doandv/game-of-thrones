import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { bookChangeFilter, bookFetchData, characterFetchData, houseFetchData } from "../../actions/actionCreators";
import { AppAction } from "../../actions/actionTypes";
import { BookFilterModel, CharacterFilterModel, HouseFilterModel, UserInfoModel } from "../../model";
import { AppState } from "../../reducers";
import logo from '../../assets/images/logo.png';
import avatarDefault from '../../assets/images/avatar-default.png';
import { FaSearch } from 'react-icons/fa'
import { LS_TOKEN_KEY } from "../../constants";
import { PageRouterEnum } from "../../constants/enum";
interface HeaderProps {
    userInfo: UserInfoModel,
    bookFilter: BookFilterModel,
    characterFilter: CharacterFilterModel,
    houseFilter: HouseFilterModel,
    bookFetchData(bookFilter: BookFilterModel): void,
    characterFetchData(characterFilter: CharacterFilterModel): void,
    houseFetchData(houseFilter: HouseFilterModel): void
}
interface HeaderState {
    keyword: string
}
class HeaderComp extends Component<HeaderProps, HeaderState> {

    state:HeaderState = {
        keyword: ""
    }

    changeFieldInfo(e:any) {
        let { keyword } = this.state;
        if (e != null && e.target != null) {
            let valueField = e.target.value != null ? e.target.value.trim() : "";
            this.setState({
                keyword: valueField
            });
        }
    }

    onKeyDownFieldInfo(e:any) {
        if(e.keyCode === 13) {
            this.onSearchData();
        }
    }

    onSearchData() {
        let _this = this;
        let { bookFilter, characterFilter, houseFilter } = _this.props;
        let { keyword } = _this.state;

        bookFilter.name = keyword;
        _this.props.bookFetchData(bookFilter);

        characterFilter.name = keyword;
        _this.props.characterFetchData(characterFilter);

        houseFilter.name = keyword;
        _this.props.houseFetchData(houseFilter);
    }

    onSignOut() {
        localStorage.removeItem(LS_TOKEN_KEY);
        window.location.href = PageRouterEnum.LoginPage;
    }

    render() {
        let _this = this;
        let { userInfo } = _this.props;
        let { keyword } = _this.state;

        return(
            <div className="home-header">
                <div className="header-container">
                    <div className="header-content">
                        <div className="header-logo">
                            <img src={logo} alt="Game of Thrones"/>
                        </div>
                        <div className="header-search">
                            <input className="search-input" name="search-bar" 
                                value={keyword}
                                onChange={this.changeFieldInfo.bind(this)}
                                onKeyDown={this.onKeyDownFieldInfo.bind(this)}
                            />
                            <FaSearch className="search-icon" onClick={this.onSearchData.bind(this)}/>
                        </div>
                        <div className="header-profile">
                            <img src={avatarDefault} alt="Avatar"/>
                            <div style={{ margin: "auto" }}>
                                <p>{userInfo.userName}</p>
                                <a className="signout-link" onClick={this.onSignOut.bind(this)}>SignOut</a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        userInfo: state.authReducer.UserInfo,
        bookFilter: state.bookReducer.BookFilter,
        characterFilter: state.characterReducer.CharacterFilter,
        houseFilter: state.houseReducer.HouseFilter
    };
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    bookFetchData: (filterModel: BookFilterModel) => {
      dispatch(bookFetchData(filterModel));
    },
    characterFetchData: (filterModel: CharacterFilterModel) => {
        dispatch(characterFetchData(filterModel));
    },
    houseFetchData: (filterModel: HouseFilterModel) => {
        dispatch(houseFetchData(filterModel));
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(HeaderComp);