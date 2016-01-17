var express = require('express')
var app = express();
var multiparty = require('multiparty');
var util = require('util');
var path = require('path');
var fs = require('fs');
var DIR = './uploads/';
var uuid = require('node-uuid');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// app.use(multer({
//     dest: DIR,
//     rename: function (fieldname, filename) {
//         return filename + Date.now();
//     },
//     onFileUploadStart: function (file) {
//         console.log(file.originalname + ' is starting ...');
//     },
//     onFileUploadComplete: function (file) {
//         console.log(file.fieldname + ' uploaded to  ' + file.path);
//     }
// }));

app.post('/posting', function (req, res, next) {
    // upload.array('files[]'),
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        console.log(fields.name.toString());
        // console.log('files ', files.pics);
        var fileList = files.pics;
        for (var i = 0; i < files.pics.length; i++) {
            var filename = uuid.v4() + path.extname(fileList[i].path);
            var tmpUploadPath = path.join(__dirname, 'uploads/', filename);
            // console.log(tmpUploadPath);
            fs.createReadStream(files.pics[i].path).pipe(fs.createWriteStream(tmpUploadPath));
        }
        // res.writeHead(200, { 'content-type': 'text/plain' });
        // res.write('received upload:\n\n');
        res.end(util.inspect({ fields: fields, files: files }));
    });

    return;

})

var PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log('Working on port ' + PORT);
});

