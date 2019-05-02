import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
  componentDidMount(){
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
  }

  render() {
    return (
      <div>
        Here's a big list of users
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

// この名前でfunctionを定義しておくと、router-configで呼び出せる（fetchできる）
function loadData(store) {
  // APIコールの場合、ここでDispatchする
  // storeはRoutes.jsから継承
  // Promiseが帰ってくる-> APIコールするからかな
  // この時点で、まだfetchUsers(connectで渡ってきているfetchUserはっコールできない。hydrateするまでは
  // 湯運行にならないので)
  return store.dispatch(fetchUsers());
}

export { loadData };
export default connect(mapStateToProps, { fetchUsers })(UsersList)
