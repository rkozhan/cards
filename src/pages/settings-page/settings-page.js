import { setCookie, delCookie } from "../../services/cookie";
import {connect} from 'react-redux';
import { deleteAllRemembered, deleteAllLiked, addCurrentCards, setEng, setRus, setNum,setTheme } from "../../actions/action";
import './settings-page.scss';
import AppFooter from '../../components/app-footer/app-footer';
import { Component } from "react";

class SettingsPage extends Component {

    dropdown = (e) => {
        if (e && e.target.closest('.dropdown__header')) {
            e.target.closest('.dropdown__header').nextElementSibling.classList.toggle('hide');
            e.target.closest('.dropdown').classList.toggle('active');
        };
    };
   

    render () {
        const { setRus, setEng, setNum, setTheme, currentCardsNum} = this.props;

        return (
            <div className="set">
                <h2>Settings</h2>

                <section className="dropdown active">
                    <div className="dropdown__header" onClick={(e) => this.dropdown(e)}>Change showed languages:</div>
                    <div>
                        <button className={this.props.showRus ? 'active': ''} onClick={ async () => {
                            await setRus();
                            setCookie('showRus', this.props.showRus);
                        }}>Rus</button>
                        <button className={this.props.showEng ? 'active': ''} onClick={ async () => {
                            await setEng();
                            setCookie('showEng', this.props.showEng);
                        }}>Eng</button> 
                    </div>
                </section>

                <section className="dropdown active">
                    <div className="dropdown__header" onClick={(e) => this.dropdown(e)}>Change number of cards:</div>
                    <div >
                        {   
                            [10,15,20,25].map(item => {
                                const cl = currentCardsNum === item ? 'active' : '';
                                return <button className={cl}
                                key={item}
                                onClick={ () => {
                                    setNum(item);
                                    setCookie('currentCardsNum', item); 
                                }}>{item}</button>
                            })
                        }
                    </div>
                </section>

                <section className="dropdown">
                    <div className="dropdown__header" onClick={(e) => this.dropdown(e)}>Change showed themes:</div>
                    <div className="hide">
                        <h3 className="warning">Attention! The results of memorizing words will be deleted!</h3>
                        {
                            this.props.themes.map(item => {
                                const cl = this.props.showTheme.includes(item) ? '' : 'active';
                                return <button className={cl}
                                key={item}
                                onClick={ async () => {
                                    await setTheme(item);
                                    setCookie('showTheme', this.props.showTheme);
                                    delCookie('rememberedCards');                               
                                    delCookie('currentCards');
                                    window.location.reload();
                                }}>{item}</button>
                            })
                        }
                    </div>
                </section>
                                  
                <section className="dropdown">
                    <div className="dropdown__header" onClick={(e) => this.dropdown(e)}>Reset</div>
                    <div className="hide">
                        <p>This app used cookies to save your progress and settings. It used or saved any personal information</p>
                        <button onClick={async () => {
                                await deleteAllRemembered();
                                await addCurrentCards([]);
                                delCookie('rememberedCards');
                                delCookie('currentCards');
                                window.location.reload();
                            }}>Reset remembered</button>
                        <button onClick={async () => {
                                await deleteAllLiked();
                                setCookie('liked', []);
                                window.location.reload();
                            }}>Reset liked</button>
                    </div>
                </section>

                <section className="dropdown ">
                    <div className="dropdown__header" onClick={(e) => this.dropdown(e)}>Source</div>
                    <form label='form-settings' className="set__form hide">
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

                <AppFooter/>
            </div>
    
        )
    }
    
}


const mapStateToProps = (state) => {
    return {
        rememberedCards: state.rememberedCards,
        showEng: state.showEng,
        showRus: state.showRus,
        currentCardsNum: state.currentCardsNum,
        showTheme: state.showTheme,
        themes: state.themes
    }
}

const mapDispatchToProps = {
    deleteAllRemembered,
    deleteAllLiked,
    addCurrentCards,
    setEng,
    setRus,
    setNum,
    setTheme
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);