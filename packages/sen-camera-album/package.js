Package.describe({
    name: 'wuyuedefeng:sen-camera-album',
    version: '0.1.9',
    // Brief, one-line summary of the package.
    summary: 'camera album get images base cordova',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/wuyuedefeng',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Cordova.depends({
    // http://plugins.cordova.io/#/package/com.romainstrock.cordova.background-geolocation
    'org.apache.cordova.camera': '0.3.6',
    'com.synconset.imagepicker': '1.0.6'
});

Package.onUse(function(api) {
    api.versionsFrom('1.1.0.2');
    api.use('mdg:camera@1.1.4', ['client']);
    api.use('meteoric:ionic@0.1.17', ['client']);
    api.use('meteoric:ionic-sass@0.1.9', ['client']);
    api.addFiles('sen-camera-album.js');

    if (api.export)
        api.export('SenCameraAlbumActionSheet');
});

Package.onTest(function(api) {
    api.use('tinytest');
    api.use('wuyuedefeng:sen-camera-album');
});