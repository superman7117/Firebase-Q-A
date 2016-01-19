'use strict'
var ref = new Firebase('https://ozannetest.firebaseio.com/');
var theKey;
$(document).ready(function(){

$('#submit').on('click', createProduct)
function createProduct(e){
  //send info to firebase
  e.preventDefault
  var email = $('#email').val();
  var password = $('#password').val();
  var itemName = $('#itemName').val();
  var description = $('#description').val();
  var imgUrl = $('#imgURL').val();
  var timeStart = moment().format('LLLL');
  ref.push({
    email: email,
    password: password,
    itemName: itemName,
    description: description,
    imgUrl: imgUrl,
    timeStart: timeStart
  })
// $('#formFill')[0].reset();
}

ref.on('child_added',function(snap){
  var data = snap.val();
  var key = snap.key();
  var arrayItems = [];
  var outer = $('<div>').addClass('outer').attr('data-key',key)
  var itemTitle = $('<h3>').addClass('itemTitle').append(data.itemName)
  if (data.imgUrl !== '' ){
    var picUrl = $('<div>').addClass('picUrl').css({'background-image': 'url('+data.imgUrl+')', 'background-position': 'center', 'background-size': 'cover'})
  }
  else{
    var picUrl = $('<div>').addClass('picUrl').css({'background-image': 'url("http://pngimg.com/upload/juice_PNG7182.png")', 'background-position': 'center', 'background-size': 'cover'})
  }
  var time = $('<div>').addClass('time').append(data.timeStart);
  var descript = $('<div>').addClass('discript').append(data.description);
  var comEdit = $('<button>').addClass('comEdit').text('Edit or Comment');
  arrayItems.push(outer.append(itemTitle).append(picUrl).append(time).append(descript).append(comEdit));
  $('#thingsPlace').append(arrayItems);
})
//on children change
$('#thingsPlace').on('click', '.comEdit', commentOrEdit)

function commentOrEdit(){
  theKey = $(this).closest('.outer').attr('data-key')
  $('<div>').addClass('comEditForm').appendTo('body');
  $('<div>').addClass('explination').text('Comment below and hit submit to continue.').appendTo('.comEditForm');
  $('<textarea>').addClass('comment').appendTo('.comEditForm');
  $('<button>').addClass('comSubmit').text('Submit Your Comment').appendTo('.comEditForm');
}
$('body').on('click', '.comSubmit', applyComment);

function applyComment(){
  var comment = $('.comment').val();
  var commentTime = moment().format('LLLL');
  var childRef = ref.child(theKey)
  childRef.push({
    comments: {
      comment: comment,
      commentTime: commentTime
    }
  })
$(".comEditForm").remove();
}
ref.on('value',function(snap){
  var data = snap.val();
  var key = snap.key();
  var arrayComments = [];
  // var forE = snap.forEach(function(childData){
  //   var forEE = snap.forEach(function(childchildData){
  //   var forEE = snap.forEach(function(childchildchildData){
  //     console.log(childchildchildData)
  //   })
  //   })
  //
  // })
  console.log(key.a);
  var commentDiv = $('<div>').addClass('commentDiv').attr('data-key',key);
  var commentTitle = $('<h3>').addClass('commentTitle').append(data.comment);
  var commentT = $('<div>').addClass('commentT').append(data.commentTime);
  arrayComments.push(commentDiv.append(commentTitle).append(commentT));
  $('#thingsPlace').append(arrayComments);
})

// if (childData.length === 20){
// console.log(childData)
// if (childData.length === 20){
//   console.log(childData.comments)
// }
// }

})
