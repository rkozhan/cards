import { Component } from "react";
import CardListItem from "../card-list-item/card-list-item";
import {connect} from 'react-redux';
import { toggleLiked, toggleRemembered } from "../../actions/action";
import { setCookie } from "../../services/cookie";
import Spinner from './../spinner/spinner';
import Error from './../error/error';

class CardList extends Component {

    toogleActive = (e) => {
        if (e.target && (e.target.classList.contains('card__item') || e.target.closest('.card__item'))) {
            const parent = e.target.closest('.card__item'),
                all = document.querySelectorAll('.card__item');
            
            if (parent.classList.contains('active')) {
                if (e.target.id !== 'like' && e.target.id !== 'memo') {
                    parent.classList.remove('active');
                }
            } else {
                all.forEach(el => el.classList.remove('active'));
                parent.classList.add('active');
            }
        }          
    }

    render () {
        const {cards, loading, error} = this.props;

        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        return (
            <ul className="cards-list" onClick={(e) => this.toogleActive(e)}>
                {
                    cards.map(card => {
                        return <CardListItem
                            key={card.id}
                            card={card}
                        />
                    })
                }
            </ul>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        loading: state.loading,
        error: state.error,
        liked: state.liked,
        rememberedCards: state.rememberedCards
    }
}

const mapDispatchToProps = {
    toggleLiked,
    toggleRemembered
}
export default connect(mapStateToProps, mapDispatchToProps)(CardList);