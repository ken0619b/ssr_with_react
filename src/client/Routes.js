import React from 'react';
// import { Route } from 'react-router-dom';
import Home from './components/Home';
import UsersList from './components/UsersList';

export default [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/users',
    component: UsersList
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

