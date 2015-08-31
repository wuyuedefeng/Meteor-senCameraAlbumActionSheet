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

######if you want trans uri  to base64 please call（转换uri为base64的方法）:

```
SenCameraAlbumActionSheet.base64_from_uri(imageUri, function(one_image_base64){//one_image_base64 为 imageUri转换后的数据

});

```