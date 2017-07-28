require('dotenv').config();
const axios = require('axios');

const APP_SECRET = process.env.MESSENGER_APP_SECRET
const GPLACE_KEY = process.env.GPLACE_KEY
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
    })
  },
  sendGenMessage(recipientId,datas){
    var sendData= datas.map(data=>{
        const element={}
        const buttons=[];
        const button={};
        button.type="web_url"
        button.url=`https://www.google.com/maps/place/${data.lat},${data.lng}/@${data.lat},${data.lng},4z`;
        button.title= 'location';
        element.title = data.name;
        buttons.push(button)
        element.subtitle = data.description;
        element.image_url = data.image_url;
        element.buttons=buttons
        return element
    })
    var payload = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: sendData
          }
        }
        }
      };
    axios.post(FB_URL,payload).then((res)=>{
      //console.log(res);
    }).catch(err=>{console.log(err);})
  },
  sendGplace(recipientId,datas){
    var sendData= datas.map(data=>{
        const element={}
        const buttons=[];
        const button={};
        button.type="web_url"
        button.url=`https://www.google.com/maps/place/${data.geometry.location.lat},${data.geometry.location.lng}/@${data.geometry.location.lat},${data.geometry.location.lng},4z`;
        button.title= 'location';
        buttons.push(button)
        element.title = data.name;
        if (data.opening_hours) {
            element.subtitle = `google rate ${data.rating}, sedang buka: ${data.opening_hours.open_now ? 'buka':'tutup'}`;
        } else {
             element.subtitle = `google rate ${data.rating},  sedang buka: ?`;
        }
        if (data.photos) {
          element.image_url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${data.photos[0].photo_reference}&key=${GPLACE_KEY}`;
        } else {
          element.image_url = ``;

        }
        element.buttons=buttons
        return element
    })
    var payload = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
          type: "template",
          payload: {
            template_type: "generic",
            elements: sendData
          }
        }
        }
      };
    axios.post(FB_URL,payload).then((res)=>{
      //console.log(res);
    })
  },
  sendWeather(recipientId,datas){
    var sendData= datas.map(data=>{
        const element={}
        const buttons=[];
        const button={};
        button.type="web_url"
        // button.url=`https://www.google.com/maps/place/${data.geometry.location.lat},${data.geometry.location.lng}/@${data.geometry.location.lat},${data.geometry.location.lng},4z`;
        // button.title= 'location';
        // buttons.push(button)
        element.title = data.condition.text ;
        element.subtitle = data.time;
        element.image_url = `https:${data.condition.icon}`;
        //element.buttons=buttons
        return element
    })
    var payload = {
        recipient: {
          id: recipientId
        },
        message: {
          attachment: {
          type: "template",
          payload: {
            "template_type": "list",
            "top_element_style": "compact",
            elements: sendData
          }
        }
        }
      };
    axios.post(FB_URL,payload).then((res)=>{
      //console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

}

module.exports = FBdefaultFunction;
