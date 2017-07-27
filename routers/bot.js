const router = require('express').Router();
require('dotenv').config();
const axios = require('axios');
const FB_Function = require('../botcontrolers/defaultfb')
const APP_SECRET = process.env.MESSENGER_APP_SECRET
const VALIDATION_TOKEN = process.env.MESSENGER_VALIDATION_TOKEN
const PAGE_ACCESS_TOKEN = process.env.MESSENGER_PAGE_ACCESS_TOKEN
const SERVER_URL = process.env.SERVER_URL

//apiai
var apiai = require('apiai');
var nlp = apiai(process.env.APIAI_CLIENT_ACCESS_TOKEN);

//helper
const gplace = require('../helper/gplace')
const queris = require('../helper/queris')

// falidate web hook
router.get('/hook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

router.post('/greting',(req,res) => {
  const greet = [
              {
                "locale":"default",
                "text":req.body.message
              }
            ]
  axios.post(`https://graph.facebook.com/v2.6/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}`,{
    data:{
      greeting:greet
    }
  }).then(succ=>{
    res.send(succ.data.result)
  }).catch(err=>{
    res.send(err)
  })
})

//get message from fb
router.post('/hook', function (req, res) {
  var data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        //message containing text
        if (event.message) {
          //FB_Function.receivedMessage(event);
          const { sender, message } = event
          //set massage to apiai
          console.log(message.text);
          var request = nlp.textRequest(message.text, {sessionId: sender.id});

          request.on('response', function(response) {
            console.log(response.result.action);
            if (response.result.actionIncomplete) {
              FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);
            } else {
              switch (response.result.action) {
                case "find_category":
                FB_Function.sendMessage(sender.id,`befo sih tau beberapa ${response.result.parameters.category} kak bentar ya!`);
                    queris.recomPlaces(response.result.parameters.category)
                    .then(data=>{
                      FB_Function.sendGenMessage(sender.id,data)
                    })
                  break;
                  case "place_by_district":
                  FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);
                  console.log(response.result.parameters.place,response.result.parameters.district);
                  gplace.placeByDisctrict(response.result.parameters.place,response.result.parameters.district)
                  .then(data=>{
                    FB_Function.sendGplace(sender.id,data)
                  })
                  break;
                  case 'cuaca':
                  FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);

                    gplace.weather('belitung')
                    .then(data=>{
                      FB_Function.sendWeather(sender.id,data)
                    })
                  break;
                  case 'greeting':
                  FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);
                  break;
                  case 'input.unknown':
                  FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);
                  break;
                  case 'cacian':
                  FB_Function.sendMessage(sender.id,response.result.fulfillment.speech);
                  break;
                default:

              }
            }

          });

          request.on('error', function(error) {
              console.log(error);
          });

          request.end();

        } else {
          //message not containing text
          if (event.postback.payload=='GET_STARTED_PAYLOAD') {
            FB_Function.sendMessage(event.sender.id,
            `Hallo aku befo atau Belitung info aku adalah personal asistan kamu selama berlibur di belitung,kamu bisa tanya aku berbagai macam hal contoh: befo restoran di tanjung tinggi apa ya? befo rekomendasi restoran dong atau befo cuaca hari ini gimana?`
           )
          }
        }
      });
    });
    res.sendStatus(200);
  }
});

module.exports = router ;
