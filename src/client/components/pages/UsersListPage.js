import React, { Component  } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions';
import { Helmet } from 'react-helmet';

class UsersList extends Component {
  componentDidMount(){
    // serverからclientへstateを渡しつつ、server側のloadDataでuserlistを取得しているので、
    // このfetchUsersは不要となる
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>
    })
  }

  head() {
    return(
      <Helmet>
      <title>{`${this.props.users.length} Users Loaded`}</title>
      <meta property="og:title" content="Users App" />
    </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
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

export default {
  loadData, // => loadData: loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
}
