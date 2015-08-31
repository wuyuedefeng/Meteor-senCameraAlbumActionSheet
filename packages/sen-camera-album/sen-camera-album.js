// Write your package code here!
SenCameraAlbumActionSheet = {
    base64_from_uri: function(imageUri, callback){
        var c=document.createElement('canvas');
        var ctx=c.getContext("2d");
        var img=new Image();
        img.onload = function(){
            c.width=this.width;
            c.height=this.height;
            ctx.drawImage(img, 0,0);
        };
        img.src=imageUri;
        var dataURL = c.toDataURL("image/jpeg");

        if (callback && dataURL){
            callback(dataURL);
            return true;
        }
        return false;
    },
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
                        if(cancelCallback){
                            cancelCallback(error.message);
                        }
                    }else{
                        selCallback(one_image_base64);
                    }
                });

                return true;
            }
        });
    },
    showCameraAlbum_one:function(selCallback,cancelCallback){
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
                            if(cancelCallback){
                                cancelCallback(error.message);
                            }
                        }else{
                            selCallback(one_image_base64);
                        }
                    });
                }else{
                    var pictureSource;   // picture source
                    var destinationType; // sets the format of returned value

                    function onDeviceReady() {
                        pictureSource=navigator.camera.PictureSourceType;
                        destinationType=navigator.camera.DestinationType;
                        function onSuccess(imageData) {
                            selCallback("data:image/jpeg;base64," + imageData);
                            navigator.camera.cleanup();
                        }

                        function onFail(message) {
                            console.log('Failed because: ' + message);
                            if(cancelCallback){
                                cancelCallback(message);
                            }
                            navigator.camera.cleanup();
                        }

                        navigator.camera.getPicture(onSuccess, onFail, {
                            quality: 80,
                            destinationType: destinationType.DATA_URL,
                            sourceType: pictureSource.PHOTOLIBRARY });

                    }
                    // Wait for device API libraries to load
                    //
                    document.addEventListener("deviceready",onDeviceReady,false);

                    // device APIs are available
                    //
                }
                return true;
            }
        });
    },
    showCameraAlbum_one_canEdit:function(selCallback,cancelCallback){
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
                var pictureSource;   // picture source
                var destinationType; // sets the format of returned value

                function onDeviceReady() {
                    pictureSource=navigator.camera.PictureSourceType;
                    destinationType=navigator.camera.DestinationType;
                    function onSuccess(imageData) {
                        selCallback("data:image/jpeg;base64," + imageData);
                        navigator.camera.cleanup();
                    }

                    function onFail(message) {
                        console.log('Failed because: ' + message);
                        if(cancelCallback){
                            cancelCallback(message);
                        }
                        navigator.camera.cleanup();
                    }

                    navigator.camera.getPicture(onSuccess, onFail, {
                        quality: 5,
                        allowEdit : true,
                        destinationType: destinationType.DATA_URL,
                        sourceType: index == 1 ? pictureSource.PHOTOLIBRARY : pictureSource.CAMERA });

                }
                // Wait for device API libraries to load
                //
                document.addEventListener("deviceready",onDeviceReady,false);

                // device APIs are available
                //

                return true;

            }
        });
    },
    showCameraAlbum_more:function(selCallback,cancelCallback){
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
                            if(cancelCallback){
                                cancelCallback(error.message);
                            }
                        }else{
                            selCallback(one_image_base64,'base64');
                        }
                    });
                }else{
                    window.imagePicker.getPictures(
                        function(results) {
                            var uris = results;
                            selCallback(uris, 'uris');
                        }, function (error) {
                            console.log('Error: ' + error);
                            if(cancelCallback){
                                cancelCallback(error.message);
                            }
                        }, {
                            maximumImagesCount: 10,
                            width: 800
                        }
                    );
                }
                return true;
            }
        });
    }
}