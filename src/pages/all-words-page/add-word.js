import './add-word.scss';
import {connect} from 'react-redux';
import { Component } from 'react';
import { changeFormStatus } from '../../actions/action';
import Form from './form';


class AddWord extends Component {
    render() {
        return (
            <div className="add-word">            
                <p >word <span className="add-word__word"></span> is not in a database, woud you like to add new one?</p>
                <div className="add-word__type"> 
                    {
                        ['noun', 'verb', 'adjective', 'other'].map(btn => {
                            return <button
                                    className={btn === this.props.formStatus ? 'active' : ''}
                                    key={btn} id={btn}
                                    onClick={() => this.props.changeFormStatus(btn)}
                                    >{btn}</button>
                        })
                    }
                </div>
                <Form/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formStatus: state.formStatus
    }
}

const mapDispatchToProps = {
    changeFormStatus
}
export default connect(mapStateToProps, mapDispatchToProps)(AddWord);