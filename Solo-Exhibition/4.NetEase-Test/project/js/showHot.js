///////////
//最热排行相关 //
/////////////

/**
 * [showHotList 展示最热排行列表]
 * @return {[type]} [description]
 */
var showHotList = function() {
    ajax({
        method: 'get',
        url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
        data: {},
        success: function(data) {
            var index = 9;
            var hotlistHTML = '';
            $('ranking-list').innerHTML = hotlistHTML;
            var _data = JSON.parse(data);
            var num = _data.length;
            if (num <= 20 && num >= 10) {
                for (var i = 0; i < 10; i++) {
                    hotlistHTML += '<li courseId=' + _data[i].id + '><a href="https://github.com/Gxh-beGreat" target="_blank"><img title="' + _data[i].name + '" src="' + _data[i].smallPhotoUrl + '" alt="网易教育产品部"></a><!-- 添加一个容器固定大小来解决中文版chrome下不兼容12px以下字体的设置--><div><h3>' + _data[i].name + '</h3></div><div><span class="learnerCount hot-learnerCount">' + _data[i].learnerCount + '</span></div></li>';
                }
            } else {
                alert('服务器发生异常!');
            }
            $('ranking-list').innerHTML = hotlistHTML;

            ////////////
            //滚动播放定时器 //
            ////////////
            var updateHot = function() {
                updateHotList(index, _data);
                index++;
                if (index == num) {
                    index = 0;
                }
            };
            var hotInterval = setInterval(updateHot, 5000);
            //绑定mouseover事件
            $('ranking-list').onmouseover = function() {
                clearInterval(hotInterval);
            };

            //绑定mouseout事件
            $('ranking-list').onmouseout = function() {
                hotInterval = setInterval(updateHot, 5000);
            };
        },
        async: true
    });
};

/**
 * [updateHotList 刷新热门列表（去除第一个元素，在最后面添加新的元素）]
 * @param  {Int} index 当前列表最后一个元素索引位置
 * @param  {Object} data  从后台接收的json数据
 * @return {[type]}       [description]
 */
var updateHotList = function(index, data) {
    var ele = $('ranking-list');
    ele.removeChild(ele.childNodes[0]);
    var li = document.createElement("li");
    li.setAttribute('courseId', data[index].id);
    li.innerHTML = '<a href="https://github.com/Gxh-beGreat" target="_blank"><img title="' + data[index].name + '" src="' + data[index].smallPhotoUrl + '" alt="网易教育产品部"></a><!-- 添加一个容器固定大小来解决中文版chrome下不兼容12px以下字体的设置--><div><h3>' + data[index].name + '</h3></div><div><span class="learnerCount hot-learnerCount">' + data[index].learnerCount + '</span></div>';
    ele.appendChild(li);
};
