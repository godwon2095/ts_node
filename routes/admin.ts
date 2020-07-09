import * as express from 'express'
import * as morgan from 'morgan';

const testMiddleWare = (req: express.Request, res: express.Response, next: any) => {
  console.log('first middleware');
  next();
};

const testMiddleWare2 = (req: express.Request, res: express.Response, next: any) => {
  console.log('second middleware');
  next();
};

const loginRequired = (req: express.Request, res: express.Response, next: any) => {
  
}

const adminRouter = express.Router();

adminRouter.get('/', testMiddleWare, testMiddleWare2, (req: express.Request, res: express.Response) => {
  res.send('admin 이후 url');
});

adminRouter.get('/products', (req: express.Request, res: express.Response) => {


  res.render('admin/products.html', {
    message: 'hello~',
  });
});

export default adminRouter;