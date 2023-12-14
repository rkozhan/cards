import { Link } from 'react-router-dom';
import './app-header.scss';

const AppHeader = () => {
    return (
        <header className="header">
            <Link to='/' className="header__link">
                Current Cards
            </Link>

            <Link to='/all-cards/' className="header__link">
                All cards
            </Link>

            <Link to='/settings/' className="header__link">
                Settings
            </Link>
        </header>
    )
};

export default AppHeader;