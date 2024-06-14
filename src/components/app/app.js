import { Component } from 'react';
import {Route, Routes} from  'react-router-dom';
import './app.scss';
import LockOrientation from '../../services/lock-orientation';

import AppHeader from './../app-header/app-header';
import StartPage from '../../pages/start-page/start-page';
import AllWordsPage from '../../pages/all-words-page/all-words-page';
import SettingsPage from '../../pages/settings-page/settings-page';

import {connect} from 'react-redux';
import WithCardService from '../../services/with-card-service';
import { cardsLoaded, cardsRequested, cardsError, addCurrentCards, cookiesToState, addThemesToState, addLenghtToState } from "../../actions/action";

import { getAllCookies, delCookie, setCookie, mapCookieIdsToCards, getCookie} from '../../services/cookie';

LockOrientation();
class App extends Component {
    
    //xyz = setCookie('currentCardsNum', 6);
    //bar = delCookie('showTheme');

    allCookies = getAllCookies();
    toState = this.props.cookiesToState(this.allCookies);
    some = console.log(this.allCookies);
    /////////////////////////////////////////////////////// TO CONSOLE.LOG/////////
    i = 1;
    toConsole = (name, props) => {
        const {currentCards, allCards} = props;
        console.log(`${this.i++}-app ${name}: curCards num:${currentCards.length} / IDs:[${currentCards.map(el => el.id)}] /// all: ${allCards.length}`);
    }
    foo = this.toConsole('CREATED', this.props);
    ////////////////////////////////////////////////////////////////////////////////
   
    componentDidMount() {
        this.props.cardsRequested();
        this.props.CardService.getCards()
            .then(res => {
                res.forEach(card => {
                    if (card.th) this.props.addThemesToState(card.th);               
                });
                if (res.length) this.props.addLenghtToState(res.length);
                return res;
                }
            )
            .then(res => res = res.filter(item => {
                return !this.props.showTheme.includes(item.th);
            }))
            .then(res => this.props.cardsLoaded(res))
            // НЕ ТРОГАТЬ
            .then(res => {
                if (this.allCookies.currentCards.length) {
                    this.props.addCurrentCards(mapCookieIdsToCards(this.allCookies.currentCards, res.payload));  
                    console.log(mapCookieIdsToCards(this.allCookies.liked, res.payload)); /////////////
                } 
            })
            // --------------
            .catch(error => this.props.cardsError());
        this.toConsole('DID_MOUNT', this.props);/////////////////////////////////////////////////////////////////
    }

    componentDidUpdate(prevProps) {
        
        const newCurrentCards = this.props.CardService.randomCards(this.props.num, this.props.currentCards, this.props.allCards, this.props.remembered, prevProps.currentCards);
        if (prevProps.currentCards.length !== newCurrentCards.length) {
            this.props.addCurrentCards(newCurrentCards);
            this.toConsole('DID_UPDATE', this.props);//////////////////////////////////////////////////////////////
        }
            //cookies НЕ ТРОГАТЬ
        //this.props.CardService.setCookie('currentCards', this.props.currentCards.map(card => card.id));
        setCookie('currentCards', this.props.currentCards.map(card => card.id));
        console.log(getCookie('currentCards'));
        this.toConsole('DID_UPD-??', this.props);
    }
        
    render () {
        console.log(this.props.allCards);
        this.toConsole("RENDER", this.props);/////////////////////////////////////////////////////////////////////
        return (
            <div className="app">
                <AppHeader/>
                <Routes>
                    <Route path='/cards/' exact element={<StartPage/>}/>
                    <Route path='/cards/all-words' exact element={<AllWordsPage/>}/>
                    <Route path='/cards/settings' exact element={<SettingsPage/>}/>
                    
                    
                </Routes>
            </div>
        );
    };  
};

const mapStateToProps = (state) => {
    return {
        allCards: state.cards,
        currentCards: state.currentCards,
        num: state.currentCardsNum,
        remembered: state.rememberedCards,
        showTheme: state.showTheme
    }
}

const mapDispatchToProps = {
    cardsLoaded,
    cardsRequested,
    cardsError,
    addCurrentCards,
    cookiesToState,
    addThemesToState,
    addLenghtToState
}

export default WithCardService()(connect(mapStateToProps, mapDispatchToProps)(App));
