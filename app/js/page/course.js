define(function (require) {
    'use strict';

    var templates = require('js/templates'),
        template = templates['course'].render(),
        CourseView = require('component/ui/course_view');

    return initialize;

    function initialize() {
        $('#app').fadeOut(function() {
            CourseView.attachTo('#app');
        });
    }
});