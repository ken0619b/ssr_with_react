import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import creatStore from './helpers/createStore';

const app = express();

app.use(express.static('public'));
app.get('*', (req, res) => {
  const store = creatStore();

  // soe logic to initialize
  // thunkでのAPI処理とか
  // と思われる。

  res.send(renderer(req, store));
});

app.listen(9000, () => {
  console.log('Listening on 9000');
});
