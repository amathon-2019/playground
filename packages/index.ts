import 'reflect-metadata';
import './src/controllers';
import { TypadaExpressInstance } from 'ts-decorator-express/dist/src/';
import * as Express from 'express';

const app = TypadaExpressInstance.createInstance([
  Express.json(),
  Express.urlencoded({ extended: true }),
]);

app.listen(3001, () => {
  console.log('Typada Express Decorator Start, ', 3001);
});
