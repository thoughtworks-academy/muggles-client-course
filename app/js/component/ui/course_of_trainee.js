define(function (require) {
    var defineComponent = require('flight/lib/component');
    var templates = require('js/templates'),
        template = templates['trainer/course'];
    var _ = require('lodash/lodash');


    return defineComponent(course);

    function course() {
        this.defaultAttrs({
            app: '#app',
            courseName: '.course_name'
        });

        this.renderCourse = function () {
            var course = this.attr.course;
            var groups = this.groupCheckpoints(this.attr.course.checkpoints);

            var html = template.render({
                groups: groups,
                name: course.name,
                sponsor: course.sponsor,
                trainer: course.trainer
            });

            $('#app').html(html).fadeIn();
            this.on('.checkpoint-item', 'click', this.handleChecked);
            this.select('app').append(html).fadeIn();
        };

        this.handleChecked = function (event) {
            var id = event.target.id;
            var data = event.target.checked;
            var userId = this.attr.traineeId;
            var courseId = this.attr.course._id;

            $.ajax('/api/trainers/users/' + userId + '/course/' + courseId + '/checkpoints/' + id, {
                method: 'patch',
                data: {checked: data}

            }).fail(function () {
                console.log('checkpoint 更新失败');

            }).done(function (data) {
                console.log('checkpoint 更新成功');
            });
        };

        this.groupCheckpoints = function (checkpointList) {
            var self = this;
            var checkpoints = self.addChecked(checkpointList);
            var groupCheckpoints = [];
            var types = _.uniq(_.pluck(checkpoints, 'type'), function (checkpointType) {
                return checkpointType.name;
            });
            _.forEach(types, function (type) {
                groupCheckpoints.push({groupName: type.name, checkpoints: _.where(checkpoints, {type: type})})
            });
            return groupCheckpoints;
        };


        this.addChecked = function (checkpointList) {
            var checkpoints = checkpointList;
            var self = this;
            _.forEach(checkpointList, function (checkpoint) {
                checkpoint.traineeChecked = self.traineeChecked(checkpoint._id);
                checkpoint.trainerChecked = self.trainerChecked(checkpoint._id);
                checkpoint.display = self.display(checkpoint._id);
            });
            return checkpoints;
        };

        this.trainerChecked = function (id) {
            var results = this.attr.data.data.result;
            var checked = false;

            _.forEach(results, function (result) {
                if (result.checkpointId == id) {
                    checked = result.trainerChecked;
                }
            });

            return checked;
        };

        this.traineeChecked = function (id) {
            var results = this.attr.data.data.result;
            var checked = false;

            _.forEach(results, function (result) {
                if (result.checkpointId == id) {
                    checked = result.traineeChecked;
                }
            });

            return checked;
        };

        this.display = function (id) {
            var results = this.attr.data.data.result;
            var display = false;
            _.forEach(results, function (result) {
                if (result.checkpointId == id) {
                    display = result.display;
                }
            });

            return display;
        };

        this.after('initialize', function () {
            this.renderCourse();
        });
    }
});
