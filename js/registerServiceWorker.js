// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    registerServiceWorker();
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

// Register service worker
function registerServiceWorker() {
    return navigator.serviceWorker
        .register('/sw.js')
        .then(function (registration) {
            console.log('Registrasi service worker berhasil.');
            requestPermission();
            return registration;
        })
        .catch(function (err) {
            console.error('Registrasi service worker gagal.', err);
        });
}

//Request permission untuk menampilkan notifikasi
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(function (result) {
            if (result === "denied") {
                console.log("Fitur notifikasi tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog permintaan ijin.");
                return;
            }
            
            if (('PushManager' in window)) {
                navigator.serviceWorker.getRegistration().then(function(registration) {
                    registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array("BMm6fyyKSjPy-D6FgFI-LiO-VrdNJHjr59SA9Bok9IWgyl3HzKjqSW1Aw5BCqTPskJ9-elskoJi1_T6fQA06e9M")
                    }).then(function(subscribe) {
                        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('p256dh')))));
                        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                            null, new Uint8Array(subscribe.getKey('auth')))));
                    }).catch(function(e) {
                        console.error('Tidak dapat melakukan subscribe ', e.message);
                    });
                });
            }
        });
    }
}
