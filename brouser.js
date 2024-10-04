document.addEventListener("DOMContentLoaded", function () {
    var STATE_STOPPED = 0;
    var STATE_PLAYING = 1;
    var STATE_PAUSED = 2;
    var playerState = STATE_STOPPED;
    var video = document.getElementById('myVideo');
    video.style.width = '1280px';
    video.style.height = '720px';

    // ������� ��� ������������ ������������ �����
    function togglePlayPause() {
        var video = document.getElementById('myVideo');
        switch (playerState) {
            case STATE_STOPPED:
                video.play(); // ��������� ��������������� �����
                playerState = STATE_PLAYING;
                alert("Video played");
                break;
            case STATE_PLAYING:
                video.pause(); // ������ ����� �� �����
                playerState = STATE_PAUSED;
                alert("Video paused");
                break;
            case STATE_PAUSED:
                video.play(); // ������������ ��������������� �����
                playerState = STATE_PLAYING;
                alert("Video resumed");
                break;
        }
        alert("togglePlayPause() called, state: " + playerState);
    }
    // ������� ������� ������� ������� ������ ���� ���
    document.addEventListener("keydown", function (event) {
        // �������� ��� ������� �������
        var keyCode = event.keyCode;

        // ������������ �������
        switch (keyCode) {
            case 13: // Enter
                togglePlayPause(); // ��������� � ������ ���������������
                break;
            default:
                console.log("Key pressed: " + keyCode);
                break;
        }
    });
});
