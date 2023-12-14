import CardList from "../../components/card-list/card-list";
import {connect} from 'react-redux';
import './all-cards-page.scss';

const AllCardsPage = ({cards, rememberedCards, liked}) => {

    return (
        <div className="all">
            <h2 className="all__title">
                <span className="all__title-memo">&#10004; {rememberedCards.length} </span>
                of {cards.length}, 
                <span className="all__title-like"> &#9829; {liked.length}</span>
            </h2>
            <CardList/>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        rememberedCards: state.rememberedCards,
        liked: state.liked
    }
}

export default connect(mapStateToProps)(AllCardsPage);