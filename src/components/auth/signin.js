/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { renderField } from '../fields';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ user, password, code }) {
    this.props.signinUser({ user, password, code });
  }

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="user"
          type="text"
          component={renderField}
          label="Login:"
          className="form-group"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password:"
          className="form-group"
        />
        <Field
          name="code"
          type="password"
          component={renderField}
          label="Code:"
          className="form-group"
        />
        {this.renderAlert()}
        <button type="submit" disabled={submitting} className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}
function validate(formProps) {
  const errors = {};

  if (!formProps.user) {
    errors.user = 'Пожалуйста, введите имя пользователя!';
  }
  if (!formProps.password) {
    errors.password = 'Пожалуйста, введите пароль!';
  }
  if (!formProps.code) {
    errors.code = 'Пожалуйста, введите пароль!';
  } else if (!/^\d{6}$/i.test(formProps.code)) {
    errors.code = 'Код GoogleAuthentificator не верен';
  }
  return errors;
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


Signin = reduxForm({
  form: 'signin',
  validate
})(Signin);

Signin = connect(mapStateToProps, actions)(Signin);

export default Signin;
