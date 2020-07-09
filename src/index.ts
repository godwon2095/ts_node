import * as express from 'express'
import adminRouter from '../routes/admin';
import contactRouter from '../routes/contact';
import * as nunjucks from 'nunjucks';

class App {
  public application : express.Application;

  constructor() {
    this.application = express();
  }
};

const app = new App().application;
const port: number = 3000;

nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

app.get('/', (req: express.Request , res: express.Response) => {
  res.send('hello express');
});

app.use('/admin', adminRouter);
app.use('/contacts', contactRouter);

app.listen(port, () => {
  console.log(`Express server opened on port ${port}`);
});