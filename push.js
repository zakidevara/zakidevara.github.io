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
   "endpoint": "https://fcm.googleapis.com/fcm/send/foVQx54FSp4:APA91bF2_d3G_YxXno5zdKxSFE0HOSIvZEVFG2nzTMSJU2NPs0TZH4wUWiSwnhM89EkdG5oCZRJl9_G0Ay4ob8ZKsYxkj4K2UgA6lszYNgBL_6tt-7AdzTju-6X2Em7MoURg8sLrgxN4",
   "keys": {
       "p256dh": "BFk8YkaCm9ZepJaEztB9eJJ3XEN7ujrq6e1W+OTqsJV210Ceq8fSB4JLxAkTmrS7MC7hf28FUL7XsMDkvyv2G1s=",
       "auth": "DNev2W6BHQnleGzNGCHwTg=="
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