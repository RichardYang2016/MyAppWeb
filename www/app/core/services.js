(function() {

    'use strict'

    angular.module('app.services', [])

    .service('appService', ['$state', '$ionicPopup', '$ionicActionSheet', '$ionicHistory', '$ionicLoading', '$timeout', '$http',
        function($state, $ionicPopup, $ionicActionSheet, $ionicHistory, $ionicLoading, $timeout, $http) {
            //global data                
            var currentUser;




            //service logic
            return {
                getFirebaseConfig: function() {
                    return {
                        apiKey: "AIzaSyBxuKImRdb7-VRScgwZYjpfEmc9sgBSlqg",
                        authDomain: "agileacc-1488095635682.firebaseapp.com",
                        databaseURL: "https://agileacc-1488095635682.firebaseio.com/",
                        storageBucket: "agileacc-1488095635682.appspot.com"
                            // messagingSenderId: "<SENDER_ID>",
                    };

                },
                setUserInfo: function(user) {
                    currentUser = user;
                },
                getUserInfo: function(user) {
                    return currentUser;
                },
                Loading: function(params) {
                    if (params === 'show') {
                        $ionicLoading.show({
                            template: '<ion-spinner></ion-spinner>'
                        });
                    } else {
                        $ionicLoading.hide();
                    }
                },
                KeepKeyboardOpen: function(params) {
                    var txtInput = angular.element(document.body.querySelector(params));
                    txtInput.one('blur', function() {
                        txtInput[0].focus();
                    });
                },
                showAlert: function(title, text, buttonText, buttonType, page) {
                    var alertPopup = $ionicPopup.alert({
                        title: title,
                        template: text,
                        buttons: [{ text: buttonText, type: buttonType }]
                    });
                    $timeout(function() {
                        alertPopup.close();
                    }, 1500000);

                    alertPopup.then(function(res) {
                        page != null ? $state.go(page) : '';
                        alertPopup.close();
                    });
                },
                getGreetingTime: function(m) {
                    var g = null;

                    if (!m || !m.isValid()) {
                        return;
                    } //if we can't find a valid or filled moment, we return.

                    var split_afternoon = 12 //24hr time to split the afternoon
                    var split_evening = 17 //24hr time to split the evening
                    var currentHour = parseFloat(m.format("HH"));

                    if (currentHour >= split_afternoon && currentHour <= split_evening) {
                        g = "Good Afternoon";
                    } else if (currentHour >= split_evening) {
                        g = "Good Evening";
                    } else {
                        g = "Good Morning";
                    }
                    return g;
                },
                getCameraOptions: function() {
                    return {
                        quality: 80,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.CAMERA,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: true,
                        correctOrientation: true,
                    };
                },
                getLibraryOptions: function() {
                    return {
                        quality: 80,
                        destinationType: Camera.DestinationType.DATA_URL,
                        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                        encodingType: Camera.EncodingType.JPEG,
                        saveToPhotoAlbum: false,
                        correctOrientation: true,
                    };
                },
                getChartData: function() {
                    return {
                        sample: true,
                        line_labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                        line_data: [
                            [65, 59, 80, 81, 56, 55, 40],
                            [28, 48, 40, 19, 86, 27, 90]
                        ],
                        series: ['Series A', 'Series B'],

                        doughnut_labels: ["Download Sales", "In-Store Sales", "Mail-Order Sales"],
                        doughnut_data: [300, 500, 100]
                    }
                }
            }
        }
    ]);
})();
