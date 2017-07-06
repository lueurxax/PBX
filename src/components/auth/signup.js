/**
 * Created by xax on 23.02.2017.
 */
import React,{Component} from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    handleFormSubmit(formProps){
        this.props.signupUser(formProps);
    }
    renderAlert(){
        return (this.props.errorMessage ?
                <div className="alert alert-danger">
                    <strong>Oops!</strong>{this.props.errorMessage}
                </div>:<div></div>
        )
    }
    render(){
        const {handleSubmit, fields: {email,password,passwordConfirm}} = this.props;
        return(
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <fieldset className="form-group">
                    <label>Login:</label>
                    <input {...email} className="form-control"/>
                    {email.touched && email.error && <div className="error">{email.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Password:</label>
                    <input type="password" {...password} className="form-control"/>
                    {password.touched && password.error && <div className="error">{password.error}</div>}
                </fieldset>
                <fieldset className="form-group">
                    <label>Confirm Password:</label>
                    <input type="password" {...passwordConfirm} className="form-control"/>
                    {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
                </fieldset>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up</button>
            </form>
        )
    }
}
function validate(formProps) {
    const errors={};

    if(!formProps.email){
        errors.email = 'Пожалуйста, введите email!'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
        errors.email = 'Почтовый адрес не верен'
    }
    if(!formProps.password){
        errors.password = 'Пожалуйста, введите пароль!'
    }
    if(!formProps.passwordConfirm){
        errors.passwordConfirm = 'Пожалуйста, введите подтверждение пароля!'
    }

    if(formProps.password!==formProps.passwordConfirm){
        errors.password = 'Пароли не совпадают!';
    }

    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.error};
}

export default reduxForm({
    form: 'signup',
    fields: ['email','password','passwordConfirm'],
    validate
},mapStateToProps,actions)(Signup);