import { Link } from 'react-router-dom';
import './app-header.scss';
import { Component } from 'react';

class AppHeader extends Component {
    onLink = (e) => {
        if (e && e.target.closest('.header__link')) {
            const current = e.target.closest('.header__link');
            document.querySelectorAll('.header__link').forEach(el => el.classList.remove('active'));
            current.classList.add('active');
        }                       
    }
    render () {
        return (
            <header className="header" onClick={(e) => this.onLink(e)}>
                <Link to='/cards/'  className="header__link active"><span><span id='cardsPic'></span></span></Link>
                <Link to='/cards/all-words/' className="header__link"><span><span id='wordsPic'></span></span></Link>
                <Link to='/cards/settings/' className="header__link"><span><span id='settingsPic'></span></span></Link>
            </header>
        )  
    }
};
export default AppHeader;

//&#128455;
//&#128457;
//&#9965;