import {connect} from 'react-redux';
import './current-card.scss';

const CurrentCard = ({showedCurrentCard, liked, rememberedCards, showEng, showRus}) => {
    const {de, rus, eng, gen, id, pl, pr, pa, th} = showedCurrentCard;

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
            /*const activeEl = parent.querySelector('.active');
            activeEl.nextElementSibling ?
                activeEl.nextElementSibling.classList.add('active') :
                parent.firstChild.classList.add('active');
            activeEl.classList.remove('active');
            */
           parent.classList.toggle('rotate');
        }
    }    

    return (
        <div key={id} className="current-card slideIn" >
            <div className='current-card__status'>
                <span className={`сurrent-card__status_liked ${isLike}`}>&#9733;</span>
                <span className={`сurrent-card__status_rem ${isRemebered}`}>&#10003;</span>
            </div>
            <div className='current-card__item' onClick={(e) => rotateCard(e)} >
                <div className="current-card__de active">
                    <div>{de}</div>
                </div>

                <div className="current-card__info">
                    <div>
                        {gen && <span className={gen}>{gen} </span>}
                        {de}<span className='current-card__th'>{th}</span></div>
                    {gen && (pl && <div>die {pl}</div> || <div>Sg.</div>)}
                    {pr && <div>{pr} / {pa && pa}</div>}
                    {showEng && <div className="current-card__eng">en: <span>{eng}</span></div>}
                    {showRus && <div className="current-card__rus">ru: <span>{rus}</span></div>}
                </div>

{/*                 {showEng && <div className="current-card__eng">
                    <div>{eng}</div>
                </div>}

                {showRus && <div className="current-card__rus">
                    <div>{rus}</div>
                </div>} */}

            </div>
        </div>
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