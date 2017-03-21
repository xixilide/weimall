/*
(function () {
      document.addEventListener('DOMContentLoaded', function () {
          var html = document.documentElement;
          var windowWidth = html.clientWidth;
//			html.style.fontSize = windowWidth / 6.4 + 'px';
          html.style.fontSize =16 * (windowWidth / 750)+ 'px';
      }, false);
})();
*/



//屏幕适配
var pmspgn = function(){
    var fontSize = 32; //pc-32
    var elm = document.documentElement;

    if(elm.clientWidth < 750){
        elm.style.fontSize = fontSize * (elm.clientWidth/750) + 'px';
    }

};

//调用 屏幕适配
pmspgn();
