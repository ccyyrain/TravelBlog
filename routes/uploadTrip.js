var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
/*******Google Map API**********
/*****************/


// add co lib to chain promises
var co = require('co');

var mongodb = require('mongodb');

// add multer lib to support file uploads
var multer  = require('multer')
var multerGridFs = require('multer-gridfs-storage');

// use this for sending files to browser from gridfs
var Gridfs = require('gridfs-stream');

// to store in memory:
// var upload = multer({ storage: multer.memoryStorage() })

// to store in mongodb (GridFS):
const multerGridFsStorage = multerGridFs({
   url: process.env.DB_URI
});
var upload = multer({ storage: multerGridFsStorage });

  var label_0 = {
    id:"00",
    add:false,
    name:"#Mountain view"
  };
  var label_1 = {
    id:"01",
    add:false,
    name:"#Laker side"
  };
  var label_2 = {
    id : "02",
    add:false,
    name:"#Metropolitan"
  };
  var label_3 = {
    id: "03",
    add:false,
    name:"#Forest"
  }
  var label_4 = {
    id: "04",
    add:false,
    name:"#Beach"
  }
  var label_5 = {
    id: "05",
    add:false,
    name:"#Friends"
  }
  var label_6 = {
    id: "06",
    add:false,
    name:"#Couple"
  }
  var label_7 = {
    id: "07",
    add:false,
    name:"#Family"
  }
  var label_8 = {
    id: "08",
    add:false,
    name:"#Food"
  }
  var label_9 = {
    id: "09",
    add:false,
    name:"#Museum"
  }
  var label_10 = {
    id: "10",
    add:false,
    name:"#Cycling"
  }
  var label_11 = {
    id: "11",
    add:false,
    name:"#Driving"
  }
  var label_12 = {
    id: "12",
    add:false,
    name:"#Diving"
  }
  var label_13 = {
    id: "13",
    add:false,
    name:"#Party"
  }
  var label_14 = {
    id: "14",
    add:false,
    name:"#Picnic"
  }
  var labels = [label_0,label_1,label_2,label_3,label_4,label_5,label_6,label_7,label_8,label_9,label_10,label_11,label_12,label_13,label_14];



router.get('/', function(req, res, next) {
  if(req.user){
  co(function*() {
    var col = req.db.collection('fs.files');

  var count = yield col.find().count();
  var files = yield col.find().toArray();


    res.render('my_upload', {
      title: 'uploadTrip',
      lab:labels
    });

  }).catch(function(err) {
    next(err);
  });
}
else{
  res.redirect('login');
}


});

router.get('/view/:fileId', function(req, res, next) {
  var gfs = Gridfs(req.db, mongodb);
  var readstream = gfs.createReadStream({
    _id: req.params.fileId
  });
  return readstream.pipe(res);
});

router.post('/label_select',function(req,res,next){
  var index = req.body.key;
  labels[parseInt(index)].add = true;
  res.status(200).send('success');
})

router.post('/label_delete',function(req,res,next){
   var index = req.body.key;
  labels[parseInt(index)].add = false;
  res.status(200).send(labels);
})


router.post('/postReview',  function(req, res, next){
  var insertOne = req.body.data;
  insertOne = JSON.parse(insertOne);
  var postUser = req.user;
  req.db.collection('tripReview').insertOne({reviewInfo: insertOne, user: postUser});
  req.db.collection('tripReview').createIndex(
    { "$**": "text" },
  {
     name: "myIndex1"
  });
  res.status(200).send('success');
});

//This one inclued image uploading.
router.post('/uploadReview', upload.array('ajaxfile'), function(req, res, next){
  var picId = [];
  var index = 0;
  while(req.files[index]){
  picId.push(req.files[index].id);
  index++
}
  res.json({
    'fileId': picId
  });
});

module.exports = router;
