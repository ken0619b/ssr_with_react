import React from 'react';
// import { Route } from 'react-router-dom';
import App from './App';
import HomePage from './components/pages/HomePage';
import UsersListPage from './components/pages/UsersListPage';
import NotFoundPage from './components/pages/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,  // => component: HomePage　と同じ
        path: '/',
        exact: true
      },
      {
        ...UsersListPage, // => component: UserListPage, loadData: loadDataと同じ
        path: '/users',
      },
      {
        ...NotFoundPage
      }
    ]
  }

];

// tract-router-config対応

// () => {
//   return (
//     <div>
//       <Route exact path="/" component={Home} />
//       <Route exact path="/users" component={UsersList} />
//     </div>
//   );
// };

