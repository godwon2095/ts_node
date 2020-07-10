import * as express from 'express';

export const get_products = ( _: null , res: express.Response) => {
  res.render( 'admin/products.html' , 
      { message : "hello" } // message 란 변수를 템플릿으로 내보낸다.
  );
}

export const get_products_write = ( _: null , res: express.Response) => {
  res.render( 'admin/write.html');
}

export const post_products_write = ( req: express.Request , res: express.Response ) => {
  res.send(req.body);
}