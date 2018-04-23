var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.user){
  var postUser = req.user.displayName;
  req.db.collection('tripReview').find({"reviewInfo.like": postUser}).sort({"reviewInfo.count": -1}).toArray(function(err, results){
    res.render('myCollection', {
      user: req.user,
      review: results
    });
  });
}
else{
  res.redirect("/login");
}
});

module.exports = router;
