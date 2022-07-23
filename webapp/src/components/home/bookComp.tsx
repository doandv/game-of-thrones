import { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { bookChangeFilter, bookFetchData } from "../../actions/actionCreators";
import { AppAction } from "../../actions/actionTypes";
import { BookFilterModel, BookInfoModel, BookResponseModel } from "../../model";
import { AppState } from "../../reducers";
import { FaAngleDown, FaAngleUp, FaEye } from 'react-icons/fa'
import moment from "moment";
interface BookCompProps {
    bookFilter: BookFilterModel,
    bookData: BookResponseModel,
    bookFetchData(bookFilter: BookFilterModel): void
}
interface BookCompState {
    isExtended: boolean
    keyword: string,
    isShowDetail: boolean,
    itemSelected: BookInfoModel | null
}
class BookComp extends Component<BookCompProps, BookCompState> {

    state: BookCompState = {
        isExtended: true,
        keyword: "",
        isShowDetail: false,
        itemSelected: null
    }

    componentDidMount() {
        let _this = this;
        let { bookFilter } = _this.props;
        _this.props.bookFetchData(bookFilter);
    }

    changeFieldInfo(e:any) {
        let _this = this;
        if (e != null && e.target != null) {
            let valueField = e.target.value != null ? e.target.value.trim() : "";
            _this.setState({
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
        let { bookFilter } = _this.props;
        let { keyword } = _this.state;
        bookFilter.name = keyword;
        _this.props.bookFetchData(bookFilter);
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
        let { bookData } = _this.props;

        return(
            <div className='home-section'>
                <div className="home-section__header">
                    <div className="header-title">Resource: Books</div>
                    {
                        isExtended ?
                        <FaAngleUp className="extended-icon" onClick={() => _this.setState({ isExtended: false})}/>
                        : <FaAngleDown className="extended-icon" onClick={() => _this.setState({ isExtended: true})}/>
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
                                <th style={{ width: "20%" }}>Authors</th>
                                <th style={{ width: "15%" }}>Publisher</th>
                                <th style={{ width: "15%" }} className="text-align-center" >MediaType</th>
                                <th style={{ width: "15%" }} className="text-align-center">Number Of Pages</th>
                                <th style={{ width: "15%" }} className="text-align-center">Country</th>
                                <th style={{ width: "5%" }} className="text-align-center"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {   bookData && bookData.ListBookData && bookData.ListBookData.length > 0 ?
                                        bookData.ListBookData.map((book: BookInfoModel, i) =>
                                            <tr key={i}>
                                                <td>{book.name}</td>
                                                <td>{book.authors && book.authors.join(",")}</td>
                                                <td>{book.publisher}</td>
                                                <td className="text-align-center">{book.mediaType}</td>
                                                <td className="text-align-center">{book.numberOfPages}</td>
                                                <td className="text-align-center">{book.country}</td>
                                                <td><FaEye className="view-icon" onClick={() => _this.setState({ isShowDetail: true, itemSelected: book })}/></td>
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
                                        <p className="detail-title">Book: {itemSelected?.name}</p>
                                        <p>Authors: <span className="text-bold">{itemSelected?.authors}</span></p>
                                        <p>Publisher: <span className="text-bold">{itemSelected?.publisher}</span></p>
                                        <p>MediaType: <span className="text-bold">{itemSelected?.mediaType}</span></p>
                                        <p>NumberOfPages: <span className="text-bold">{itemSelected?.numberOfPages}</span></p>
                                        <p>Country: <span className="text-bold">{itemSelected?.country}</span></p>
                                        <p>Released:&nbsp;
                                            <span className="text-bold">
                                                {itemSelected?.released ? moment(itemSelected?.released).format('MM/DD/YYYY') : ""}
                                            </span>
                                        </p>
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
        bookFilter: state.bookReducer.BookFilter,
        bookData: state.bookReducer.BookData
    };
};
const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    bookChangeFilter: (filterModel: BookFilterModel) => {
      dispatch(bookChangeFilter(filterModel));
    },
    bookFetchData: (filterModel: BookFilterModel) => {
      dispatch(bookFetchData(filterModel));
    }
});
export default connect(mapStateToProps,mapDispatchToProps)(BookComp);