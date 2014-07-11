/*************************************************
**参考资料：http://www.itxueyuan.org/view/6324.html
**资料仅用来理解，未直接复制粘贴
**所做改进：1. 采用异步刷新访问数据； 2.增加缩略图 3.修改变换方式
**************************************************/

//变量声明与赋值
var url = 'data/news.json';
var imageSpeed = 500,
    titleSpeed = 200,
    imageWidth = 1024,
    maskWidth = 160,
    currentID = Number(localStorage['imgID']) || 0,
    nextID,
    intervalID,
    flag = false,
    intervalTime = 2000,
    pageCurrent = 0;

var headArray, nameArray, reviewArray, timeArray;
var reviewData;

//处理数据
function processData(data) {
  var i = 0;
  //slide中展示的图片
  $('.slideImg').each(function(){
    $(this).attr({"src": data.news[i].img});
    i++;
  });
  //缩略图
  i=0;
  $('.maskImg').each(function(){
    $(this).attr({"src": data.news[i].img});
    i++;
  });

  //右侧插图
  i=0;
  $('.insertImg').each(function(){
    $(this).attr({"src": data.insert[i].img});
    i++;
  });

  //图片标题
  i=0;
  var titleArray = $('#titleBox').children();
  $(titleArray).each(function(){
    titleArray[i].textContent =  data.news[i].title;
    i++;
  });
  
  reviewData = data.review;
  var page = Number(localStorage['pageID']) || 0;
  changeReview(page);
  setReviewCurrent(page);
}

//异步更新评论内容
function changeReview(page){
  //评论中的人物头像
  var i=0;
  $('.headImg').each(function(){
    $(this).attr({"src": reviewData[i+page*5].headImg});
    i++;
  });
  //评论中的人物名称
  i=0;
  var nameArray = $('.name').children();
  $(nameArray).each(function(){
    nameArray[i].textContent =  reviewData[i+page*5].name + "：";
    i++;
  });
  //评论中的时间下标
  i=0;
  var timeArray = $('.time').children();
  $(timeArray).each(function(){
    timeArray[i].textContent =  reviewData[i+page*5].time;
    i++;
  });
  //评论内容
  i=0;
  var reviewArray = $('.reviewContent').children();
  $(reviewArray).each(function(){
    reviewArray[i].textContent =  reviewData[i+page*5].word;
    i++;
  });
}

//改变评论中的current类
function changeReviewCurrent(pageNext){
  var pageArray = $('.num-page');
  switch(pageCurrent){
    case 0: $('#head-page').removeClass("current");
            $('#pre-page').removeClass("current");
            $(pageArray[0]).removeClass("current");
            break;
    case 1: $(pageArray[1]).removeClass("current");
            break;
    case 2: $(pageArray[2]).removeClass("current");
            $('#tail-page').removeClass("current");
            $('#next-page').removeClass("current");
  }

  switch(pageNext){
    case 0: $('#head-page').addClass("current");
            $('#pre-page').addClass("current");
            $(pageArray[0]).addClass("current");
            break;
    case 1: $(pageArray[1]).addClass("current");
            break;
    case 2: $(pageArray[2]).addClass("current");
            $('#next-page').addClass("current");
            $('#tail-page').addClass("current");
            break;
  }

  pageCurrent = pageNext;
  localStorage['pageID'] = pageCurrent;
}

function setReviewCurrent(page){
   var pageArray = $('.num-page');
   switch(page){
    case 0: $('#head-page').addClass("current");
            $('#pre-page').addClass("current");
            $(pageArray[0]).addClass("current");
            break;
    case 1: $(pageArray[1]).addClass("current");
            break;
    case 2: $(pageArray[2]).addClass("current");
            $('#next-page').addClass("current");
            $('#tail-page').addClass("current");
            break;
  }
  pageCurrent = page;
}

//当读取数据成功时，调用processData
function handler() {
  if (this.readyState == this.DONE) {
    if (this.status == 200) {
      try {
        processData(JSON.parse(this.responseText));
      } catch(ex) {console.log(ex.message);}
    }
  }
}

//ajax读取数据
function ajax() {
  var client = new XMLHttpRequest();
  client.onreadystatechange = handler;
  client.open('GET', url);
  client.send();
}

