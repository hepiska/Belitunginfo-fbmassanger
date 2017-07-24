require('dotenv').config();
const axios = require('axios');

const APP_SECRET = process.env.MESSENGER_APP_SECRET
const VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN
const SERVER_URL = process.env.SERVER_URL;
const get_started_url = ` https://graph.facebook.com/v2.6/${1461948440527230}/thread_settings?access_token=${PAGE_ACCESS_TOKEN}`
const FB_URL = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;


FBdefaultFunction = {
  receivedMessage(event) {
    // Putting a stub for now, we'll expand it in the following steps
    console.log("Message data: ", event);
  },
  sendMessage(recipientId, messageText){
    var payload = {
        recipient: {
          id: recipientId
        },
        message: {
          text: messageText
        }
      };
    axios.post(FB_URL,payload).then((res)=>{
      console.log(res);
    })
  },
  sendGenMessage(recipientId){

    console.log(payload,FB_URL);
    axios.post(get_started_url,payload).then((res)=>{
      console.log(res);
    })
  }

}

module.exports = FBdefaultFunction;
