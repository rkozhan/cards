import { setCookie, delCookie } from "../../services/cookie";
import {connect} from 'react-redux';
import { deleteAllRemembered, deleteAllLiked, addCurrentCards, setEng, setRus, setNum } from "../../actions/action";
import './settings-page.scss';
import { Component } from "react";

class SettingsPage extends Component {

    render () {
        const { setRus, setEng, setNum, currentCardsNum} = this.props;
        return (
            <div className="set">
                <h2>Settings</h2>
                <section>
                    <form label='form-settings' className="set__form">
                        <p>You can add your oun source of words,<br/>using Google Sheets <span>info</span></p>
                        <div className="set__form_source">
                            <div>
                                <input type="radio" id="defaultSheet" name="linkToDB" value="default" />
                                <label htmlFor="defaultSheet">Default</label>
                                <input type="radio" id="mySheet" name="linkToDB" value="my"/>
                                <label htmlFor="mySheet">Add my oun</label>
                            </div>
                            <input type="text" id="mySheetUrl" name="mySheetUrl" disabled placeholder="copy your Google sheet's id"></input>
                            <button type="submit" disabled>Add</button>
                        </div>
                    </form>
                </section>
    
                <section>
                    <p>This app used cookies to save your progress and settings. It used or saved any personal information</p>
                    <button onClick={async () => {
                            await deleteAllRemembered();
                            await addCurrentCards([]);
                            delCookie('rememberedCards');
                            delCookie('currentCards');
                            //setTimeout(() => {
                                window.location.reload();
                            //}, 500); 
                        }}>Reset remembered</button>
                    <button onClick={async () => {
                            await deleteAllLiked();
                            setCookie('liked', []);
                            window.location.reload();
                        }}>Reset liked</button>
                </section>
                <section className="set__lang">
                    Show languages:
                    <button className={this.props.showRus ? 'active': ''} onClick={ async () => {
                                                                await setRus();
                                                                setCookie('showRus', this.props.showRus);
                                                        }}>Rus</button>
                    <button className={this.props.showEng ? 'active': ''} onClick={ async () => {
                                                                await setEng();
                                                                setCookie('showEng', this.props.showEng);
                                                        }}>Eng</button> 
                </section>
                <section className="set__num">
                    Number of cards:
                    {   
                        [10,15,20].map(item => {
                            const cl = currentCardsNum === item ? 'active' : '';
                            return <button className={cl}
                                           key={item}
                                           onClick={ () => {
                                                setNum(item);
                                                setCookie('currentCardsNum', item) 
                                           }}>{item}</button>
                        })
                    }
                </section>
            </div>
    
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        rememberedCards: state.rememberedCards,
        showEng: state.showEng,
        showRus: state.showRus,
        currentCardsNum: state.currentCardsNum
    }
}

const mapDispatchToProps = {
    deleteAllRemembered,
    deleteAllLiked,
    addCurrentCards,
    setEng,
    setRus,
    setNum
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);