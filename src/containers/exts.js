/**
 * Created by xax on 28.06.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { renderTd } from '../components/fields';

class Exts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      addButton: 'btn-success glyphicon glyphicon-plus',
      success: false,
      new: false
    };
    this.handleAddExt = this.handleAddExt.bind(this);
    this.timeoutAdd = this.timeoutAdd.bind(this);
    this.timeoutRemove = this.timeoutRemove.bind(this);
  }
  componentWillMount() {
    this.props.fetchExts();
  }
  componentDidUpdate() {
    if(!this.state.success && this.props.exts.status === 'success') {
      this.setState({ success: true });
      setTimeout(this.timeoutRemove, 3000);
    }
    if(this.props.exts.new && this.props.exts.new !== this.state.new) {
      this.setState({ new: this.props.exts.new, add: false });
      setTimeout(this.timeoutAdd, 3000);
    }
  }
  timeoutRemove() {
    this.setState({ success: false });
  }
  timeoutAdd() {
    this.setState({ new: false });
  }
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }
  renderSuccess() {
    return (this.state.success ?
        <div className="alert alert-success">
          <strong>Готово</strong>{this.props.exts.successMesage ? this.props.exts.successMesage: ''}
        </div> : <div/>
    );
  }
  renderAddExt(submitting, pristine) {
    return this.state.add ?
        <tr className="success">
            <Field
              name="name"
              type="text"
              component={renderTd}
              label="Номер"
              className="form-group"
            />
            <Field
              name="fullname"
              type="text"
              component={renderTd}
              label="Фамилию Имя"
              className="form-group"
            />
            <Field
              name="sippasswd"
              type="text"
              component={renderTd}
              label="пароль"
              className="form-group"
            />
            <Field
              name="context"
              type="text"
              component={renderTd}
              label="контекст"
              className="form-group"
            />
            <Field
              name="allow"
              type="text"
              component={renderTd}
              label="Разрешенные"
              className="form-group"
            />
            <Field
              name="deny"
              type="text"
              component={renderTd}
              label="Запрещенные"
              className="form-group"
            />
          <td>
            <button
              type="submit"
              disabled={submitting || pristine}
              className="btn btn-primary"
            >
              Добавить
            </button>
          </td>
        </tr> :
      <tr/>;
  }

  renderList() {
    return this.props.exts.list.map(( ext, index ) => {
      let style = this.state.new === ext.id ?
        'success' : '';
      setTimeout(() => {
        style = '';
        }, 3000);
      return (
        <tr key={index} className={style}>
          <td>{ext.name}</td>
          <td>{ext.fullname}</td>
          <td>{ext.sippasswd}</td>
          <td>{ext.context}</td>
          <td>{ext.deny}</td>
          <td>{ext.permit}</td>
          <td>
            <button
              type="button"
              id={ext.id}
              onClick={e => this.handleDeleteExt(e, index)}
              className="btn btn-danger glyphicon glyphicon-trash"
            />
          </td>
        </tr>
      );
    });
  }

  handleDeleteExt(e, i) {
    const id = e.target.id;
    this.props.deleteExt(id, i);
  }

  handleResetPassword(e) {
    const id = e.target.id;
    alert('Пересоздай пользователя ' + this.props.users.list[id].user);
  }
  handleAddExt() {
    this.setState((prevState) => {
        return {
          add: !prevState.add,
          addButton: prevState.add ?
            'btn-success glyphicon glyphicon-plus':
            'btn-danger glyphicon glyphicon-remove'
        };
    });
  }
  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div className="container-fluid">
        {this.renderAlert()}
        {this.renderSuccess()}
        <div className="col-md-12">
          <h4>
            Список номеров
            <button
              onClick={this.handleAddExt}
              className={'btn ' + this.state.addButton}
            />
          </h4>
          <form onSubmit={handleSubmit(this.props.addExt)} className="form" role="form">
          <table className="table">
            <thead>
            <tr>
              <td>Номер</td>
              <td>Имя</td>
              <td>Пароль</td>
              <td>Контекст</td>
              <td>Разрешенные</td>
              <td>Запрещенные</td>
            </tr>
            </thead>
            <tbody>
            {this.renderAddExt(submitting, pristine)}
            {this.renderList()}
            </tbody>
          </table>
          </form>
        </div>
      </div>
    );
  }
}
function validate(formProps) {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Пожалуйста, введите номер!';
  } else if (!/^[0-9]{4,4}$/i.test(formProps.name)) {
    errors.name = 'Номер должен быть четерехчисельным!';
  }
  if (!formProps.secret) {
    errors.secret = 'Пожалуйста, введите пароль!';
  }
  if (!formProps.fullname) {
    errors.fullname = 'Пожалуйста, введите фамилию имя абонента!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, exts: state.exts };
}

Exts = reduxForm({
  form: 'exts',
  validate
})(Exts);

Exts = connect(mapStateToProps, actions)(Exts);

export default Exts;

