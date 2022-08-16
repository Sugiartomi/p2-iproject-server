const express = require("express");
const cors = require('cors')
const router = require('./router/router');
const error_handler = require('./helpers/errorHandler')

const app = express();
const port = 3000;

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(router);
app.use(error_handler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
