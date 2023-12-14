const initialState = {
    cards: [],//--[{},{}]
    error: false,
    loading: true,
    //////////////////////////////////////////////////////// this to / from cookies
    currentCards: [],//--[{},{}]
    rememberedCards: [],//--[id,id]
    liked: [],//--[id,id]
    ////////////////////////////////////////////////////////////////////////
    showedCurrentCard:  {de: `Willkommen hier! Tipp auf die Kartchen, um sie umzudrehen, verwende die Pfeile, merk die Wörter zu, und füg sie zu deinen Favoriten hinzu. Viel Erfolg!`,
        eng: `Welcome here! Tap on the card to flip it, use the arrows, memorize the words, and add them to your favorites. Good luck!`,
        rus: `Добро пожаловать! Тапни по карточке для переворота, используйте стрелки, запоминайте слова и добавляйте их в избранное. Успехов!`
    },
    //////////////////////////////////////////////////////////////////////////
    selectedWordId: 777, //// ????????????????????????????????????????????????????????????
    ///////////////////////////////////////// settings to / from cookies
    currentCardsNum: 10,
    /////////////////////////////--settings
    //anotherDBSourse: '',
    //Darkmode: false,
    showEng: true,
    showRus: true,
    //resetRemembered: false,
    //resetLiked: false,
    ////////////////////////////--filter

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CARDS_LOADED':
            return {
                ...state,
                cards: action.payload,
                loading: false,
            };
            
        case 'CARDS_REQUESTED':
            console.log('REDUCER_REQUESTED');
            return {
                ...state,
                cards: state.cards,
                loading: true,
            };
        case 'CARDS_ERROR':
            return {
                ...state,
                loading: false,
                error: true
            };


        case 'COOKIES_TO_STATE':
            console.log('REDUCER COOKIES_TO_STATE');
            const {rememberedCards, liked, currentCardsNum, showRus, showEng} = action.payload;
            return currentCardsNum ? {
                ...state,
                currentCardsNum: currentCardsNum,
                liked: liked,
                rememberedCards: rememberedCards,
                showRus: showRus,
                showEng: showEng
            } : {
                ...state,
                liked: liked,
                rememberedCards: rememberedCards,
                showRus: showRus,
                showEng: showEng
            };
/*
        case 'COOKIES_TO_STATE':
            //const {rememberedCards, liked, currentCardsNum} = action.payload;
            console.log('REDUCER COOKIES_TO_STATE');
            return {
                ...state,
                //rememberedCards: action.payload.rememberedCards,
                //liked: action.payload.liked,
                //currentCardsNum: action.payload.currentCardsNum
                currentCardsNum: action.payload
            };
*/
        case 'WORD_SELECTED':
            console.log(`REDUCER SELECTED WORD ${action.payload}`);
            return {
                ...state,
                selectedWordId: action.payload

            };
        case 'CHANGE_SHOWED_CURRENT_CARD':
            return {
                ...state,
                showedCurrentCard: action.payload
            };
        case 'ADD_CURRENT_CARDS':
            console.log('REDUCER ADD_CURRENT_CARDS');
            return {
                ...state,
                currentCards: action.payload
            };
        case 'DELETE_CURRENT_CARD':
            const curIndex = state.currentCards.findIndex(item => item.id === action.payload.id);
            if (curIndex === -1) {
                return {
                    ...state,
                    currentCards: [
                        ...state.currentCards,
                        action.payload
                    ]
                };
            } else {
                return {
                    ...state,
                    currentCards: [
                        ...state.currentCards.slice(0, curIndex),
                        ...state.currentCards.slice(curIndex + 1)
                    ]
                };
            }            
                
        case 'TOGGLE_REMEMBERED':
            const idx = state.rememberedCards.findIndex(item => item === action.payload);
            if (idx === -1) {
                return {
                    ...state,
                    rememberedCards: [
                        ...state.rememberedCards,
                        action.payload
                    ]
                };
            } else {
                return {
                    ...state,
                    rememberedCards: [
                        ...state.rememberedCards.slice(0, idx),
                        ...state.rememberedCards.slice(idx + 1)
                    ]
                }; 
            };
        case 'REMOVE_FROM_REMEMBERED':
            const idr = state.rememberedCards.findIndex(item => item === action.payload);
            if (idr === -1) {
                return {
                    ...state,
                    rememberedCards: state.rememberedCards
                }
            } else {
                return {
                    ...state,
                    rememberedCards: [
                        ...state.rememberedCards.slice(0, idr),
                        ...state.rememberedCards.slice(idr + 1)
                    ]
                };                     
            };
        case 'DELETE_ALL_REMEMBERED':
            return {
                ...state,
                rememberedCards: []
            };    
        case 'TOGGLE_LIKED':
            const lkd = state.liked.findIndex(item => item === action.payload);
            console.log(`REDUCER ${action.payload} findIndex:${lkd}`);
            if (lkd === -1) {
                return {
                    ...state,
                    liked: [
                        ...state.liked,
                        action.payload
                    ]
                };
            } else {
                return {
                    ...state,
                    liked: [
                        ...state.liked.slice(0, lkd),
                        ...state.liked.slice(lkd + 1)
                    ]
                }; 
            };
        case 'DELETE_ALL_LIKED':
            return {
                ...state,
                liked: []
                };
        case 'SET_ENG':
            return {
                ...state,
                showEng: !state.showEng
                };
        case 'SET_RUS':
            return {
                ...state,
                showRus: !state.showRus
                };
        case 'SET_NUM':
            return {
                ...state,
                currentCardsNum: action.payload
                };

            /*
        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ]
            };
        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return {
                ...state,
                items: [
                    ...state.items.slice(0, itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]
            }
            */
        default:
            return state;
    }
}

export default reducer;