var test_cost = "$500-$1000";
var image_array = [];
$(function() {
    $("#postReview").click(function(){
      /************/
      var fd = new FormData();
      $.each($('#theinputfield')[0].files, function(key,value){
        fd.append('ajaxfile',value);
      });
      $.ajax({
        url: '/uploadTrip/uploadReview',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(res) {
          var label = [];
          $(".label_true").each(function(){
            label.push($(this).text().trim());
          })
          var likeId = [];
          var newTask = {
            title: $("#reviewTitle").val(),
            locationCountry: $("#reviewCountry").val(),
            locationCity: $("#reviewCity").val(),
            starttime: $("#startDate").val(),
            endtime: $("#endDate").val(),
            cost: $("#reviewCost").val(),
            mainTrans: $("#reviewTrans").val(),
            label: label,
            text: $("#reviewText").val(),
            pic: res.fileId,
            count: 0,
            like:likeId
          }
          newTask = JSON.stringify(newTask);

          if (newTask){
            $.post( "/uploadTrip/postReview", {data: newTask})
            .done(function( data ) {
              location.replace("/");
            });
          }
        }
      });
    });


    $(document).on("click", ".image_delete", function(){
       var img_id = $(this).attr('id').substring(10);
       $.post("./updateReview/image_delete",{key: img_id}).done(function(data){
           $("#u_image_gallery").load(location.href + " #u_image_gallery");
       })
    });

    $('#updateReview').click(function(){
      var fd = new FormData();

      $.each($('#u_theinputfield')[0].files, function(key,value){
        fd.append('ajaxfile',value);
      });
      $.ajax({
        url: '/updateReview/uploadReview',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(res) {
          var label = [];
          var myPromise = new Promise(function(resolve,reject){
            $(".u_label_true").each(function(){
              label.push($(this).text().trim());
            });
                resolve('success');
          })

                  myPromise.then((d) =>{
          var newTask = {
            title: $("#u_reviewTitle").val(),
            locationCountry: $("#u_reviewCountry").val(),
            locationCity: $("#u_reviewCity").val(),
            starttime: $("#u_startDate").val(),
            endtime: $("#u_endDate").val(),
            cost: $("#u_reviewCost").val(),
            mainTrans: $("#u_reviewTrans").val(),
            label: label,
            text: $("#u_reviewText").val(),
            pic:res.fileId
            }
            newTask = JSON.stringify(newTask);
            if (newTask){
              $.post( "/updateReview/updateNew", {data:newTask})
              .done(function( data ) {
                location.replace("/myBlog");
              });
            }
            })

          }
          });

          });

    $('.likeBtn').click(function(){
      var taskid = $(this).attr('id').substring(5);
      var likeId = $(this).attr('id');
      $.post( "/updateReview/like", { id: taskid })
      .done(function( data ) {
          document.getElementById(likeId).innerHTML="liked";

      });
    });

    $('.unlikeBtn').click(function(){
      var taskid = $(this).attr('id').substring(7);
      var unlikeId = $(this).attr('id');
      $.post( "/updateReview/unlike", { id: taskid })
      .done(function( data ) {
          document.getElementById(unlikeId).innerHTML="like";

      });
    });

    $('.deleteBtn').click(function(){
      var taskid = $(this).attr('id').substring(5);
      $.post( "/updateReview/delete", { id: taskid })
      .done(function( data ) {
          $.get("/updateReview");
          location.replace("/myBlog");
      });
    });

    $('.editBtn').click(function(){
      var taskid = $(this).attr('id').substring(5);
      $.post( "/updateReview/getOld", { id: taskid })
      .done(function( data ) {
          $.get("/updateReview").done(function(d){
            location.replace("/updateReview");
            image_array = data.data;
          })
      });
    });

    $('.indexPost').click(function(){
        var taskid = $(this).attr('id').substring(5);
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });

    $('.upperImage5').click(function(){
        var taskid = $('.upperImage5').attr('id');
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });

    $('.upperImage1').click(function(){
        var taskid = $('.upperImage1').attr('id');
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });

    $('.upperImage2').click(function(){
        var taskid = $('.upperImage2').attr('id');
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });

    $('.upperImage3').click(function(){
        var taskid = $('.upperImage3').attr('id');
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });

    $('.upperImage4').click(function(){
        var taskid = $('.upperImage4').attr('id');
        $.post( "/viewTrip/view", { id: taskid })
        .done(function( data ) {
            $.get("/viewTrip").done(function(data){
              $.get("/viewTrip/updateCount");
              location.replace("/viewTrip");
            });
        });
    });
});
