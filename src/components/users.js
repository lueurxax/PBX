/**
 * Created by xax on 23.02.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import QRCode from 'qrcode.react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { renderField } from './fields';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { QRcodeURL: '' };
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }

  renderList() {
    return this.props.users.list.map(( user, index ) => (
      <tr key={index}>
        <td>{user.user}</td>
        <td>
          <button
            id={index}
            onClick={e => this.handleResetPassword(e)}
            className="btn btn-primary"
          >
            Reset
          </button>
        </td>
        <td>
          <button
            id={index}
            onClick={e => this.handleQR(e)}
            className="btn btn-info glyphicon glyphicon-qrcode"
          />
        </td>
        <td>
          <button
            id={user.id}
            onClick={e => this.handleDeleteUser(e)}
            className="btn btn-danger glyphicon glyphicon-trash"
          />
        </td>
      </tr>
    ));
  }

  handleQR(e) {
    const user = this.props.users.list[e.target.id];
    const URL = `otpauth://totp/${user.user}?secret=${user.secret}&issuer=http://call.dssl`;
    this.setState({ QRcodeURL: URL });
  }

  handleDeleteUser(e) {
    const id = e.target.id;
    this.props.deleteUser(id);
  }

  handleResetPassword(e) {
    const id = e.target.id;
    alert('Пересоздай пользователя ' + this.props.users.list[id].user);
  }

  renderQR() {
    return this.state.QRcodeURL ? <QRCode
      value={this.state.QRcodeURL}
      level="M"
      size={200}
    /> :
      <div/>;
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        <div className="col-md-6">
          <h4>Список пользователей</h4>
          <table className="table">
            <thead>
            <tr>
              <td>Имя</td>
              <td>Сброить пароль</td>
              <td>QRcode</td>
              <td>Удалить</td>
            </tr>
            </thead>
            <tbody>
            {this.renderList()}
            </tbody>
          </table>
          {this.renderQR()}
        </div>
        <div className="col-md-6">
          <h4>Зарегистрировать нового пользователя</h4>
          <form onSubmit={handleSubmit(this.props.signupUser)}>
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
              name="passwordConfirm"
              type="password"
              component={renderField}
              label="Confirm Password:"
              className="form-group"
            />
            <div className="checkbox">
              <label>
                <Field
                  name="isAdmin"
                  type="checkbox"
                  component="input"
                  className="checkbox"
                />
                Админ?
              </label>
            </div>
            {this.renderAlert()}
            <button type="submit" disabled={submitting} className="btn btn-primary">Sign up</button>
          </form>
        </div>
      </div>
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.user) {
    errors.user = 'Пожалуйста, введите login!';
  } else if (!/^[A-Z]{1,2}\.[A-Z]+$/i.test(formProps.user)) {
    errors.user = 'Логин не соответствует формату ' +
      '"и.фамилия" (Если пользователя зовут: Фамилия Имя)';
  }
  if (!formProps.password) {
    errors.password = 'Пожалуйста, введите пароль!';
  }
  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Пожалуйста, введите подтверждение пароля!';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Пароли не совпадают!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, users: state.users };
}

Signup = reduxForm({
  form: 'Signup',
  validate
})(Signup);

Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;
