var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectID;
var nl2br = require('nl2br');
var targetId;
var topView;
var secView;

router.post('/view', function(req, res, next) {
  targetId = req.body.id;
  req.db.collection('tripReview').find().sort({"reviewInfo.count": -1}).toArray(function(err, results){
    topView = results[0];
    secView = results[1];
  });
  res.status(200).send('success');
});

router.get('/', function(req, res, next){
  var text_array = [];
  req.db.collection('tripReview').findOne({ "_id" : ObjectId(targetId)}, function(err, result){
    if(req.user)
    {
    var isLiked = result.reviewInfo.like.indexOf(req.user.displayName);
    if(isLiked == -1) isLiked = false;
    else isLiked = true;
    }

    // if(isLiked == -1) isLiked = false;
    // else isLiked = true;
    // result.reviewInfo.text = nl2br(result.reviewInfo.text);
    text_array = result.reviewInfo.text.split("\n")
    console.log(text_array);
    res.render('viewTrip', {
      review: result,
      topView: topView,
      secView: secView,
      isLiked: isLiked,
      text_array:text_array
    });
  });
});

router.get('/updateCount', function(req, res, next){
  req.db.collection('tripReview').updateOne({ "_id" : ObjectId(targetId)}, {$inc: {"reviewInfo.count" : 1}});
  res.status(200).send('success');
});

module.exports = router;
