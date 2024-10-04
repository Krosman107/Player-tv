document.addEventListener("DOMContentLoaded", function () {
    var STATE_STOPPED = 0;
    var STATE_PLAYING = 1;
    var STATE_PAUSED = 2;
    var playerState = STATE_STOPPED;
    var video = document.getElementById('myVideo');
    video.style.width = '1280px';
    video.style.height = '720px';

    // Функция для переключения проигрывания видео
    function togglePlayPause() {
        var video = document.getElementById('myVideo');
        switch (playerState) {
            case STATE_STOPPED:
                video.play(); // Запускаем воспроизведение видео
                playerState = STATE_PLAYING;
                alert("Video played");
                break;
            case STATE_PLAYING:
                video.pause(); // Ставим видео на паузу
                playerState = STATE_PAUSED;
                alert("Video paused");
                break;
            case STATE_PAUSED:
                video.play(); // Возобновляем воспроизведение видео
                playerState = STATE_PLAYING;
                alert("Video resumed");
                break;
        }
        alert("togglePlayPause() called, state: " + playerState);
    }
    // Слушаем событие нажатия клавиши только один раз
    document.addEventListener("keydown", function (event) {
        // Получаем код нажатой клавиши
        var keyCode = event.keyCode;

        // Обрабатываем клавиши
        switch (keyCode) {
            case 13: // Enter
                togglePlayPause(); // Остановка и запуск воспроизведения
                break;
            default:
                console.log("Key pressed: " + keyCode);
                break;
        }
    });
});
