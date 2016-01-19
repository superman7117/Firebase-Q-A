'use strict'
var ref = new Firebase('https://ozannetest.firebaseio.com/');
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
  var key = snapshot.key();
  var arrayItems = [];
  var outer = $('<div>').addClass('outer').attr('data-key',key)
  var itemTitle = $('<h1>').addClass('itemTitle').append(data.itemName)
  if (data.imgURL !== '' ){
    var picUrl = $('<div>').addClass('picUrl').css({'background-image': 'url('+data.imgUrl+')', 'background-position': 'center', 'background-size': 'cover'})
  }
  else{
    var picUrl = $('<div>').addClass('picUrl').css({'background-image': 'url("http://pngimg.com/upload/juice_PNG7182.png")', 'background-position': 'center', 'background-size': 'cover'})
  }
  var time = $('<h3>').addClass('time').append(data.timeStart);
  var descript = $('<div>').addClass('discript').append(data.description);
  arrayItems.push(outer.append(itemTitle).append(picUrl).append(time).append(descript));
  $('thingsPlace')
})
//on children change





})
