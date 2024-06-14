import CardList from './card-list';
import {connect} from 'react-redux';
import Filter from './filter';
import './all-words-page.scss';

const AllWordsPage = ({cards, rememberedCards, liked, filter}) => {

    return (
        <div className="all">
            <div className='all__container'>
                <Filter/>
            </div>
            <CardList/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        rememberedCards: state.rememberedCards,
        liked: state.liked,
        filter: state.filter
    }
}

export default connect(mapStateToProps)(AllWordsPage);