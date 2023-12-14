import {connect} from 'react-redux';
import './current-card.scss';

const CurrentCard = ({showedCurrentCard, liked, rememberedCards, showEng, showRus}) => {
    const {de, rus, eng, sex, id} = showedCurrentCard;

    setTimeout(() => {const thisCard = document.querySelector('.current-card');
                if (thisCard) thisCard.classList.remove('slideIn') }, '0s');
   
    let isLike = '';
    let isRemebered = '';
    if (id !== undefined) {
        isLike = liked.includes(id) ? 'like' : '';
        isRemebered = rememberedCards.includes(id) ? 'memo' : '';
    }

    function rotateCard(e) {
        const parent = document.querySelector('.current-card__item');
        if (parent && e.currentTarget === parent) {
            const activeEl = parent.querySelector('.active');
            activeEl.nextElementSibling ?
                activeEl.nextElementSibling.classList.add('active') :
                parent.firstChild.classList.add('active');
            activeEl.classList.remove('active');
        }
    }    

    return (
        <li key={id} className="current-card slideIn" >
            <div className='current-card__status'>
                <span className={`сurrent-card__status_liked ${isLike}`}>&#9829;</span>
                <span className={`сurrent-card__status_rem ${isRemebered}`}>&#10004;</span>
            </div>
            <div className='current-card__item' onClick={(e) => rotateCard(e)} >
                <div className="current-card__de active">
                    <div>
                        {sex && <span className={sex}>{sex} </span>}
                        {de}</div>
                    </div>
                {showEng && <div className="current-card__eng">
                    <div>{eng}</div>
                </div>}
                {showRus && <div className="current-card__eng">
                    <div>{rus}</div>
                </div>}
                <div className="current-card__info">
                    <div>infocard</div>
                </div>
            </div>
        </li>
    )
}

const mapStateToProps = (state) => {
    return {
        showedCurrentCard: state.showedCurrentCard,
        liked: state.liked,
        rememberedCards: state.rememberedCards,
        showEng: state.showEng,
        showRus: state.showRus
    }
}

export default connect(mapStateToProps)(CurrentCard);