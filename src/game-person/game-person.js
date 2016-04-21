angular.module('App.GamePerson', []).controller('App.GamePerson.Controller', [
    '$scope',
    '$sce',
    '$state',
    'Event',
    '$timeout',
    function ($scope,
              $sce,
              $state,
              Event,
              $timeout) {
        $scope.$state = $state;
        $scope.sub_ing = false;

        // $scope.event_declaration = Event.getEventDeclaration({
        //     id: $state.params.event_id
        // })

        // $scope.trustAsHtml = function(contents){
        //     return $sce.trustAsHtml(contents)
        // }

        var init_uploader = function(){
            var pickers = $("div[id^=picker_]");
            $.each(pickers, function(i, picker){
                var picker_id = $(picker).attr("id");
                var uploader_name = picker_id.split("_")[1];

                $scope['upload_state_' + i] = "pending";

                $scope['uploader_' + i] = WebUploader.create({
                    // swf文件路径
                    swf: config.API_ROOT + '/wap/webuploader/Uploader.swf',
                    // 文件接收服务端。
                    server: config.API_ROOT + '/api/v1/match/event/person_sign/uploadfile',
                    // 选择文件的按钮。可选。
                    // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                    pick: '#' + picker_id,
                    // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
                    resize: false,

                    // 解决android 4+ bug
                    sendAsBinary: true,

                    fileNumLimit: 1
                });

                // 当有文件被添加进队列的时候
                $scope['uploader_' + i].on('fileQueued', function (file) {
                    // $scope.uploader.fileSingleSizeLimit
                    var $list = $("#thelist_" + uploader_name);
                    $list.append('<div id="' + file.id + '" class="item">' +
                    '<h4 class="info">' + file.name + '</h4>' +
                    '<p class="state">等待上传...</p>' +
                    '</div>');
                });

                // 文件上传过程中创建进度条实时显示。
                $scope['uploader_' + i].on('uploadProgress', function (file, percentage) {
                    var $li = $('#' + file.id),
                        $percent = $li.find('.progress .progress-bar');

                    // 避免重复创建
                    if (!$percent.length) {
                        $percent = $('<div class="progress progress-striped active">' +
                        '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                        '</div>' +
                        '</div>').appendTo($li).find('.progress-bar');
                    }

                    $li.find('p.state').text('上传中');

                    $percent.css('width', percentage * 100 + '%');
                });

                $scope['uploader_' + i].on('uploadSuccess', function (file, resp) {
                    $("input[data-upload-for]").val(resp.file_path);
                    console.log($("input[data-upload-for]").val());
                    $('#' + file.id).find('p.state').text('已上传');
                });

                $scope['uploader_' + i].on('uploadError', function (file) {
                    $('#' + file.id).find('p.state').text('上传出错');
                });

                $scope['uploader_' + i].on('uploadComplete', function (file) {
                    $('#' + file.id).find('.progress').fadeOut();
                });

                $scope["btnStartUpload_" + i] = $('#btnStartUpload_' + uploader_name);
                $scope["btnStartUpload_" + i].on('click', function () {
                    if ($scope["upload_state_" + i] === 'uploading') {
                        $scope['uploader_' + i].stop();
                    } else {
                        $scope['uploader_' + i].upload();
                    }
                });
            });

            //if ($("#picker")) {
            //    $scope.upload_state = "pending";
            //
            //
            //}
        };

        $scope.questions = Event.getPersonSignForm({
            id: $state.params.event_id
        });

        $scope.questions.$promise.then(function (questions) {
            questions.forEach(function (question) {
                question.html = $sce.trustAsHtml(question.field)
            });

            $timeout(function () {
                init_uploader();
                $('#id_nationality').change(function () {
                    var national_id = $('#id_nationality').val();
                    console.log(national_id);
                    $.ajax({
                        url: config.API_ROOT + "/api/v1/core/get_province?national_id=" + national_id,
                        type: "get",
                        success: function (data) {
                            data.details.forEach(function (province) {
                                $("#id_province").append('<option value="' + province.id + '">' + province.value + '</option>')
                            })
                        },
                        error: function (respon) {
                            debugger
                        }
                    })
                });

                $('#id_province').change(function () {
                    var id_province = $('#id_province').val();
                    $("#id_city").html('');
                    $.ajax({
                        url: config.API_ROOT + "/api/v1/core/get_province?province_id=" + id_province,
                        type: "get",
                        success: function (data) {
                            data.details.forEach(function (city) {
                                $("#id_city").append('<option value="' + city.id + '">' + city.value + '</option>')
                            })
                        },
                        error: function (respon) {
                            debugger
                        }
                    })
                })
            })
        });

        $scope.trustAsHtml = function (string) {
            return $sce.trustAsHtml(string)
        };

        $scope.trustAsHtmlaaa = function (text) {
            return $sce.trustAsHtml(text)
        };

        $scope.checkForm = function () {
            var checkAllInput = function (els) {
                var ret = true,
                    msg = '请完善所有带 * 的资料';
                $.each(els, function (i, el) {
                    var elVal = $(el).val();
                    if (elVal == '') {
                        alert(msg);
                        ret = false;
                        return false;
                    }
                });
                return ret
            };
            var elements = $("input[class*='required'], select[class*='required']");
            return checkAllInput(elements);
        };

        $scope.goGamePackage = function ($event) {
            $event.stopPropagation();
            $event.preventDefault();
            $scope.sub_ing = true;

            //表单是否完整
            var form_flag = true;
            if (!$scope.checkForm()) {
                form_flag = false;
                $scope.sub_ing = false;
            }

            if (form_flag) {
                var data = {};
                for (var i = 0; i < $scope.questions.length; i++) {
                    var question = $scope.questions[i];
                    data[question.name] = $('#id_' + question.name).val();
                }
                data['product_id'] = $("#productId").val();

                Event.postPersonSignForm({
                    id: $state.params.event_id
                }, data).$promise.then(function (reps) {
                        if (reps.is_pre_sign) {
                            $state.go('user-enroll');
                        } else {
                            $state.go('game-person-sign-detail', {
                                person_sign_id: reps.person_sign_id
                            });
                            $scope.sub_ing = false;
                        }
                    }, function (error) {
                        alert(error.data.detail);
                        $scope.sub_ing = false;
                    });
            }
        };
    }
]);