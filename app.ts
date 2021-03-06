import * as express from 'express'
import * as nunjucks from 'nunjucks';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import router from './controllers';
import db from './models';

class App {
  public app: express.Application;

  constructor () {
    this.app = express();

    // db 접속
    this.dbConnection();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  private setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private dbConnection(){
    // DB authentication
    db.sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .then(() => {
        console.log('DB Sync complete.');
    })
    .catch((err: Error) => {
        console.error('Unable to connect to the database:', err);
    });
  }

  private setViewEngine() {
    nunjucks.configure('templates', {
      autoescape: true,
      express: this.app
    });
  }

  private setStatic() {
    this.app.use('/uploads', express.static('uploads'));
  }

  private setLocals() {
    // 템플릿 변수
    this.app.use( ( req: express.Request, res: express.Response, next: any) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  private getRouting() {
    this.app.use(router);
  }

  private status404() {        
    this.app.use( ( req: express.Request, res: express.Response, _: null ) => {
      res.status(404).render('common/404.html')
    });
  }

  private errorHandler() {
    this.app.use( (err: string, req: express.Request, res: express.Response, _: null ) => {
      console.error(err);
      res.status(500).render('common/500.html')
    });
  }
};

// module.exports = new App().app;
const app = new App().app;
export default app;