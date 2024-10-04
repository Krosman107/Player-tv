document.addEventListener("DOMContentLoaded", function () {
    var STATE_STOPPED = 0;
    var STATE_PLAYING = 1;
    var STATE_PAUSED = 2;
    var playerState = STATE_STOPPED;
    var deviceKind = 'browser';
    // Функция инициализации устройства
    function initDevice() {
        var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0;
        deviceKind = isAndroid ? 'android' : deviceKind;
        if (!isAndroid) {
            window.location.href = '/indexbrouser.html';
        }
    }
    initDevice();
     //Получаем тип устройства
    function getDeviceKind() {
        return deviceKind;
    }
     //Функция вывода сообщения
    function alert(str) {
        if (!this.loggerObject) {
            this.loggerObject = document.getElementById('logger');
        }
        this.loggerObject.innerHTML += "<br/>" + str;
    };

    // Функция для переключения проигрывания видео
    function togglePlayPause() {
        switch (playerState) {
            case STATE_STOPPED:
                AndroidApp.CallSub('VideoPlay', true);
                playerState = STATE_PLAYING;
                alert("Video played");
                break;
            case STATE_PLAYING:
                AndroidApp.CallSub('VideoPause', true);
                playerState = STATE_PAUSED;
                alert("Video paused");
                break;
            case STATE_PAUSED:
                AndroidApp.CallSub('VideoPlay', true);
                playerState = STATE_PLAYING;
                alert("Video resumed");
                break;
        }
        alert("togglePlayPause() called, state: " + playerState);
    }

    //// Функция перемотки видео
    //function rewind(seconds) {
    //    // Получаем текущее время воспроизведения
    //    var currentTime = AndroidApp.CallSub('getCurrentTime');
    //    // Перематываем на указанное количество секунд
    //    var newTime = currentTime + seconds;
    //    // Устанавливаем новое время воспроизведения
    //    AndroidApp.CallSub('setCurrentTime', newTime);
    //    alert("rewind() called, state: " + seconds);
    //}

    // Загружаем видео и устанавливаем его границы
    AndroidApp.CallSub('VideoLoadChannel', true, "http://176.28.64.95:8081/file/stor1/big_buck_bunny_1080p_h264.mov");
    AndroidApp.CallSub('setVideoBounds', true, -1, -1, 777, 777);

    // Слушаем событие нажатия клавиши только один раз
    document.addEventListener("keydown", function (event) {
        // Получаем код нажатой клавиши
        var keyCode = event.keyCode;

        // Обрабатываем клавиши
        switch (keyCode) {
            case 13: // Enter
                togglePlayPause(); // Остановка и запуск воспроизведения
                break;
            case 37: // Стрелка влево
                rewind(-10); // Перемотка назад на 10 секунд
                break;
            case 39: // Стрелка вправо
                rewind(10); // Перемотка вперед на 10 секунд
                break;
            default:
                console.log("Key pressed: " + keyCode);
                break;
        }
    });
});