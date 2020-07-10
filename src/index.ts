import * as express from 'express'
import adminRouter from '../routes/admin';
import contactRouter from '../routes/contact';
import * as nunjucks from 'nunjucks';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

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

// middleware setting
app.use( morgan('dev') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: false }));

app.use( '/uploads', express.static('uploads') );

app. use( (req: express.Request, res: express.Response, next: any) => {
  app.locals.isLogin = true;
  next();
});

app.get('/', (req: express.Request , res: express.Response) => {
  res.send('hello express');
});

const adminMiddleware = (req: express.Request, res: express.Response, next: any) => {
  console.log('Admin Middleware');
  next();
}

app.use('/admin', adminMiddleware, adminRouter);
app.use('/contacts', contactRouter);

app.listen(port, () => {
  console.log(`Express server opened on port ${port}`);
});