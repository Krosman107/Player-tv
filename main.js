document.addEventListener("DOMContentLoaded", function () {
    var STATE_STOPPED = 0;
    var STATE_PLAYING = 1;
    var STATE_PAUSED = 2;
    var playerState = STATE_STOPPED;
    var deviceKind = 'browser';
    // ������� ������������� ����������
    function initDevice() {
        var isAndroid = navigator.userAgent.toLowerCase().indexOf('android') >= 0;
        deviceKind = isAndroid ? 'android' : deviceKind;
        if (!isAndroid) {
            window.location.href = '/indexbrouser.html';
        }
    }
    initDevice();
     //�������� ��� ����������
    function getDeviceKind() {
        return deviceKind;
    }
     //������� ������ ���������
    function alert(str) {
        if (!this.loggerObject) {
            this.loggerObject = document.getElementById('logger');
        }
        this.loggerObject.innerHTML += "<br/>" + str;
    };

    // ������� ��� ������������ ������������ �����
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

    //// ������� ��������� �����
    //function rewind(seconds) {
    //    // �������� ������� ����� ���������������
    //    var currentTime = AndroidApp.CallSub('getCurrentTime');
    //    // ������������ �� ��������� ���������� ������
    //    var newTime = currentTime + seconds;
    //    // ������������� ����� ����� ���������������
    //    AndroidApp.CallSub('setCurrentTime', newTime);
    //    alert("rewind() called, state: " + seconds);
    //}

    // ��������� ����� � ������������� ��� �������
    AndroidApp.CallSub('VideoLoadChannel', true, "http://176.28.64.95:8081/file/stor1/big_buck_bunny_1080p_h264.mov");
    AndroidApp.CallSub('setVideoBounds', true, -1, -1, 777, 777);

    // ������� ������� ������� ������� ������ ���� ���
    document.addEventListener("keydown", function (event) {
        // �������� ��� ������� �������
        var keyCode = event.keyCode;

        // ������������ �������
        switch (keyCode) {
            case 13: // Enter
                togglePlayPause(); // ��������� � ������ ���������������
                break;
            case 37: // ������� �����
                rewind(-10); // ��������� ����� �� 10 ������
                break;
            case 39: // ������� ������
                rewind(10); // ��������� ������ �� 10 ������
                break;
            default:
                console.log("Key pressed: " + keyCode);
                break;
        }
    });
});