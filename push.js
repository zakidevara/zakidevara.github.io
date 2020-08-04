var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BMm6fyyKSjPy-D6FgFI-LiO-VrdNJHjr59SA9Bok9IWgyl3HzKjqSW1Aw5BCqTPskJ9-elskoJi1_T6fQA06e9M",
   "privateKey": "Uxl_S9s4ewlEU4kOHxTN5rD4h_dHC-Us0xmEIRAmia0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cbKtg3i1BC4:APA91bETho5XYHxYRJegEm6WcZP9k1nQJKXlWEDMn1wNWH9unDIda5NiLYp2b3lPBlLcx2txdzV5IRBfK_DwUXE_BHQRK7GSdliFqILUwikbC1ONsQx8Yj25GUmUMcT9SmRiXLU2h45L",
   "keys": {
       "p256dh": "BIT9+BoRDtsIaqkfRt2tOkKREAJlHR5RyFjrh3L+wuKkULNe189P+O0BpuVRBTt+CyAW+PFjAFJmSgkUXKA/IJo=",
       "auth": "brKlq8OUIQVxO2rYrLiY+Q=="
   }
};
var payload = 'Notifikasi dari Aplikasi Champions League!';
 
var options = {
   gcmAPIKey: '1082656194357',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);