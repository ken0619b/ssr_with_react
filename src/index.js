import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import proxy from 'express-http-proxy';
import Routes from './client/Routes';  // Arrayのやつ
import renderer from './helpers/renderer';
import creatStore from './helpers/createStore';

const app = express();

app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
  proxyReqOptDecorator(opts){
    opts.headers['x-forwarded-host'] = 'localhost:3000' // これ、localhost:3000からのアクセスを許可しているので変更
    return opts;
  }
}))

app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = creatStore(req);

  // react-routes-configを使い、コンポーネントでdataを取得する必要があるか見る
  // store があるので、これ経由でloadData内でactionをコールする感じかな
  // 複数買えるケースがある？？　routingだから1マッチなのかなと思うけど
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null; //routeごとにloadDataが存在しないケースが有るため
  });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if(context.notFound){
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
