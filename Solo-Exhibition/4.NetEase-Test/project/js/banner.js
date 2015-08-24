var banner = function() {
    /////////
    //获取元素 //
    /////////
    var container = $('banner-container');
    var imgs = getTag($('banner-list'), 'a');
    var buttons = getTag($('banner-buttons'), 'span');
    var prev = $('banner-prev');
    var next = $('banner-next');
    //小圆点索引值
    var index = 1;
    var animated = false;
    var timer;

    ///////
    //动画 //
    ///////
    var animate = function(index) {
        animated = true;
        var imgIndex;
        var img = imgs[index - 1];
        var time = 500; //淡出总时间
        var interval = 10; //淡出间隔时间
        var speed = 1 / (time / interval); //每次opacity变化率
        var fadeinOpacity = 0; //设置淡入初始值
        var fadeoutOpacity = 1; //设置淡出初始值
        for (var i = 0; i < imgs.length; i++) {
            if (imgs[i].style.opacity == 1) {
                imgIndex = imgs[i];
            }
        }

        var go = function() {
            if (img.style.opacity < 1 && imgIndex.style.opacity > 0) {
                //淡入opacity变化
                fadeinOpacity += speed;
                img.style.display = 'block';
                img.style.opacity = fadeinOpacity;
                img.style.MozOpacity = fadeinOpacity;
                img.style.KhtmlOpacity = fadeinOpacity;
                img.style.filter = 'alpha(opacity=' + fadeinOpacity * 100 + ')';
                //淡出opacity变化
                fadeoutOpacity -= speed;
                imgIndex.style.opacity = fadeoutOpacity;
                imgIndex.style.MozOpacity = fadeoutOpacity;
                imgIndex.style.KhtmlOpacity = fadeoutOpacity;
                imgIndex.style.filter = 'alpha(opacity=' + fadeoutOpacity * 100 + ')';
                setTimeout(go, interval);
            } else {
                fadeinOpacity = 0;
                fadeoutOpacity = 1;
                img.style.opacity = 1;
                imgIndex.style.opacity = 0;
                imgIndex.style.display = 'none';
                animated = false;
            }
        };
        go();
    };

    ///////////
    //圆点状态控制 //
    ///////////
    var showButton = function() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].className == 'on') {
                buttons[i].className = '';
            }
        }
        buttons[index - 1].className = 'on';
    };


    ////////////
    //切换定时器 //
    ////////////
    var start = function() {
        timer = setInterval(function() {
            next.onclick();
        }, 5000);
    };

    var stop = function() {
        clearInterval(timer);
    };

    /////////
    //事件绑定 //
    /////////
    start();
    container.onmouseover = stop;
    container.onmouseout = start;

    next.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 3) {
            index = 1;
        } else {
            index++;
        }
        animate(index);
        showButton();
    };

    prev.onclick = function() {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = 3;
        } else {
            index--;
        }
        animate(index);
        showButton();
    };

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            if (this.className == 'on' || animated) {
                return;
            }
            index = parseInt(this.getAttribute('index'));
            animate(index);
            showButton();
        };
    }
};
