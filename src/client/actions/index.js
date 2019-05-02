// import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
  console.log('fetchUsers called');
  // ここを、クライアントorサーバーのthunk(に渡されたaxios)を使うことで振る舞いを変える

  // const res = await axios.get('http://react-ssr-api.herokuapp.com/users');
  // ここは、clientから：client => server serverから：サーバー => APIサーバー間で視聴するので、以下に置き換えられる
  const res = await api.get('/users'); //server or clientでbaseURLが設定されているはずなので、usersだけでいいはず

  dispatch({
    type: FETCH_USERS,
    payload: res
  });
}

// userがログインしているかどうか
export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  });
}

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    type: FETCH_ADMINS,
    payload: res
  });
}
