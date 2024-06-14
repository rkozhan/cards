const cardsLoaded = (newCards) => {
    return {
        type: 'CARDS_LOADED',
        payload: newCards
    };
};

const cardsRequested = () => {
    return {
        type: 'CARDS_REQUESTED'
    };
};

const cardsError = () => {
    return {
        type: 'CARDS_ERROR'
    };
};

const cookiesToState = (cookies) => {
    console.log(`ACTION COOKIES_TO_STATE ${cookies.currentCardsNum}`);
    return {
        type: 'COOKIES_TO_STATE',
        payload: cookies
    };
};

const changeFormStatus = (status) => { /////////////////////////////////
    return {
        type: 'FORM_STATUS',
        payload: status
    };
};

const selectedWord = (id) => { /////////////////////////////////
    return {
        type: 'WORD_SELECTED',
        payload: id
    };
};

const addCurrentCards = (newCards) => {
    return {
        type: 'ADD_CURRENT_CARDS',
        payload: newCards
    };
};
//const deleteCurrentCard = (id) => {
const deleteCurrentCard = (el) => {
    return {
        type: 'DELETE_CURRENT_CARD',
        //payload: id
        payload: el
    };
};
const toggleRemembered = (id) => {
    return {
        type: 'TOGGLE_REMEMBERED',
        payload: id
    };
};
const removeFromRemembered = (id) => {
    return {
        type: 'REMOVE_FROM_REMEMBERED',
        payload: id
    };
}
const deleteAllRemembered = () => {
    return {
        type: 'DELETE_ALL_REMEMBERED',
    };
};
const toggleLiked = (id) => {
    return {
        type: 'TOGGLE_LIKED',
        payload: id
    };
};
const deleteAllLiked = () => {
    return {
        type: 'DELETE_ALL_LIKED',
    };
};

const changeShowedCurrentCard = (nextShowed = {de:'Gratuliere!!!! Du hast alles als bemerktes markiert!'}) => {
    console.log('changeShowedCurrentCard');
    return {
        type: 'CHANGE_SHOWED_CURRENT_CARD',
        payload: nextShowed
    }
}

const setEng = () => {
    return {
        type: 'SET_ENG'
    };
};
const setRus = () => {
    return {
        type: 'SET_RUS'
    };
};
const setTheme = (theme) => {
    return {
        type: 'SET_THEME',
        payload: theme
    };
}
const addThemesToState = (theme) => {
    return {
        type: 'ADD_THEME',
        payload: theme
    };
}
const addLenghtToState = (lenght) => {
    return {
        type: 'ADD_LENGHT',
        payload: lenght
    };
}
const setNum = (num) => {
    return {
        type: 'SET_NUM',
        payload: num
    };
};
const filterSort = () => {
    return {
        type: 'FILTER_SORT'
    };
};
const filterLiked = () => {
    return {
        type: 'FILTER_LIKED'
    };
};
const filterRemembered = () => {
    return {
        type: 'FILTER_REMEMBERED'
    };
};
const filterAll = () => {
    return {
        type: 'FILTER_ALL'
    };
};
const filterSearch = (value) => {
    return {
        type: 'FILTER_SEARCH',
        payload: value
    };
};

/*
const addedToCart = (id) => {
    return {
        type: 'ITEM_ADD_TO_CART',
        payload: id
    };
};

const deleteFromCart = (id) => {
    return {
        type: 'ITEM_REMOVE_FROM_CART',
        payload: id
    };
};
*/
export {
    cardsLoaded,
    cardsRequested,
    cardsError,
    
    changeFormStatus,

    cookiesToState,

    selectedWord,
    
    addCurrentCards,
    deleteCurrentCard,
    changeShowedCurrentCard,

    toggleRemembered,
    removeFromRemembered,
    deleteAllRemembered,
    toggleLiked,
    deleteAllLiked,

    setEng,
    setRus,
    setTheme,
    addThemesToState,
    addLenghtToState,
    setNum,

    filterSort,
    filterLiked,
    filterRemembered,
    filterAll,
    filterSearch
};