cameraIonActionSheet = {
    transitionEndEvent: 'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd',

    show: function (options) {
        this.template = Template.cameraIonActionSheet;

        var buttons = [];
        for (var i = 0; i < options.buttons.length; i++) {
            var button = options.buttons[i];
            buttons.push({
                text: button.text,
                index: i
            });
        }

        var data = {
            titleText: options.titleText,
            destructiveText: options.destructiveText,
            cancelText: options.cancelText,
            buttons: buttons
        };

        this.callbacks = {
            cancel: options.cancel,
            destructiveButtonClicked: options.destructiveButtonClicked,
            buttonClicked: options.buttonClicked
        };

        this.view = Blaze.renderWithData(this.template, data, $('.ionic-body').get(0));
        $('body').addClass('action-sheet-open');

        var $backdrop = $(this.view.firstNode());
        $backdrop.addClass('active');

        var $wrapper = $backdrop.find('.action-sheet-wrapper');
        Meteor.setTimeout(function () {
            $wrapper.addClass('action-sheet-up');
        }, 20);
    },

    cancel: function () {
        this.close(this.callbacks.cancel);
    },

    buttonClicked: function (index) {
        var callback = this.callbacks.buttonClicked;
        if (callback(index) === true) {
            cameraIonActionSheet.close();
        }
    },

    destructiveButtonClicked: function () {
        var callback = this.callbacks.destructiveButtonClicked;
        if (callback() === true) {
            cameraIonActionSheet.close();
        }
    },

    close: function (callback) {
        var $backdrop = $(this.view.firstNode());
        $backdrop.removeClass('active');

        var $wrapper = $backdrop.find('.action-sheet-wrapper');
        Meteor.setTimeout(function() {
            $wrapper.removeClass('action-sheet-up');
        }.bind(this), 10);

        $wrapper.on(this.transitionEndEvent, function () {
            $('body').removeClass('action-sheet-open');
            Blaze.remove(this.view);

            if (typeof(callback) === 'function') {
                callback();
            }
        }.bind(this));
    }
};

Template.cameraIonActionSheet.rendered = function () {
    $(window).on('keyup.cameraIonActionSheet', function(event) {
        if (event.which == 27) {
            cameraIonActionSheet.cancel();
        }
    });

    $("#itrydo-selPics-cameraIonActionSheet").unbind('change').bind('change',function(){
        //ItrydoAliYunOSS.upload_more(this.files);
        loadImage(this.files,function(one_image_base64){
            var pics = Session.get('cameraIonActionSheet.selPics');
            pics.push(one_image_base64);
            Session.set('cameraIonActionSheet.selPics',pics);
        });
        //隐藏input文件
        $('[data-cancel]').click();
    });

    //获取相机图片
    function loadImage(srcs,callBack){
        // 过滤掉 非 image 类型的文件
        for(var i = 0; i < srcs.length; i++)
        {
            var src = srcs[i];
            if(!src.type.match(/image.*/)){
                if(window.console){
                    console.log("选择的文件类型不是图片: ", src.type);
                } else {
                    window.confirm("只能选择图片文件");
                }
                return;
            }
            // 创建 FileReader 对象 并调用 render 函数来完成渲染.
            var reader = new FileReader();
            // 绑定load事件自动回调函数
            reader.onload = function(e){
                //读取数据源
                imageData = e.target.result;
                callBack(imageData);
            };
            // 读取文件内容
            reader.readAsDataURL(src);
        }
    };

};

Template.cameraIonActionSheet.destroyed = function () {
    $(window).off('keyup.cameraIonActionSheet');
};

Template.cameraIonActionSheet.events({
    // Handle clicking the backdrop
    'click': function (event, template) {
        if ($(event.target).hasClass('action-sheet-backdrop')) {
            cameraIonActionSheet.cancel();
        }
    },

    'click [data-index]': function (event, template) {
        var index = $(event.target).data('index');
        cameraIonActionSheet.buttonClicked(index);
    },

    'click [data-destructive]': function (event, template) {
        cameraIonActionSheet.destructiveButtonClicked();
    },

    'click [data-cancel]': function (event, template) {
        cameraIonActionSheet.cancel();
    }

});

