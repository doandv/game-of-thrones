import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { characterChangeFilter, characterFetchData } from "../../actions/actionCreators";
import { AppAction } from "../../actions/actionTypes";
import { CharacterFilterModel, CharacterInfoModel, CharacterResponseModel } from "../../model";
import { AppState } from "../../reducers";
import { FaAngleDown, FaAngleUp, FaEye } from 'react-icons/fa'
interface CharacterCompProps {
    characterFilter: CharacterFilterModel,
    characterData: CharacterResponseModel,
    characterFetchData(characterFilter: CharacterFilterModel): void
}
interface CharacterCompState {
    isExtended: boolean,
    keyword: string,
    isShowDetail: boolean,
    itemSelected: CharacterInfoModel | null
}
class CharacterComp extends Component<CharacterCompProps, CharacterCompState> {

    state: CharacterCompState = {
        isExtended: true,
        keyword: "",
        isShowDetail: false,
        itemSelected: null
    }

    componentDidMount() {
        let _this = this;
        let { characterFilter } = _this.props;
        _this.props.characterFetchData(characterFilter);
    }

    changeFieldInfo(e: any) {
        let _this = this;
        if (e != null && e.target != null) {
            let valueField = e.target.value != null ? e.target.value.trim() : "";
            _this.setState({
                keyword: valueField
            });
        }
    }

    onKeyDownFieldInfo(e: any) {
        if (e.keyCode === 13) {
            this.onSearchData();
        }
    }

    onSearchData() {
        let _this = this;
        let { characterFilter } = _this.props;
        let { keyword } = _this.state;
        characterFilter.name = keyword;
        _this.props.characterFetchData(characterFilter);
    }

    hideModal() {
        this.setState({
            isShowDetail: false,
            itemSelected: null
        });
    }

    render() {
        let _this = this;
        let { isExtended, keyword, isShowDetail, itemSelected } = _this.state;
        let { characterData } = _this.props;
        console.log(characterData)
        return (
            <div className='home-section'>
                <div className="home-section__header">
                    <div className="header-title">Resource: Characters</div>
                    {
                        isExtended ?
                            <FaAngleUp className="extended-icon" onClick={() => _this.setState({ isExtended: false })} />
                            : <FaAngleDown className="extended-icon" onClick={() => _this.setState({ isExtended: true })} />
                    }
                </div>
                {
                    isExtended &&
                    <div className="home-section__filter">
                        <button className="filter-btn" onClick={this.onSearchData.bind(this)}>Filter</button>
                        <input className="filter-input" placeholder="Filter name"
                            value={keyword}
                            onChange={this.changeFieldInfo.bind(this)}
                            onKeyDown={this.onKeyDownFieldInfo.bind(this)}
                        />
                    </div>
                }
                <div className="home-section__grid">
                    {
                        isExtended &&
                        <table className='grid__table'>
                            <thead>
                                <tr>
                                    <th style={{ width: "15%" }}>Name</th>
                                    <th style={{ width: "20%" }}>Gender</th>
                                    <th style={{ width: "15%" }}>Culture</th>
                                    <th style={{ width: "15%" }} className="text-align-center">PlayBy</th>
                                    <th style={{ width: "15%" }} className="text-align-center" >Born</th>
                                    <th style={{ width: "15%" }} className="text-align-center">Died</th>

                                    <th style={{ width: "5%" }} className="text-align-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {characterData && characterData.ListCharacterData && characterData.ListCharacterData.length > 0 ?
                                    characterData.ListCharacterData.map((character: CharacterInfoModel, i) =>
                                        <tr key={i}>
                                            <td>{character.name}</td>
                                            <td>{character.gender}</td>
                                            <td>{character.culture}</td>
                                            <td className="text-align-center">{character.playedBy}</td>
                                            <td>{character.born}</td>
                                            <td>{character.died}</td>
                                            <td><FaEye className="view-icon" onClick={() => _this.setState({ isShowDetail: true, itemSelected: character })}/></td>
                                        </tr>)
                                    :
                                    <tr>
                                        <td colSpan={6} style={{ textAlign: "center" }}>No data to display</td>
                                    </tr>}
                            </tbody>
                        </table>
                    }
                </div>

                {
                    isShowDetail &&
                    <div className="home-modal-detail" >
                        <div className="modal-container">
                            <div className="modal-body">
                                <div className="modal-close-btn" onClick={() => this.hideModal()}>
                                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.937042 21.1395C0.937042 9.54149 10.3391 0.139465 21.937 0.139465C33.535 0.139465 42.937 9.54149 42.937 21.1395C42.937 32.7374 33.535 42.1395 21.937 42.1395C10.3391 42.1395 0.937042 32.7374 0.937042 21.1395Z" fill="#D8D7DB" />
                                        <path d="M30.311 13.867L28.5587 12.1147L21.6116 19.0618L14.6646 12.1147L12.9122 13.867L19.8593 20.8141L12.9122 27.7611L14.6646 29.5134L21.6116 22.5664L28.5587 29.5134L30.311 27.7611L23.3639 20.8141L30.311 13.867Z" fill="white" />
                                    </svg>

                                </div>
                                <div className='row'>
                                    <div className='col-12 detail-text'>
                                        <p className="detail-title">Character: {itemSelected?.name}</p>
                                        <p>Gender: <span className="text-bold">{itemSelected?.gender}</span></p>
                                        <p>Culture: <span className="text-bold">{itemSelected?.culture}</span></p>
                                        <p>Born: <span className="text-bold">{itemSelected?.born}</span></p>
                                        <p>Died: <span className="text-bold">{itemSelected?.died}</span></p>
                                        <p>Aliases: <span className="text-bold">{itemSelected?.aliases}</span></p>
                                        <p>Father: <span className="text-bold">{itemSelected?.father}</span></p>
                                        <p>Mother: <span className="text-bold">{itemSelected?.mother}</span></p>
                                        <p>PlayedBy: <span className="text-bold">{itemSelected?.playedBy}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        characterFilter: state.characterReducer.CharacterFilter,
        characterData: state.characterReducer.CharacterData,
    };
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    characterChangeFilter: (filterModel: CharacterFilterModel) => {
        dispatch(characterChangeFilter(filterModel));
    },
    characterFetchData: (filterModel: CharacterFilterModel) => {
        dispatch(characterFetchData(filterModel));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(CharacterComp);