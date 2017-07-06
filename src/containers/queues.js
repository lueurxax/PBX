/**
 * Created by xax on 29.06.2017.
 */
/**
 * Created by xax on 28.06.2017.
 */
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions';
import { connect } from 'react-redux';
import 'react-widgets/lib/less/react-widgets.less';

import renderMultiselect from '../components/renderMultiselect';
import { renderTd } from '../components/fields';

class Queues extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: false,
      addButton: 'btn-success glyphicon glyphicon-plus',
      success: false,
      new: false
    };
    this.handleAddQueue = this.handleAddQueue.bind(this);
    this.handleChangeAgents = this.handleChangeAgents.bind(this);
  }

  componentWillMount() {
    this.props.fetchQueues();
    this.props.fetchExts();
  }

  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }
  handleAddQueue() {
    this.setState( prevState => {
      return {
        add: !prevState.add,
        addButton: prevState.add ?
          'btn-success glyphicon glyphicon-plus':
          'btn-danger glyphicon glyphicon-remove'
      };
    });
  }
  handleChangeAgents(e, a, queue) {
    this.props.updateAgents(a, queue);
  }

  renderAlert() {
    return (this.props.errorMessage ?
        <div className="alert alert-danger">
          <strong>Oops!</strong>{this.props.errorMessage}
        </div> : <div/>
    );
  }
  renderMembers(members) {
    return members.map(member => (
      <tr key={member.uniqueid}>
        <td>{member.membername}</td>
        <td>{member.penlty}</td>
        <td>{member.paused}</td>
      </tr>
    ));
  }
  renderList() {
    const extNames = aroObToAr(this.props.exts.list, 'name');
    return this.props.queues.list.map(( queue, index ) => {
      const agentNames = aroObToAr(queue.members, 'membername');
      return (
      <tr key={index}>
        <td>
          <a id="name" className="vis">
            {queue.name}
            <span>
              <table style={{ marginBottom: '0px' }}
                     className="table table-hover table-condensed table-bordered">
                <tbody>
                  {this.renderMembers(queue.members)}
                </tbody>
              </table>
            </span>
          </a>
        </td>
        <td>
          <Field
            name={'agents' + queue.name}
            component={renderMultiselect}
            defaultValue={agentNames}
            data={extNames}
            onChange={(e, a) => this.handleChangeAgents(e, a, queue.name)}
          />
        </td>
        <td>{queue.strategy}</td>
        <td>{queue.ringinuse}</td>
        <td>{queue.context}</td>
        <td>
          <button
            id={index}
            onClick={this.handleDeleteQueue}
            className="btn btn-danger glyphicon glyphicon-trash"
          />
        </td>
      </tr>);
    });
  }
  handleDeleteQueue(e) {
    const id = e.target.id;
    this.props.deleteQueue(id);
  }
  renderAddQueue(submitting) {
    const extNames = aroObToAr(this.props.exts.list, 'name');
    return this.state.add ?
      <tr className="success">
        <Field
          name="name"
          type="text"
          component={renderTd}
          label="Номер"
          className="form-group"
        />
        <td>
        <Field
          name="agents"
          component={renderMultiselect}
          data={extNames}/>
        </td>
        <Field
          name="strategy"
          type="text"
          component={renderTd}
          label="стратегия"
          className="form-group"
        />
        <Field
          name="ringinuse"
          type="text"
          component={renderTd}
          label="ringinuse"
          className="form-group"
        />
        <Field
          name="context"
          type="text"
          component={renderTd}
          label="Контекст"
          className="form-group"
        />
        <td>
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary"
          >
            Добавить
          </button>
        </td>
      </tr> :
      <tr/>;
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container-fluid">
        {this.renderAlert()}
        <div className="col-md-12">
          <h4>Список очередей
            <button
              onClick={this.handleAddQueue}
              className={'btn ' + this.state.addButton}
            />
          </h4>
          <form onSubmit={handleSubmit(this.props.addQueue)} className="form" role="form">
            <table className="table">
              <thead>
              <tr>
                <td>Номер</td>
                <td>Агенты</td>
                <td>Стратегия</td>
                <td>ringinuse</td>
                <td>Контекст</td>
              </tr>
              </thead>
              <tbody>
              {this.renderAddQueue(submitting)}
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
  if (!formProps.email) {
    errors.email = 'Пожалуйста, введите login!';
  } else if (!/^[A-Z]{1,2}\.[A-Z]+$/i.test(formProps.email)) {
    errors.email = 'Логин не соответствует формату ' +
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

function aroObToAr(array, key) {
  return array.map( elem => {
    return elem[key];
  });
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, queues: state.queues, exts: state.exts };
}

Queues = reduxForm({
  form: 'exts',
  validate
})(Queues);

Queues = connect(mapStateToProps, actions)(Queues);

export default Queues;
