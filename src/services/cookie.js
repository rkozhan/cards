
//const names = {          //                                state    ==>  cookies          ==>  state
//  currentCards: 'currentCards',           // []            [{},{}]       '1,2,3' string        [{},{}]  
//  rememberedCards: 'rememberedCards',     // []            [id,id]       '1,2,3' string        [1,2,3]
//  liked: 'liked',                         // []            [id,id]       '1,2,3' string        [1,2,3]

//  currentCardsNum: 'currentCardsNum',     //10             num           '10'    string        num 
//}

const getCookie = (cname) => {
  const value = "; " + document.cookie;
  const parts = value.split("; " + cname + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

//mapObjTo('currentCards', this.props.currentCards.map(card => card.id))
/////////////////////////////////
const cookieToBoolean = (cname) => {
  const cookie = getCookie(cname);
  if (cookie) {
    return cookie === 'true' ? true : false;
  }
  return undefined;  
}

const cookieToArr = (cname) => {
  const cookie = getCookie(cname);
  if (cookie !== undefined && cookie !== '') {
    return Array.from(cookie.split(',')).map(item => Number(item))
  } else {
    return [];
  }
}

const cookieToNum = (cname) => {
  const cookie = getCookie(cname);
  if (cookie !== undefined && cookie !== '') {
    return Number(cookie);
  } else {
    return undefined;
  }
}

const mapCookieIdsToCards = (arr, dataBase) => {
    const cardsFromId = dataBase.filter(el => arr.includes(el.id)); //this ordered id from 0 to max
    return cardsFromId;
}


const getAllCookies = () => {
  return {
    currentCards: cookieToArr('currentCards'),    //[id] -> map to [{}]
    rememberedCards: cookieToArr('rememberedCards'),
    liked: cookieToArr('liked'),
    currentCardsNum: cookieToNum('currentCardsNum'),
    showRus:  cookieToBoolean('showRus'),
    showEng:  cookieToBoolean('showEng')

  }
}

const delCookie = (cname) => {
  document.cookie = `${cname}=; path=/; expires=-1`;
}

const setCookie = (cname, cvalue, exdays = 100) => {
  console.log(`SET COOKIE ${cvalue}`);
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


/*
const get2Cookie = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
              c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const getCookie = (name) => {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
*/
export {
    getAllCookies,
    getCookie,
    //get1Cookie,
    //get2Cookie,
    setCookie,
    mapCookieIdsToCards,
    delCookie
};
