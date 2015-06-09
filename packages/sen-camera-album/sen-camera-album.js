// Write your package code here!
SenCameraAlbumActionSheet = {
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
                            cancelCallback(error.message);
                        }else{
                            var more_image_base64 = [one_image_base64];
                            selCallback(more_image_base64);
                        }
                    });
                }else{
                    var more_image_base64 = [];
                    var pictureSource;   // picture source
                    var destinationType; // sets the format of returned value

                    // Wait for device API libraries to load
                    //
                    document.addEventListener("deviceready",onDeviceReady,false);

                    // device APIs are available
                    //
                    function onDeviceReady() {
                        pictureSource=navigator.camera.PictureSourceType;
                        destinationType=navigator.camera.DestinationType;
                    }
                    function onSuccess(imageData) {
                        var more_image_base64 = [imageData];
                        selCallback(imageData)
                    }
                    navigator.camera.getPicture(onSuccess, onFail, { quality: 2,
                        destinationType: destinationType.DATA_URL,
                        sourceType: pictureSource.PHOTOLIBRARY });

                    function onFail(message) {
                        console.log('Failed because: ' + message);
                        cancelCallback(message);
                    }
                }
                return true;
            }
        });
    }
}