define(function (require) {
    var defineComponent = require('flight/lib/component');
    var templates = require('js/templates'),
        template = templates['trainer/courses'];

    return defineComponent(stations);

    function stations() {
        this.defaultAttrs({
                'traineesOfCourse': '.traineesOfCourse'
            }
        );

        this.renderStationCourses = function () {
            var courses = this.attr.stationCourses;
            var html = template.render({courses: courses});
            $('#app').html(html).fadeIn();
        };

        this.serveCourseTrainees = function (event) {

            var self = this;
            var id = this.attr.id;
            var courseId = event.target.id;

            $.ajax('/api/trainers/stations/' + id + '/trainees', {
                method: 'get'

            }).fail(function () {
                console.log('获取id为' + id + '的trainees失败');

            }).done(function (data) {
                self.trigger('uiSwitchPage',
                    {
                        name: 'traineesOfCourse',
                        data: {data: data, id: courseId}
                    });
            });
        };


        this.after('initialize', function () {
            this.on(document, 'click',
                {'traineesOfCourse': this.serveCourseTrainees});
            this.renderStationCourses();
        });
    }
});
