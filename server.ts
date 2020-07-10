import app from './app';

const port: number = 3000;

app.listen(port, () => {
  console.log('Express listening on port', port);
});