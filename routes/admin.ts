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

const adminRouter = express.Router();

adminRouter.get('/', testMiddleWare, testMiddleWare2, (req: express.Request, res: express.Response) => {
  res.send('admin 이후 url');
});

adminRouter.get('/products', (req: express.Request, res: express.Response) => {
  res.render('admin/products.html', {
    message: 'hello~',
  });
});

adminRouter.get('/products/write', (req: express.Request, res: express.Response) => {
  res.render('admin/write.html');
});

adminRouter.post('/products/write', (req: express.Request, res: express.Response) => {
  res.send(req.body);
});

export default adminRouter;