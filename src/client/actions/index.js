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
