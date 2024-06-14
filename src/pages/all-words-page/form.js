import { Component } from "react";
import {connect} from 'react-redux';
import { changeFormStatus, addLenghtToState, cardsLoaded } from "../../actions/action";
import Error from '../../components/error/error';
import Spinner from '../../components/spinner/spinner';

class Form extends Component {
    
    onFormSubmit = (e) => {
        e.preventDefault();
        this.props.changeFormStatus('loading');

        const URL_APP = "https://script.google.com/macros/s/AKfycbwiQr8wbjsreaH436fen7wY2g12_cQdeJBdxqhNpjiSKeVIcXOQhqbP4ICJVJXjgUK6Lg/exec";
        const form = document.querySelector("#add-word-form");
        form.action = URL_APP;

        const de = document.querySelector("[name=de]");
        const pl = document.querySelector("[name=pl]");
        const pr = document.querySelector("[name=pr]");
        const pa = document.querySelector("[name=pa]");
        const rus = document.querySelector("[name=rus]");
        const eng = document.querySelector("[name=eng]");
        const th = document.querySelector("[name=th]");
        const di = document.querySelector("[name=di]");
        
        const checked = document.querySelector("input[name='gen']:checked");

        let details = {
            id: this.props.cardsLenght,
            gen: checked.value,
            de: de.value.trim(),
            pl: pl.value.trim(),
            pr: pr.value.trim(),
            pa: pa.value.trim(),
            rus: rus.value.trim(),
            eng: eng.value.trim(),
            th: th.value.trim(),
            di: di.value.trim(),
        };
        console.log(details);

        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");
        console.log(formBody);

        fetch(URL_APP, { method: 'POST',
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        },
                        mode: "no-cors",
                        body: formBody})
        .then(response => {
                    console.log('Success!', response);
                    this.props.changeFormStatus('success');
                    this.props.addLenghtToState(this.props.cardsLenght + 1);
                    this.props.cardsLoaded([details]);
                    
                    de.value = '';
                    pl.value = '';
                    pr.value = '';
                    pa.value = '';
                    rus.value = '';
                    eng.value = '';
                    th.value = '';
                    di.value = '';
                    checked.checked = false;

        })
        .catch(error => {
                    console.error('Error!', error.message);
                    this.props.changeFormStatus('error')
        })
    };
    
    render() {
        const status = this.props.formStatus;
        const visible = status === 'noun' ||
                        status === 'verb' ||
                        status === 'adjective' ||
                        status === 'other' ? '' : 'none';
        return (
            <div className='add-word__form'>
                <form method="post" id="add-word-form" onSubmit={async (e) => this.onFormSubmit(e)}>

                    <fieldset className={status !== 'noun' ? 'none' : ''}>
                        <legend>Gender</legend>
                        {
                            ['der', 'die', 'das'].map(input => {
                                return <div key={input}>
                                            <input 
                                                type="radio"
                                                key={input}
                                                id={input}
                                                name="gen"
                                                value={input}
                                                required={status === 'noun' && input === 'der' ? true : false}
                                            />
                                            <label htmlFor={input}>{input}</label>
                                        </div>
                                })
                            }
                    </fieldset>

                    <div className={visible} id='text-inputs'>
                    {
                        [
                            {name:'de', title:'German word*', req:true},
                            {name:'pl', title:'Plural', cl: status === 'noun' ? '' : 'none'},
                            {name:'pr', title: status === 'verb' ? 'Präteritum' : 'Komparativ', cl: status === 'verb' || status === 'adjective' ? '' : 'none'},
                            {name:'pa', title: status === 'verb' ? 'Partizip II' : 'Superlativ',  cl: status === 'verb' || status === 'adjective' ? '' : 'none'},
                            {name:'eng', title:'English word'},
                            {name:'rus', title:'Russish word'},
                            {name:'th', title:'Theme'},
                            {name:'di', title:'Dialekt'},
                        ].map(el => {
                            return <div key={el.name} className={el.cl}>
                                        <label htmlFor={el.name}>{el.title}</label>
                                        <input type='text'
                                                autoComplete='off' 
                                                name={el.name}
                                                minLength="2"
                                                required={el.req}
                                                title={el.title}></input>
                                    </div>
                        })
                    }
                    </div>
                    
                       
                    <div className={visible}>
                        <button type="submit" >Add</button>
                    </div>

                    { status === 'loading' ? <Spinner/> : ''}
                    { status === 'error' ? <Error/> : ''}
                    { status === 'success' ? <div>Success!!!</div> : ''}
                </form>   
            </div>      
        )
    }
}

const mapStateToProps = (state) => {
    return {
        formStatus: state.formStatus,
        cardsLenght: state.cardsLenght
    }
}

const mapDispatchToProps = {
    changeFormStatus,
    addLenghtToState,
    cardsLoaded
}
export default connect(mapStateToProps, mapDispatchToProps)(Form);