/////////////
//全局属性     //
////////// //

// 记录当前课程列表类型
var tabTag = 10;

//////////
//通知栏相关 //
//////////
/**
 * 通过localStorage去控制通知栏的显示
 * @return {[type]}  [description]
 */
var notice = (function() {
    if (!localStorage.getItem('closeNotice') || localStorage.getItem('closeNotice') != 'true') {
        $('notice').style.display = 'block';
    }
    $('closenotice').onclick = function() {
        $('notice').style.display = 'none';
        localStorage.setItem('closeNotice', 'true');
    };
})();


///////////
//视频播放相关 //
///////////
/**
 * [显示视频播放浮层]
 * @return {[type]}   [description]
 */
var video = (function() {
    $('start-video').onclick = function() {
        // 判断浏览器版本
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
            alert('您的浏览器版本过低，无法播放此视频！请更换浏览器后再试。');
        } else {
            $('video-cover').style.display = 'block';
        }
    };
    $('closevideo').onclick = function() {
        var video = getTag($('video-cover'), 'video')[0];
        video.pause();
        $('video-cover').style.display = 'none';
    };
})();

/////////
//登陆相关 //
/////////
log_in();

///////////
//轮播图相关  //
///////////
banner();

///////////
//课程列表相关 //
///////////
showCourseList(1, 10);

CourseTabClick();

pageClick();

///////////
//热门排行相关 //
///////////
showHotList();
