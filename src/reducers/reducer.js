import filter from "../pages/all-words-page/filter";

const initialState = {
    cards: [],//--[{},{}]
    cardsLenght: 0,
    error: false,
    loading: true,
    formStatus: '',
    //////////////////////////////////////////////////////// this to / from cookies
    currentCards: [],//--[{},{}]
    rememberedCards: [],//--[id,id]
    liked: [],//--[id,id]
    ////////////////////////////////////////////////////////////////////////
    showedCurrentCard:  {de: `Hallo!`,
        eng: `Hi!`,
        rus: `Привет!`
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
    showTheme: [],
    themes: [],
    ////////////////////////////--filter
    filter: {
        liked: false,
        remembered: false,
        sort: false,
        term: ''
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CARDS_LOADED':
            return {
                ...state,
                cards: [
                    ...state.cards,
                    ...action.payload
                ],
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
        case 'FORM_STATUS':
            return {
                ...state,
                formStatus: action.payload
            };


        case 'COOKIES_TO_STATE':
            console.log('REDUCER COOKIES_TO_STATE');
            const {rememberedCards, liked, currentCardsNum, showRus, showEng, showTheme} = action.payload;
            return currentCardsNum ? {
                ...state,
                currentCardsNum: currentCardsNum,
                liked: liked,
                rememberedCards: rememberedCards,
                showRus: showRus,
                showEng: showEng,
                showTheme: showTheme
            } : {
                ...state,
                liked: liked,
                rememberedCards: rememberedCards,
                showRus: showRus,
                showEng: showEng,
                showTheme: showTheme
            };

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
        case 'SET_THEME':
            const theme = action.payload;
            const th = state.showTheme.findIndex(item => item === theme);
            if (th === -1) {              
                return {
                    ...state,
                    showTheme: [
                        ...state.showTheme,
                        theme
                    ]
                }                
            }
            else {
                return {
                    ...state,
                    showTheme: [
                        ...state.showTheme.slice(0, th),
                        ...state.showTheme.slice(th + 1)
                    ]
                };
                
            };
        case 'ADD_THEME':
            const thX = state.themes.findIndex(item => item === action.payload);
            if (thX === -1) {              
                return {
                    ...state,
                    themes: [
                        ...state.themes,
                        action.payload
                    ]
                }                
            }
            else {
                return {
                    ...state,                    
                };                
            };
        case 'ADD_LENGHT':
            return {
                ...state,
                cardsLenght: action.payload

            };                
        case 'FILTER_SORT':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    sort: !state.filter.sort
                }
            };
        case 'FILTER_LIKED':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    remembered: false,
                    term: '',
                    liked: !state.filter.liked
                }
            };
        case 'FILTER_REMEMBERED':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    term: '',
                    liked: false,
                    remembered: !state.filter.remembered
                }
            };
        case 'FILTER_ALL':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    term: '',
                    liked: false,
                    remembered: false
                }
            };
        case 'FILTER_SEARCH':
            return {
                ...state,
                filter: {
                    ...state.filter,
                    liked: false,                    
                    remembered: false,
                    term: action.payload
                }
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