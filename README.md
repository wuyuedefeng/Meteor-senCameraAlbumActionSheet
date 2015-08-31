## SenCameraAlbumActionSheet

# 依赖ionic环境 需自己添加

# 依赖包 移动设备编译时，会自动添加，无需手动添加
meteor add mdg:camera
meteor add cordova:org.apache.cordova.camera@0.3.6
meteor add cordova:com.synconset.imagepicker@1.0.6


```meteor
meteor add wuyuedefeng:sen-camera-album
```

##使用方法
```JavaScript
SenCameraAlbumActionSheet.showCamera(function(one_image_base64){

});

SenCameraAlbumActionSheet.showCameraAlbum_one(function(one_image_base64){

});

SenCameraAlbumActionSheet.showCameraAlbum_one_canEdit(function(one_image_base64){//拍照或选择图片后可编辑

});

SenCameraAlbumActionSheet.showCameraAlbum_more(function(result,identifier)
{
//identifier是'base64'，result表示one_image_base64;
//identifier是'uris'，result表示路径的数组。

});

```
######if you want trans uri  to base64 please call:

```
SenCameraAlbumActionSheet.base64_from_uri(imageUri, function(one_image_base64){//one_image_base64 为 imageUri转换后的数据

});

```

***

##### 获取多张图片的base64方法，图片获取（Session.get('cameraIonActionSheet.selPics');） 注意自己控制对数据的清空
###### tip：Meteor的Session具有随动性，所以无需考虑啥时返回（对相册选取多张封装到了client目录中的senMutipleActionSheet中，自动将图片加到Session中）

```
//显示actionSheet

showCameraActionSheet();
function showCameraActionSheet(){
    cameraIonActionSheet.show({
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
            if (index === 0) {
                var cameraOptions = {
                    quality:10
                };
                MeteorCamera.getPicture(cameraOptions,function(error,one_image_base64){
                    if(error){
                        //alert(error.message);
                        cancelCallback(error.message);
                    }else{
                        var pics = Session.get('cameraIonActionSheet.selPics');
                        pics.push(one_image_base64);
                        Session.set('cameraIonActionSheet.selPics',pics);
                    }
                });
            }
            return true;
        }
        //destructiveButtonClicked: function() {
        //    console.log('Destructive Action!');
        //    return true;
        //}
    });
}
```