// ServiceWorker : https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service_worker.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}
//// ピンチイン禁止
//document.documentElement.addEventListener('touchstart', function (e) {
//    if (e.touches.length >= 2) { e.preventDefault(); }
//}, { passive: false });

//// ダブルタップでズーム禁止
//let t = 0;
//document.documentElement.addEventListener('touchend', function (e) {
//    let now = new Date().getTime();
//    if ((now - t) < 350) {
//        e.preventDefault();
//    }
//    t = now;
//}, false);


/**
 * ログイン処理
 * 
 */
const Login = function (user = null) {

    if (user) {
        localStorage.setItem('cachedUser', user);
    }

    $('#login').addClass('d-none');
    $('#timecard').removeClass('d-none');
};

/** 
 * ログアウト処理
 * 
 */
const Logout = function () {
    localStorage.removeItem('cachedUser');

    $('#login').removeClass('d-none');
    $('#timecard').addClass('d-none');
};

/** 
 * 認証処理（未完）
 * 
 */
const Authentication = function (user, password) {

    const url = 'https://httpbin.org/headers';

    $.ajax({
        url: url,
        type: 'GET'
    }).done((result) => {
        console.log(result);
        Login(user);
    });
};

/** 
 * ログインページ初期処理
 * 
 */
const LoginPageInit = function (user, password) {

    const cachedUser = localStorage.getItem('cachedUser');

    if (cachedUser) {
        Login();
    }
    else {
        Logout();
    }

    $('#loginBtn').on('click', () => {

        const inputUser = $('#user').val();
        const inputPassword = $('#password').val();

        if (!inputUser || !inputPassword) {
            alert('Please input login information.');
            return;
        }

        console.log(inputUser + inputPassword);

        Authentication(inputUser, inputPassword);
    });
};

/** 
 * タイムカードページ初期処理
 * 
 */
const TimeCardPageInit = function () {

    $('#checkInBtn').on('click', () => {

        if (!confirm('It will be checked in.')) return;

        $('#isCheckOut').val('0');
        console.log('isCheckOut:' + $('#isCheckOut').val());

        const url = 'https://httpbin.org/headers';

        $.ajax({
            url: url,
            type: 'GET'
        }).done((result) => {
            $('#calendar').text(JSON.stringify(result));
        });
    });

    $('#checkOutBtn').on('click', () => {
        if (!confirm('It will be checked out.')) return;

        $('#isCheckOut').val('1');
        console.log('isCheckOut:' + $('#isCheckOut').val());

        const url = 'https://httpbin.org/headers';

        $.ajax({
            url: url,
            type: 'GET'
        }).done((result) => {
            $('#calendar').text(JSON.stringify(result));
        });
    });

    $('#registerBtn').on('click', () => {
        console.log('isCheckOut:' + $('#isCheckOut').val());

        const url = 'https://httpbin.org/headers';

        $.ajax({
            url: url,
            type: 'GET'
        }).done((result) => {
            $('#calendar').text(JSON.stringify(result));
        });
    });

    $('#logoutBtn').on('click', () => {
        Logout();
    });
};

/** 
 * OnLoad
 * 
 */
document.addEventListener('DOMContentLoaded', () => {

    LoginPageInit();
    TimeCardPageInit();

}, false);