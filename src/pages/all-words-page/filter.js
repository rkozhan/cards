import {connect} from 'react-redux';
import { filterSort, filterLiked, filterRemembered, filterAll, filterSearch } from '../../actions/action';
import { Component } from 'react';

class Filter extends Component {    
    
    onSearch = () => {
        const searchPanel = document.querySelector(".all__filter");
        const input = document.querySelector("#search-input");
        
        if (searchPanel.classList.contains("active")) {
            searchPanel.classList.remove("active");
        } else {
            searchPanel.classList.add("active");
            input.focus();
        }
    }


    render() {
        const {cards, rememberedCards, liked,
                filterSort, filterLiked, filterRemembered, filterAll, filterSearch, filter} = this.props;
        return (
            <div className="all__filter">                
                <button id="btn-del"
                        className={this.props.filter.term ? "active" : ""}
                        onClick={() => {
                            document.querySelector("#search-input").value = '';
                            filterSearch('');
                        }}
                        >&#10060;</button>
                <button id="btn-search"
                        onClick={() => this.onSearch()}
                        className={this.props.filter.term ? "active" : ""}
                        >&#128269; </button>
                <input id="search-input" autoComplete='off'
                        type='text'
                        onChange={(e) => filterSearch(e.target.value)}
                        ></input>
                <button id="btn-sort"
                        className={filter.sort ? 'active' : ''}
                        onClick={() => filterSort()}
                        >&#8595; abc </button>
                <button id="btn-memo"
                        className={filter.remembered ? "active" : ""}
                        onClick={() => filterRemembered()}
                        >&#10003; {rememberedCards.length} </button>
                <button id="btn-like"
                        className={this.props.filter.liked ? "active" : ""}
                        onClick={() => filterLiked()}
                        > &#9733; {liked.length}</button>
                <button id="btn-all"
                        className={(!filter.remembered && !filter.liked && !filter.term)  ? "active" : ""}
                        onClick={() => filterAll()}
                        >{cards.length} </button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        rememberedCards: state.rememberedCards,
        liked: state.liked,
        filter: state.filter,
    }
}

const mapDispatchToProps = {
    filterSort,
    filterLiked,
    filterRemembered,
    filterAll,
    filterSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter);