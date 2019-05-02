import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from '../client/Routes';
import serialize from 'serialize-javascript';
import { renderRoutes } from 'react-router-config';
// 通常のcreateStoreは要らない。呼び出し元でstoreを渡しているから。

// このstoreはserverのstore

export default (req, store) => {
  const content = renderToString(
    <Provider store={store}>
    <StaticRouter location={req.path} context={{}}>
      <div>{renderRoutes(Routes)}</div>
    </StaticRouter>
  </Provider>
  );

  // このままの場合、XSSができてしまう。
  // scriptタグへ埋め込んでいるから。

//   return `
//   <html>
//     <head></head>
//     <body>
//       <div id="root">${content}</div>
//       <script>
//         window.INITIAL_STATE = ${JSON.stringify(store.getState())}
//       </script>
//       <script src="bundle.js"></script>
//     </body>
//   </html>
// `;
// };

// serializeで以下のようにする

  return `
    <html>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
      </head>
      <body>
        <div id="root">${content}</div>
        <script>
          window.INITIAL_STATE = ${serialize(store.getState())}
        </script>
        <script src="bundle.js"></script>
      </body>
    </html>
  `;
};
