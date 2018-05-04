const express = require('express');
const app = express();
app.set('view engine', 'ejs');//ejs files
app.use(express.static('public'));//create public folder

//Body Praser 
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//multer for file upload
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, 'public/')
    },
    filename: (req, file, callback) => {
        var filetype = file.mimetype;
        var fileformate = filetype.split("/")[1];
        callback(null, file.fieldname+'_'+req.body.name+'_'+Date.now() +'.'+ fileformate);
      }
});
var upload = multer({storage: storage});

app.get('/',(req,res)=>{
    res.render('form');
})
app.post('/uploads',upload.single('images'),(req,res)=>{
    res.send('File Uploaded Success.File Uploaded in the path: ' +req.file.path);
    // console.log(req.body);
})

app.listen(3000);