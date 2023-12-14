import './card-list-item.scss';
import {connect} from 'react-redux';
import { setCookie } from '../../services/cookie';
import {  toggleLiked, removeFromRemembered } from "../../actions/action";
import { Component } from 'react';


class CardListItem extends Component {
    
    render () {
        const {card,  liked, rememberedCards, toggleLiked, removeFromRemembered, showEng, showRus } = this.props; 
        const {de, rus, eng, sex, id} = card;
   
        let isLike = '';
        let isRemebered = '';
        if (id !== undefined) {
            isLike = liked.includes(id) ? 'active' : '';
            isRemebered = rememberedCards.includes(id) ? 'active' : '';
        }
    
        return (
            <li className="card__item" data-id={id} >
                <div className='card__item_status'>
                    <span id='like' className={isLike}
                                    onClick={ async () => {
                                        await toggleLiked(id);
                                        setCookie('liked', this.props.liked);
                                    }}>&#9829;</span>
                    <span id='memo' className={isRemebered}
                                    onClick={ async () => {
                                        removeFromRemembered(id);
                                        setCookie('rememberedCards', this.props.rememberedCards);
                                    }}>&#10004;</span>
                </div>
                <div className="card__de">{sex && <span className={sex}>{sex} </span>}{de}</div>
                {showRus && <div className="card__rus">{rus}</div>}
                {showEng && <div className="card__eng">{eng}</div>}
            </li>
        )
    }   
};

const mapStateToProps = (state) => {
    return {
        liked: state.liked,
        rememberedCards: state.rememberedCards,
        showEng: state.showEng,
        showRus: state.showRus
    }
};

const mapDispatchToProps = {
    toggleLiked,
    removeFromRemembered,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardListItem);