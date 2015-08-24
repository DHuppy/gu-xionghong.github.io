////////////
//DOM操作相关 //
////////////

/**
 * [$ 获取指定id的元素对象]
 * @param  {String} id 指定ID
 * @return {Object}    元素对象
 */
var $ = function(id){
	var ele = document.getElementById(id);
	return ele;
};

/**
 * [getTag 返回指定元素下的指定标签元素]
 * @param  {Object} ele     元素对象
 * @param  {String} TagName 标签名称
 * @return {Collecton}         标签对象集合
 */
var getTag = function(ele,TagName){
	var eles = ele.getElementsByTagName(TagName);
	return eles;
};


///////////
//数据交互相关 //
///////////

/**
 * [ajax 自定义ajax函数]
 * @param  {Object} obj 一个含有ajax需要的基本数据的对象
 * @return {[type]}     [description]
 */
var ajax = function(obj) {
    ////////////////////////
    // 创建XMLHttpRequest对象 //
    ////////////////////////
    var xhr = (function() {
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest(); // IE7+,Firefox,Chrome,Opera,Safari...
        } else {
            return new ActiveXObject('Microsoft.XMLHTTP'); //IE6,IE5
        }
    })();

    /////////////////////
    // 给url加入当时时间，防止缓存 //
    /////////////////////
    var date = new Date().getTime();
    obj.url = obj.url + '?date=' + date;

    /////////////
    // 请求参数格式化 //
    /////////////
    obj.data = (function(data) {
        var arr = [];
        for (var i in data) {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        return arr.join('&');
    })(obj.data);

    //////////////////////////////////
    //onreadystatechange阶段 //
    //////////////////////////////////

    //将参数导入url内
    if (obj.method.toLowerCase() === 'get') {
        // 查找url里面是否已经存在问号
        obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
    }
    if (obj.async === true) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                callback(); // 回调
            }
        };
    }

    ////////////////
    //open,send阶段 //
    ////////////////
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        // 添加HTTP头信息
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);
    } else {
        xhr.send(null);
    }

    /////////
    //同步加载 //
    /////////
    if (obj.async === false) {
        //不用进行readyState参数判断是因为同步情况下只有在接收到服务器响应时进程才会继续
        callback(); // 回调
    }


    ////////////////
    // 定义回调函数 //
    ////////////////
    var callback = function() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText); //回调传递参数
        } else {
            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
        }
    };
};


