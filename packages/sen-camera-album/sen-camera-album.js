// Write your package code here!
senCameraAlbumActionSheet = {
    showCamera:function(selCallback,cancelCallback){
        IonActionSheet.show({
            titleText: '选择方式',
            buttons: [
                { text: '拍照' }
            ],
            //destructiveText: 'Delete',
            cancelText: '取消',
            cancel: function() {
                console.log('Cancelled!');
            },
            buttonClicked: function(index) {
                var cameraOptions = {
                    quality:10
                };
                MeteorCamera.getPicture(cameraOptions,function(error,one_image_base64){
                    if(error){
                        //alert(error.message);
                    }else{
                        var more_image_base64 = [one_image_base64];
                        selCallback(more_image_base64);
                    }
                });

                return true;
            }
        });
    },
    showCameraAlbum:function(selCallback,cancelCallback){
        IonActionSheet.show({
            titleText: '选择方式',
            buttons: [
                { text: '拍照' },
                { text: '相册选取' }
            ],
            //destructiveText: 'Delete',
            cancelText: '取消',
            cancel: function() {
                console.log('Cancelled!');
            },
            buttonClicked: function(index) {
                if(index == 0)
                {
                    var cameraOptions = {
                        quality:10
                    };
                    MeteorCamera.getPicture(cameraOptions,function(error,one_image_base64){
                        if(error){
                            //alert(error.message);
                        }else{
                            var more_image_base64 = [one_image_base64];
                            selCallback(more_image_base64);
                        }
                    });
                }else{
                    var more_image_base64 = [];
                    window.imagePicker.getPictures(
                        function(results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                loadImage(this.files,function(one_image_base64){
                                    more_image_base64.push(one_image_base64);
                                });
                            }
                            selCallback(more_image_base64);
                        }, function (error) {
                            console.log('Error: ' + error);
                            cancelCallback(error);
                        }, {
                            maximumImagesCount: 10,
                            width: 800
                        }
                    );
                    function loadImage(src,callBack){
                        // 过滤掉 非 image 类型的文件
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
                    };
                }
                return true;
            }
        });
    }
}