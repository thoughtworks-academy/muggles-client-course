define(function (require) {

    'use strict';
    var SwitchPage = require('component/ui/switch_page');
    var Authenticate = require('component/data/authenticate_user');

    var LoginView = require('component/ui/login_view');
    var LoginData = require('component/data/login_data');

    var SignUpView = require('component/ui/signup_view');
    var SignUpData = require('component/data/signup_data');

    return initialize;

    function initialize() {
        LoginView.attachTo('#app');

        SwitchPage.attachTo(document);
        Authenticate.attachTo(document);

        LoginData.attachTo(document);

        SignUpView.attachTo('.js-signup');
        SignUpData.attachTo(document);
    }
});
