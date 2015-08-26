var log_in = function() {
    /////////////
    //关注按钮事件绑定 //
    /////////////
    var updateFollow = function() {
        $('follow').style.display = 'none';
        $('followed').style.display = 'block';
    };
    if (!sessionStorage.getItem('loginSuc') || sessionStorage.getItem('loginSuc') != 'true') {
        $('follow').onclick = function() {
            $('login-cover').style.display = 'block';
        };
    } else {
        $('follow').onclick = function() {
            localStorage.setItem('followSuc', 'true');
            updateFollow();
            alert('关注成功！');
        };
        if (localStorage.getItem('followSuc') == 'true') {
            updateFollow();
        }
    }

    $('cancelfollow').onclick = function() {
        localStorage.setItem('followSuc', 'false');
        $('follow').style.display = 'block';
        $('followed').style.display = 'none';
        alert('取消关注。');
    };
    /////////////
    //登陆界面事件绑定 //
    /////////////
    $('closelogin').onclick = function() {
        $('login-cover').style.display = 'none';
    };

    $('confirm').onclick = function() {
        var tag = true;
        var useName = $('useName').value;
        var password = $('password').value;
        if (useName === '') {
            $('noneUseName').style.display = 'block';
            tag = false;
        }
        if (password === '') {
            $('nonepassword').style.display = 'block';
            tag = false;
        }
        if (!tag) {
            alert('请正确填写信息!');
        } else {
            $('noneUseName').style.display = 'none';
            $('nonepassword').style.display = 'none';
            ajax({
                method: 'get',
                url: 'http://study.163.com/webDev/login.htm',
                data: {
                    'userName': md5(useName),
                    'password': md5(password)
                },
                success: function(data) {
                    if (data == 1) {
                        sessionStorage.setItem('loginSuc', 'true');
                        localStorage.setItem('followSuc', 'true');
                        alert('登陆成功!');
                        updateFollow();
                        $('follow').onclick = function() {
                            updateFollow();
                            alert('关注成功！');
                        };
                        $('login-cover').style.display = 'none';
                    } else {
                        alert('账号密码错误，请重新输入！');
                    }
                },
                async: true
            });
        }
    };
};
