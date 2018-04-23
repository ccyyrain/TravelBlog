var express = require('express');
var router = express.Router();
var searchKey;
var ad_searchKey;

router.get('/', function(req, res, next) {
  req.db.collection('tripReview').find({$text:{$search: searchKey,
    $caseSensitive: false,
    $diacriticSensitive: false}}).sort({"reviewInfo.count": -1}).toArray(function(err, results){
    res.render('search_result', {searchResult: results});
  });
});


router.post('/search', function(req, res, next){
  searchKey = req.body.search;
  console.log(searchKey, "yoyoyoyoyoyoyoyoyoyoyo");
  res.status(200).send('success');
})

router.post('/advanced_search', function(req, res, next){
  ad_searchKey = req.body.data;
  ad_searchKey = JSON.parse(ad_searchKey);
  res.status(200).send('success');
})

router.get('/advanced_search_result', function(req, res, next) {
  var flag = 0;
  console.log("label is");
  console.log(ad_searchKey);
    let myPromise = new Promise((resolve,reject) =>{
      if(ad_searchKey.locationCountry){
        ++flag;
      }
      flag = flag<<1;
      if(ad_searchKey.locationCity){
        ++flag;
      }
      flag = flag<<1;
      if(ad_searchKey.cost){
        ++flag;
      }
      flag = flag<<1;
      if(ad_searchKey.mainTrans){
        ++flag;
      }
      flag = flag<<1;
      if(ad_searchKey.label.length!=0){
        ++flag;
      }
      resolve('success');
    });
    myPromise.then((d) => {
      console.log("flag");
      console.log(flag);
      switch(flag){
        case 0b00000:
        {
                  req.db.collection('tripReview').find({
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00001:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00010:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                    }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00011:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00100:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.cost":ad_searchKey.cost
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00101:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00110:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b00111:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01000:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01001:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01010:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01011:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01100:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01101:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01110:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b01111:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10000:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10001:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10010:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                    }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10011:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10100:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.cost":ad_searchKey.cost
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10101:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10110:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b10111:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11000:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11001:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11010:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11011:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11100:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11101:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11110:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
        case 0b11111:
        {
                  req.db.collection('tripReview').find({
                    "reviewInfo.locationCountry":ad_searchKey.locationCountry,
                    "reviewInfo.locationCity":ad_searchKey.locationCity,
                    "reviewInfo.cost":ad_searchKey.cost,
                    "reviewInfo.mainTrans": ad_searchKey.mainTrans,
                    "reviewInfo.label": {$all : ad_searchKey.label}
                  }).sort({"reviewInfo.count": -1}).toArray(function(err, results){
                  res.render('search_result', {searchResult: results});
                });
                break;
        }
      }
    })

});

module.exports = router;
