import { Component } from "react";
import { connect } from "react-redux";

import './start-page.scss';
import CurrentCard from "./current-card";
import { deleteCurrentCard, changeShowedCurrentCard, toggleRemembered, toggleLiked} from "../../actions/action";
import { setCookie } from "../../services/cookie";

class StartPage extends Component{

    getNextCard = (currentCards, curId) => {
        if (currentCards.length) {
            if (curId === undefined) {
                return currentCards[0];
            } else {
                let idx = currentCards.findIndex(item => item.id === curId);
                if (idx >= currentCards.length - 1 || idx === -1) {
                    return currentCards[0];
                }
                return currentCards[idx + 1];
            }
        }
    }

    getPrevCard = (currentCards, curId) => {
        if (currentCards.length) {
            if (curId === undefined) {
                return currentCards[0];
            } else {
                let idx = currentCards.findIndex(item => item.id === curId);
                if (idx <= 0) {
                    return currentCards[currentCards.length - 1];
                }
                return currentCards[idx - 1];
            }
        }
    }

    render() {
        const {currentCards, showedCurrentCard, changeShowedCurrentCard, deleteCurrentCard, toggleRemembered, toggleLiked} = this.props;
        //console.log(`sp rnd: cur ${this.props.currentCards.length}`);
        return (
            <div className="start-page">
                <h2>Cards<span></span></h2>
                <CurrentCard/>
                <div className="start-page__btns">
                    <button onClick={() => changeShowedCurrentCard(this.getPrevCard(currentCards, showedCurrentCard.id))}>&#9664;</button>
                    <button onClick={ async () => {
                            await toggleLiked(showedCurrentCard.id);
                            setCookie('liked', this.props.liked);
                            }}>&#9733;</button> 
                    <button onClick={ async () => {
                        if(showedCurrentCard.id !== undefined) {
                            deleteCurrentCard(showedCurrentCard);
                            await toggleRemembered(showedCurrentCard.id);
                            setCookie('rememberedCards', this.props.rememberedCards)
                            console.log(`toRemembered: cur ${this.props.currentCards.length}`);
                        }
                    }}>&#10003;</button>
                    <button onClick={() => {
                                changeShowedCurrentCard(this.getNextCard(currentCards, showedCurrentCard.id))}
                            }>&#9654;</button>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        liked: state.liked,
        currentCards: state.currentCards,
        showedCurrentCard: state.showedCurrentCard,
        rememberedCards: state.rememberedCards
    }
}

const mapDispatchToProps = {
    deleteCurrentCard,
    changeShowedCurrentCard,
    toggleRemembered,
    toggleLiked
}

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
