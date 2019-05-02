import 'babel-polyfill';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';  // Arrayのやつ
import renderer from './helpers/renderer';
import creatStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = creatStore();

  // react-routes-configを使い、コンポーネントでdataを取得する必要があるか見る
  // store があるので、これ経由でloadData内でactionをコールする感じかな
  const promises = matchRoutes(Routes, req.path).map(({ route }) => {
    return route.loadData ? route.loadData(store) : null; //routeごとにloadDataが存在しないケースが有るため
  });

  console.log(promises);

  res.send(renderer(req, store));
});

app.listen(9000, () => {
  console.log('Listening on 9000');
});
