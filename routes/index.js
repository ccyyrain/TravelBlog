var express = require('express');
const passport = require('passport');
var router = express.Router();


var s_label_0 = {
  id:"00",
  add:false,
  name:"#Mountain view"
};
var s_label_1 = {
  id:"01",
  add:false,
  name:"#Laker side"
};
var s_label_2 = {
  id : "02",
  add:false,
  name:"#Metropolitan"
};
var s_label_3 = {
  id: "03",
  add:false,
  name:"#Forest"
}
var s_label_4 = {
  id: "04",
  add:false,
  name:"#Beach"
}
var s_label_5 = {
  id: "05",
  add:false,
  name:"#Friends"
}
var s_label_6 = {
  id: "06",
  add:false,
  name:"#Couple"
}
var s_label_7 = {
  id: "07",
  add:false,
  name:"#Family"
}
var s_label_8 = {
  id: "08",
  add:false,
  name:"#Food"
}
var s_label_9 = {
  id: "09",
  add:false,
  name:"#Museum"
}
var s_label_10 = {
  id: "10",
  add:false,
  name:"#Cycling"
}
var s_label_11 = {
  id: "11",
  add:false,
  name:"#Driving"
}
var s_label_12 = {
  id: "12",
  add:false,
  name:"#Diving"
}
var s_label_13 = {
  id: "13",
  add:false,
  name:"#Party"
}
var s_label_14 = {
  id: "14",
  add:false,
  name:"#Picnic"
}
var s_labels = [s_label_0,s_label_1,s_label_2,s_label_3,s_label_4,s_label_5,s_label_6,s_label_7,s_label_8,s_label_9,s_label_10,s_label_11,s_label_12,s_label_13,s_label_14];



/* GET home page. */
router.get('/', function(req, res, next) {
  req.db.collection('tripReview').find().sort({"reviewInfo.count": -1}).toArray(function(err, results){
    function compare(a,b) {
  if (a.reviewInfo.like.length < b.reviewInfo.like.length)
    return 1;
  if (a.reviewInfo.like.length > b.reviewInfo.like.length)
    return -1;
  return 0;
}
function compare_v(a,b) {
if (a.reviewInfo.count < b.reviewInfo.count)
return 1;
if (a.reviewInfo.count > b.reviewInfo.count)
return -1;
return 0;
}
        var result_v;

      console.log("promise" + results)
      var result_v = JSON.parse(JSON.stringify(results));
      console.log("then" + results)
      results.sort(compare);
      result_v.sort(compare_v);

    // var result_v = results;
    // result_v.sort(compare);
    // results.sort(compare);
    res.render('index', {
      user: req.user,
      review: results,
      lab:s_labels,
      review_v:result_v
    });
  });
});

router.post('/s_label_select',function(req,res,next){
  console.log("selected");
  var index = req.body.key;
  s_labels[parseInt(index)].add = true;
  res.status(200).send('success');
});

router.post('/s_label_delete',function(req,res,next){
   var index = req.body.key;
  s_labels[parseInt(index)].add = false;
  res.status(200).send(s_labels);
});
module.exports = router;
