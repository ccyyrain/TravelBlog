var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;

var GoogleLocations = require('google-locations');
var locations = new GoogleLocations('AIzaSyAgsAURuHNsGX16TOcrNn20_SKizDxgEnM');
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
 var label_length = 15;
var updateData;
var updateData_tmp;
var updateId;
var likeUser = [];
var unlikeUser = [];


router.post('/getOld', function(req, res, next){
  updateId = req.body.id;
  req.db.collection('tripReview').findOne({"_id" : ObjectId(updateId)}, function(err, result){
    // console.log(result, "im the update");
    for(var k = 0; k<label_length; k++){
      labels[k].add = false;
    }
    updateData = result;
    // console.log(updateData);
    // res.status(200).send('success');
    res.json({
      data:updateData.reviewInfo.pic
    })
  });
});


router.post('/delete', function(req, res, next){


  var deleteId = req.body.id;
  req.db.collection('tripReview').deleteOne({ "_id" : ObjectId(deleteId)});
  res.status(200).send('success');
  });


  router.post('/like', function(req, res, next){
    if(req.user){
    co(function*(){
      var likeId = req.body.id;
      req.db.collection('tripReview').findOne({"_id": ObjectId(likeId)}, function(err, result){
        likeUser = result.reviewInfo.like;
        result.reviewInfo.like.push(req.user.displayName);
        console.log(result.reviewInfo.like);
        req.db.collection('tripReview').updateOne({"_id": ObjectId(likeId)}, {$set: {
          "reviewInfo.like" : likeUser
        }});
      });
    })
  }
    res.status(200).send('success');
  });


  router.post('/unlike', function(req, res, next){
    co(function*(){
      var unlikeId = req.body.id;
      req.db.collection('tripReview').findOne({"_id": ObjectId(unlikeId)}, function(err, result){
        unlikeUser = result.reviewInfo.like;
        var index = result.reviewInfo.like.indexOf(req.user.displayName);
        if(index > -1){
          result.reviewInfo.like.splice(index, 1);
        }
        console.log(result.reviewInfo.like);
        req.db.collection('tripReview').updateOne({"_id": ObjectId(unlikeId)}, {$set: {
          "reviewInfo.like" : unlikeUser
        }});
      });
    })
    res.status(200).send('success');
  });

router.get('/', function(req, res, next) {
  co(function*() {
    let myPromise = new Promise((resolve,reject) =>{
      updateData_tmp = updateData;
      resolve("success");
    })
    myPromise.then((successMessage) => {
      updateData.reviewInfo.label = [];
    })

    var arr =  updateData_tmp.reviewInfo.label;
    if(arr){
    var len =  arr.length;
      for(var i = 0; i < label_length; i++){
        for(var j = 0; j< len; j++){
            if(arr[j] == labels[i].name){
              labels[i].add = true;
            }
        }
      }
    }
    // console.log("I am rendering!");
    // console.log(updateData_tmp.reviewInfo.pic);
    res.render('updateReview', {
      title: 'uploadTrip',
      lab:labels,
      update: updateData_tmp,
      test_img:updateData_tmp.reviewInfo.pic
    });
  }).catch(function(err) {
    next(err);
  });
});

router.post('/updateNew', function(req, res, next){
  var updateContent = req.body.data;
  updateContent =JSON.parse(updateContent);
  // console.log("title is " + updateContent.title);
  req.db.collection('tripReview').updateOne({ "_id" : ObjectId(updateId)}, {$set: {
    "reviewInfo.title" : updateContent.title,
    "reviewInfo.locationCountry" : updateContent.locationCountry,
    "reviewInfo.locationCity" : updateContent.locationCity,
    "reviewInfo.starttime" : updateContent.starttime,
    "reviewInfo.endtime" : updateContent.endtime,
    "reviewInfo.cost" : updateContent.cost,
    "reviewInfo.mainTrans" : updateContent.mainTrans,
    "reviewInfo.label" : updateContent.label,
    "reviewInfo.text" : updateContent.text,
    "reviewInfo.pic" : updateContent.pic
  }});
  req.db.collection('tripReview').createIndex(
    { "$**": "text" },
  {
     name: "myIndex1"
  });
  // console.log(updateContent.label);
  res.status(200).send('success');
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
//


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

router.post('/uploadReview', upload.array('ajaxfile'), function(req, res, next){
  // console.log("here is upload Review");
  var picId = [];
  var index = 0;
  console.log(updateData_tmp);
  while(req.files[index]){
  updateData_tmp.reviewInfo.pic.push(req.files[index].id);
  index++
}
  res.json({
    'fileId': updateData_tmp.reviewInfo.pic
  });
});

router.post('/image_delete',function(req,res,next){
   var delete_id = req.body.key;
  //  var index = updateData_tmp.indexOf(delete_id);
  var index = updateData.reviewInfo.pic.indexOf(delete_id);
  if(index > -1){
    updateData.reviewInfo.pic.splice(index,1);
  }
  // res.json({
  //   data:updateData.reviewInfo.pic
  // })
  res.status(200).send('success');
})

module.exports = router;