function rotateOnClick(nextID){
   //缩略图交换
  var maskArray = $('#maskBox').children();
  $(maskArray[currentID]).removeClass("current");
  $(maskArray[nextID]).addClass("current");

  //移动变换
  $('#imageBox').animate({left: "-" + nextID*imageWidth+"px"} , imageSpeed); 
  $('#titleBox').animate({left: "-" + nextID*imageWidth+"px"} , imageSpeed); 

  if(nextID > 5){  
    $('#maskBox').animate({left: "-" + (nextID-5)*maskWidth+"px"} , imageSpeed);
  }
  else{
    $('#maskBox').animate({left: "0px"} , imageSpeed);
  }

  //ID交换
  currentID = nextID;
  localStorage['imgID'] = currentID;
}

//设置滚动的函数
function rotate(clickID){

  //case 1: 单击事件后的响应rotate函数
  if(clickID){
    nextID = clickID;
  }

  //自然播放的相应rotate函数
  else{ 
    //添加判断，为了避免到最右端时闪回最左端的不舒服的效果
    if(currentID == 7 && !flag){flag = true;}
    else if(currentID == 0 && flag){flag = false;}

    //根据判断结果，进行决策
    var a = 1;
    if(flag)  a = -1;
    nextID = (currentID+a)%8;
  }

  rotateOnClick(nextID);
}

//在页面加载中调用该函数
$(document).ready(function(){
  ajax();
  intervalID = window.setInterval(rotate, intervalTime);
  rotateOnClick(currentID);

  //单击事件
  var maskArray = $('#maskBox').children();
  $(maskArray).click(function(){
    window.clearInterval(intervalID);
    var clickID = parseInt($(this).attr("rel"))-1;
    rotate(clickID);
    intervalID = window.setInterval(rotate, intervalTime);
  });

  $('#left').click(function(){
    window.clearInterval(intervalID);
    rotateOnClick((currentID+7)%8);
    intervalID = window.setInterval(rotate, intervalTime);
  });

  $('#right').click(function(){
    window.clearInterval(intervalID);
    rotateOnClick((currentID+1)%8);
    intervalID = window.setInterval(rotate, intervalTime);
  });

  //分页部分的单击事件
  $('#head-page').click(function(){
    if(pageCurrent == 0) return;
    changeReview(0);
    changeReviewCurrent(0);
  });

  $('#tail-page').click(function(){
    if(pageCurrent == 2)  return;
    changeReview(2);
    changeReviewCurrent(2);
  });

  $('#pre-page').click(function(){
    if(pageCurrent == 0)  return;
    changeReview(pageCurrent-1);
    changeReviewCurrent(pageCurrent-1);
  });

  $('#next-page').click(function(){
    if(pageCurrent == 2)  return;
    changeReview(pageCurrent+1);
    changeReviewCurrent(pageCurrent+1);
  });

  var numPageArray = $('.num-page');
  numPageArray.click(function(){
    var clickID = parseInt($(this).attr("rel"))-1;
    if(clickID == pageCurrent)  return;
    changeReview(clickID);
    changeReviewCurrent(clickID);
  });

  //设置鼠标悬停
  $( "#imageBox" ).mouseenter(function() {
    $(this).css("cursor", "pointer");
    window.clearInterval(intervalID);
    $('#titleBox').css("opacity", "0.7");
  });
  $( "#imageBox" ).mouseleave(function() {
     $(this).css("cursor", "default");
     intervalID = window.setInterval(rotate, intervalTime);
     $('#titleBox').css("opacity", "0");
  });
  var insertArray = $('.newsSingle').children();
  $(insertArray).mouseenter(function(){
      var num = '#' + $(this).attr("rel");
       $(num).css("background", "yellow");
  });
  $(insertArray).mouseleave(function(){
    var num = '#' + $(this).attr("rel");
    $(num).css("background", "white");
  });
});

//设置一下nav的动画
var strerch = function(){
  var sTop=document.documentElement.scrollTop+document.body.scrollTop;  
  if(sTop > 0){
    $('#nav').removeClass('maximum');
    $('#nav').addClass('minimum');
  }
  else{
    $('#nav').removeClass('minimum');
    $('#nav').addClass('maximum');
  }
}
window.onmousewheel = strerch;




