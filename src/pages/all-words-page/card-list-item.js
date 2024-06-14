import './card-list-item.scss';
import {connect} from 'react-redux';
import { setCookie } from '../../services/cookie';
import {  toggleLiked, removeFromRemembered } from "../../actions/action";
import { Component } from 'react';

class CardListItem extends Component {
    
    render () {
        const {card,  liked, rememberedCards, toggleLiked, removeFromRemembered, showEng, showRus } = this.props; 
        const {de, rus, eng, gen, id, pl, pr, pa, th} = card;
   
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
                                    }}>&#9733;</span>
                    <span id='memo' className={isRemebered}
                                    onClick={ async () => {
                                        removeFromRemembered(id);
                                        setCookie('rememberedCards', this.props.rememberedCards);
                                    }}>&#10003;</span>
                </div>
                <div className="card__de">
                    {gen && <span className={gen}>{gen} </span>}
                    {de}
                    <span className='card__item_th'>{th}</span>
                </div>

                {gen && (pl && <div className='hide'>die {pl}</div> || <div className='hide'>Sg.</div>)}
                {pr && <div className='hide'>{pr} / {pa && pa}</div>}
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