import * as express from 'express'

const adminRouter = express.Router();

adminRouter.get('/', (req: express.Request, res: express.Response) => {
  res.send('admin 이후 url');
});

adminRouter.get('/products', (req: express.Request, res: express.Response) => {
  res.render('admin/products.html', {
    message: 'hello~',
    online: 'express'
  });
});

export default adminRouter;