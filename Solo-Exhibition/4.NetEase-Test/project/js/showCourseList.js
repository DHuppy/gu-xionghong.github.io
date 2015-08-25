///////////
//课程列表相关 //
///////////

/**
 * [showCourseList 课程列表刷新函数]
 * @param  {Int} pageNo 当前页码
 * @param  {Int} type   课程类型 10or20
 * @return {[type]}        [description]
 */
var showCourseList = function(pageNo, type) {
    ajax({
        method: 'get',
        url: 'http://study.163.com/webDev/couresByCategory.htm',
        data: {
            'pageNo': pageNo,
            'psize': 20,
            'type': type
        },
        success: function(data) {
            var courselistHTML = '';
            $('course-list').innerHTML = courselistHTML;
            var _data = JSON.parse(data);
            var num = _data.list.length;
            if (num <= 20) {
                for (var i = 0; i < num; i++) {
                    courselistHTML += '<li class="course" id = "' + _data.list[i].id + '"><img title="' + _data.list[i].name + '" src="' + _data.list[i].middlePhotoUrl + '" alt="网易教育产品部" class="photo course-photo"><h3 class="course-name">' + _data.list[i].name + '</h3><h4 class="provider">' + _data.list[i].provider + '</h4><span class="learnerCount course-learnerCount">' + _data.list[i].learnerCount + '</span><span class="price">￥' + _data.list[i].price + '</span><div class="detail"><a href="https://github.com/Gxh-beGreat"><img title="' + _data.list[i].name + '" src="' + _data.list[i].middlePhotoUrl + '" alt="网易教育产品部" class="photo detail-photo"></a><h3 class="detail-name">' + _data.list[i].name + '</h3><span class="learnerCount detaillearnerCount">' + _data.list[i].learnerCount + '人在学</span><p class="detail-provider">发布者：' + _data.list[i].provider + '</p><p class="categoryName">分类：' + _data.list[i].categoryName + '</p><div><p class="detail-description" title=' + _data.list[i].description + '>' + _data.list[i].description + '</p></div></div></li>';
                }
            } else {
                alert('服务器发生异常!');
            }

            $('course-list').innerHTML = courselistHTML;
        },
        async: true
    });
};

/**
 * [CourseTabClick 绑定tab点击事件]
 */
var CourseTabClick = function() {
    var tab = $('course-tab');
    var list = getTag($('page-list'), 'li');
    delegateEvent(tab, 'h2', function(target) {
        if (target.className == 'click') {
            return;
        } else if (target.id == 'product') {
            tabTag = 10;
            clearClassName(list, 'page-clicked');
            list[0].className = 'page-clicked';
            showCourseList(1, tabTag);
            $('language').className = '';
            target.className = 'click';
        } else {
            tabTag = 20;
            clearClassName(list, 'page-clicked');
            list[0].className = 'page-clicked';
            showCourseList(1, tabTag);
            $('product').className = '';
            target.className = 'click';
        }
    });
};

/**
 * [pageClick 绑定页码点击事件]
 * @return {[type]} [description]
 */
var pageClick = function() {
    var ul = $('page-list');
    var list = getTag(ul, 'li');
    var prev = $('page-prev');
    var next = $('page-next');
    var pageChange = function(ele) {
        ele.className = 'page-clicked';
        showCourseList(ele.id, tabTag);
    };

    delegateEvent(ul, 'li', function(target) {
        if (target.className == 'page-clicked') {
            return;
        } else {
            clearClassName(list, 'page-clicked');
            pageChange(target);
        }
    });

    prev.onclick = function() {
        var pageIndex = clearClassName(list, 'page-clicked');
        if (pageIndex == 1) {
            list[0].className = 'page-clicked';
            return;
        } else {
            pageChange(list[pageIndex-2]);
        }
    };

    next.onclick = function() {
        var pageIndex = clearClassName(list, 'page-clicked');
        if (pageIndex == 4) {
            list[3].className = 'page-clicked';
            return;
        } else {
            pageChange(list[pageIndex]);
        }
    };
};
