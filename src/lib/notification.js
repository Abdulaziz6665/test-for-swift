var apn = require('apn');

var options = {
    token: {
      key: __dirname + '/AuthKey_6U2GM463RB.p8',   // ios client will give
      keyId: "6U2GM463RB",   // ios client will give
      teamId: "9W6JC38Q8B"   // ios client will give
    },
    production: false
  };

  let apnProvider = new apn.Provider(options);
  
  // Replace deviceToken with your particular token:
  // let deviceToken = "cda2de107720a80e531513631cacb08dead1549095b6b0f90eea38903919be4c";
  // let deviceToken = ["acdaa5ac2bb4a8706a9654ac9f245e6973080486a04d490d0752fd79232003b1", "d774179baf1062a74ff6138a7ec87cfc87c5e70bc2e165d0292252509e572a9f"];  // ios client will give
  

  function start (deviceToken, message, senderName) {

      // Prepare the notifications
      // let notification = new apn.Notification();
      // notification.expiry = Math.floor(Date.now() / 1000) + 24 * 3600; // will expire in 24 hours from now
      // notification.rawPayload = {
      //   "aps": {
      //     "category": "new_podcast_available",
      //     "alert": {
      //       "title": "New Mesaage Available",
      //       "subtitle": senderName,
      //       "body": message
      //     },
      //     "mutable-content": 1
      //   },
      //   "podcast-image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLqqZvfV4WiQwp9WU95A77xVWw4zXYx8DjLQ&usqp=CAU",
      //   "podcast-link": "https://www.raywenderlich.com/234898/antonio-leiva-s09-e13",
      //   "podcast-guest": "Doctor Miyagi Leiva"
      // }
      
      // notification.topic = "com.AzizbeksSeconfRishNotification";    // ios client will give bundle id
      
      // apnProvider.send(notification, deviceToken).then( result => {
      // 	// Show the result of the send operation:
      // 	console.log(result);
      // });
    
      // // Close the server
      // apnProvider.shutdown();
  }

module.exports = {
    start
}