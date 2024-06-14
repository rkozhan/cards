import { Component } from "react";
import CardListItem from "./card-list-item";
import {connect} from 'react-redux';
import { toggleLiked, toggleRemembered } from "../../actions/action";
import AddWord from "./add-word";
import Spinner from '../../components/spinner/spinner';
import Error from '../../components/error/error';

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

    filterCards = (cards, filter, liked, rememberedCards) => {
        let filteredCards = cards.slice();
        if (filter.sort) {
            filteredCards.sort((a, b) => a.de.localeCompare(b.de));
        }
        if (filter.liked) {
            filteredCards = filteredCards.filter(card => liked.includes(card.id));
        };
        if (filter.remembered) {
            filteredCards = filteredCards.filter(card => rememberedCards.includes(card.id));
        };
        if (filter.term.length > 0) {
            filteredCards = filteredCards.filter((card) => {
                if ((card.rus && card.rus.toLowerCase().indexOf(filter.term.toLowerCase()) > -1) ||
                (card.eng && card.eng.toLowerCase().indexOf(filter.term.toLowerCase()) > -1) ||
                (card.de && card.de.toLowerCase().indexOf(filter.term.toLowerCase()) > -1)) return card;
            });
        }                  
        if (!filteredCards.length) {
            document.querySelector('.add-word').style = "display:block;";
            document.querySelector('.add-word__word').textContent = filter.term;
        } else if (document.querySelector('.add-word')) {
            document.querySelector('.add-word').style = "";
            //document.querySelector('.add-word__form').classList.remove('visible');
        }
        return filteredCards;
    }


    render () {
        const {cards, loading, error, liked, rememberedCards} = this.props;
     
        if (loading) {
            return <Spinner/>
        }
        if (error) {
            return <Error/>
        }

        return (
            <>
                <AddWord/>
                <ul className="cards-list" onClick={(e) => this.toogleActive(e)}>
                {  
                    this.filterCards(cards, this.props.filter, liked, rememberedCards).map(card => {
                        return <CardListItem
                            key={card.id}
                            card={card}
                        />
                    })
                }
                </ul>
            </>

        )
    }
};

const mapStateToProps = (state) => {
    return {
        cards: state.cards,
        loading: state.loading,
        error: state.error,
        liked: state.liked,
        rememberedCards: state.rememberedCards,
        filter: state.filter
    }
}

const mapDispatchToProps = {
    toggleLiked,
    toggleRemembered
}
export default connect(mapStateToProps, mapDispatchToProps)(CardList);