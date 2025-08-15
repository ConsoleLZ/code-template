const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('欢迎使用小哲自制模板--vercelNode')
})

app.listen(3001, () => {
  console.log("启动成功！")
})
