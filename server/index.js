const express = require('express');
const cors = require('cors');
const fileRouter = require('./file-routes');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
  
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/file',fileRouter);


app.listen(3001, () => {
    console.log('Server Started...')
});