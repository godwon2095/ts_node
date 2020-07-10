import * as express from 'express';
import { get_products, get_products_write, post_products_write } from './admin.ctrl';

const adminRouter = express.Router();

function testMiddleWare( req: express.Request, res: express.Response, next: any ){
  console.log('첫번째 미들웨어');
  next();
}

function testMiddleWare2( req: express.Request, res: express.Response, next: any ){
  console.log('두번째 미들웨어');
  next();
}

adminRouter.get('/', testMiddleWare, testMiddleWare2 , (req: express.Request, res: express.Response) => {
  res.send('admin app');
});

adminRouter.get('/products', get_products );

adminRouter.get('/products/write', get_products_write );

adminRouter.post('/products/write', post_products_write );

export default adminRouter;