import * as express from 'express';
const contactRouter = express.Router();

contactRouter.get('/', (req: express.Request, res: express.Response) => {
  res.send('contacts');
});

contactRouter.get('/list', (req: express.Request, res: express.Response) => {
  res.send('contacts list');
});

export default contactRouter;
