
$(function() {
console.log('local.js ready');


$('#search_btn').click(function(e){
    if($("#search_input").val().replace(/^\s+|\s+$/g, "").length == 0) {
      alert("Please input your destination");
      return false;
    }
    var searchKey = $('#search_input').val();
    $.post("/search_result/search", {search: searchKey})
    .done(function(data){
      $.get("/search_result");
      location.replace("/search_result");
    });
});
$('.label_select').click(function(){
  // alert("aaa!");
  var label_id = $(this).attr('id').substring(13);
  $.post("./uploadTrip/label_select",{key: label_id}).done(function(data){
    // location.reload();
    $("#labels").load(location.href +  " #labels ");
  })
});

$('.u_label_select').click(function(){
  // alert("aaa!");
  var label_id = $(this).attr('id').substring(15);
  $.post("./updateReview/label_select",{key: label_id}).done(function(data){
    // location.reload();
    $("#u_labels").load(location.href +  " #u_labels ");
  })
});

$('.s_label_select').click(function(){
  // alert("aaa!");
  var label_id = $(this).attr('id').substring(15);
  $.post("./s_label_select",{key: label_id}).done(function(data){
    // location.reload();
    $("#s_labels").load(location.href +  " #s_labels ");
  })
});



$(document).on("click", ".label_delete", function(){
//  alert("aaa!");
  var label_id = $(this).attr('id').substring(5);
  $.post("./uploadTrip/label_delete",{key: label_id}).done(function(data){
  //  $("#labels").load(location.href);
    $("#labels").load(location.href + " #labels");
  })
});

$(document).on("click", ".u_label_delete", function(){
 // alert("aaa!");
  var label_id = $(this).attr('id').substring(7);
  // alert(label_id)
  $.post("./updateReview/label_delete",{key: label_id}).done(function(data){
    //location.reload();
    $("#u_labels").load(location.href +  " #u_labels ");
  })
});

$(document).on("click", ".s_label_delete", function(){
//  alert("aaa!");
  var label_id = $(this).attr('id').substring(7);
  $.post("./s_label_delete",{key: label_id}).done(function(data){
    $("#s_labels").load(location.href +  " #s_labels ");
  })
});

$(document).on("click", ".image_delete", function(){
   var img_id = $(this).attr('id').substring(10);
   $.post("./updateReview/image_delete",{key: img_id}).done(function(data){
       $("#u_image_gallery").load(location.href + " #u_image_gallery");
   })
});
/*****************************************************/
function search_basic(){
  // alert('search!');
  console.log('search');
}


$("#search_input").keyup(function(event){
    if(event.keyCode == 13){
        $("#search_btn").click();
    }
});

$("#ad_search").click(function(){
  $("#search_advanced").toggle(500);
});

$("#ad_hide").click(function(){
  $("#search_advanced").hide(500);
});
$("#ad_search_button").click(function(){
  var label = [];
    $(".s_label_true").each(function(){
      label.push($(this).text().trim());
    });
      var ad_search_info = {
        locationCountry: $("#s_reviewCountry").val(),
        locationCity: $("#s_reviewCity").val(),
        cost: $("#s_reviewCost").val(),
        mainTrans: $("#s_reviewTrans").val(),
        label: label,
      }
      // alert(ad_search_info.locationCountry);
      ad_search_info = JSON.stringify(ad_search_info);
        if (ad_search_info){
          $.post( "/search_result/advanced_search", {data:ad_search_info})
          .done(function(data){
            $.get("/search_result/advanced_search_result");
            location.replace("/search_result/advanced_search_result");
          });
        }
});


//For pic_slider_gallary
  var container = document.getElementById('container_pic');
  var list = document.getElementById('list_pic');
  var dots = document.getElementById('dots').getElementsByTagName('span');
  var prev = document.getElementById('btn_left');
  var next = document.getElementById('btn_right');
  var card = document.getElementById('description');
  var index = 1;
  var timer;
  var sh1 = document.getElementById('des_1');
  var sh2 = document.getElementById('des_2');
  var sh3 = document.getElementById('des_3');
  var sh4 = document.getElementById('des_4');
  var sh5 = document.getElementById('des_5');
function animate(offset) {
    var newLeft = parseInt(list.style.left) + offset;
    list.style.left = newLeft + 'px';
    //无限滚动判断
    if (newLeft > -750) {
        list.style.left = -3750 + 'px';
    }
    if (newLeft < -3750) {
        list.style.left = -750 + 'px';
    }
}
function play() {
    timer = setInterval(function () {
        next.onclick();
    }, 3000)
}
function stop() {
    clearInterval(timer);
}
function dotsShow() {
    for (var i = 0; i < dots.length; i++) {
        if (dots[i].className == "on") {
            dots[i].className = "";
        }
    }
    //Array from 0, so index-1 at first
    dots[index - 1].className = "on";
    //Show description
    switch (index) {
      case 1:
      sh1.style.display= "block";
      sh2.style.display= "none";
      sh3.style.display= "none";
      sh4.style.display= "none";
      sh5.style.display= "none";
        break;

      case 2:
      sh1.style.display= "none";
      sh2.style.display= "block";
      sh3.style.display= "none";
      sh4.style.display= "none";
      sh5.style.display= "none";
        break;

      case 3:
      sh1.style.display= "none";
      sh2.style.display= "none";
      sh3.style.display= "block";
      sh4.style.display= "none";
      sh5.style.display= "none";
        break;
      case 4:
      sh1.style.display= "none";
      sh2.style.display= "none";
      sh3.style.display= "none";
      sh4.style.display= "block";
      sh5.style.display= "none";
        break;
      case 5:
      sh1.style.display= "none";
      sh2.style.display= "none";
      sh3.style.display= "none";
      sh4.style.display= "none";
      sh5.style.display= "block";
        break;
      }
}

prev.onclick = function () {
    index -= 1;
    if (index < 1) {
        index = 5
    }
    dotsShow();
    animate(750);
};
next.onclick = function () {
    index += 1;
    if (index > 5) {
        index = 1
    }
    animate(-750);
    dotsShow();
};
for (var i = 0; i < dots.length; i++) {
    (function (i) {
        dots[i].onclick = function () {
            var clickIndex = parseInt(this.getAttribute('index'));
            var offset = 750 * (index - clickIndex); 
            animate(offset);
            index = clickIndex;
            dotsShow();
        }
    })(i)
}
 container.onmouseover = stop;
 card.onmouseover = stop;
 card.onmouseout = play;
 container.onmouseout = play;
play();
//End


})
