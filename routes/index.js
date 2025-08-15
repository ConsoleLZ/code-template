import express from 'express'
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message: '欢迎使用小哲的个人express模板'})
});

export default router
