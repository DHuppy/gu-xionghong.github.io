define([], function() {
  var touch = function(element) {
    var self = this;
    var ele = element;

    //手指按下的处理时间 
    var startHandler = function(evt) {

      //记录刚刚开始按下的时间，*1是为了获得时间戳，让其转为为number
      self.startTime = new Date() * 1;

      //记录手指按下的坐标
      self.startX = evt.touches[0].pageX;

      //清除偏移量
      self.offsetX = 0;

      //事件对象
      var target = evt.target;
      while (target.nodeName != 'LI' && target.nodeName != 'BODY') {
        target = target.parentNode;
      }
      self.target = target;
    };

    //手指移动的处理事件
    var moveHandler = function(evt) {
      evt.preventDefault();

      self.offsetX = evt.targetTouches[0].pageX - self.startX;

      ele.style.webkitTransition = '-webkit-transform 0s ease-out';
      ele.style.webkitTransform = 'translate3d(' + self.offsetX + 'px, 0, 0)';
    };

    var endHandler = function(evt) {
      evt.preventDefault();

      var boundary = 60;

      var endTime = new Date() * 1;

      if (endTime - self.startTime > 300) {
        if (self.offsetX < -boundary) {
          ele.style.webkitTransition = '-webkit-transform 0.2s ease-out';
          ele.style.webkitTransform = 'translate3d(-7rem, 0, 0)';
        } else {
          ele.style.webkitTransition = '-webkit-transform 0.2s ease-out';
          ele.style.webkitTransform = 'translate3d(0, 0, 0)';
        }
      } else {
        //优化
        //快速移动也能使得翻页
        if (self.offsetX < -50) {
          ele.style.webkitTransition = '-webkit-transform 0.2s ease-out';
          ele.style.webkitTransform = 'translate3d(-7rem, 0, 0)';
        } else {
          ele.style.webkitTransition = '-webkit-transform 0.2s ease-out';
          ele.style.webkitTransform = 'translate3d(0, 0, 0)';
        }
      }
    };

    ele.addEventListener('touchstart', startHandler);
    ele.addEventListener('touchmove', moveHandler);
    ele.addEventListener('touchend', endHandler);
  };

  return {
    touch: touch,
  };
});