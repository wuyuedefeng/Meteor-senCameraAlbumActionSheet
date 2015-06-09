Package.describe({
  name: 'wuyuedefeng:sen-camera-album',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Cordova.depends({
    // http://plugins.cordova.io/#/package/com.romainstrock.cordova.background-geolocation
    'cordova:com.synconset.imagepicker': '1.0.6'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
    api.use('mdg:camera', ['client']);
    api.addFiles('sen-camera-album.js');
    api.addFiles([
        'senCameraAlbumActionSheet.html',
        'senCameraAlbumActionSheet.js'
    ], 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('wuyuedefeng:sen-camera-album');
});
