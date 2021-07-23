const express = require('express')
const bodyParser = require('body-parser')
var axios = require('axios')
const {WebhookClient} = require('dialogflow-fulfillment');
const { request } = require('express');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const openweatherappid = "aca3d57df145ee10c372ff22aefdaa56";


app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function sayHello(agent){
        agent.add("안녕안녕안녕안녕~~")
    }

    function sayName(agent){
        var name = agent.request_.body.queryResult.outputContexts[0].parameters['name.original'];
        agent.add("[heroku]아하, 당신의 이름은 <" + name + "> 군요!!");
    }

    function helloWorld() {
        // 2번째시도 axios => DEADLINE EXCEED error
        //var city = agent.request_.body.queryResult.outputContexts[0].parameters['location.original']['city'];
        console.log("======================first======================")
        //console.log(city);
        city = agent.request_.body.queryResult.outputContexts[0].parameters['location']['city'];
        original_date = agent.request_.body.queryResult.outputContexts[0].parameters['date-time.original'];
        cooked_date = agent.request_.body.queryResult.outputContexts[0].parameters['date-time'];
        console.log("======================second======================")
        console.log(city);
        console.log(cooked_date);
        return axios({
          method: "GET",
          //api.openweathermap.org/data/2.5/forecast?q={city name}&appid
          //url: encodeURI("http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=aca3d57df145ee10c372ff22aefdaa56"),
          url: encodeURI("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=aca3d57df145ee10c372ff22aefdaa56"),
          data: "",
        })
          .then((response) => {
            console.log("======================second======================")
            console.log(response)
            console.log("============================================")
            console.log(response.data)
            console.log("============================================")
            console.log(response.data.main.temp - 272); //Hello World
            var temperature = String(response.data.main.temp - 272)
            console.log("============================================")
            agent.add(original_date + city + "은(는) 현재 섭씨"+ temperature + "입니다 !");
          })
          .catch((error) => {
            console.log(error);
          });
    }


    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    intentMap.set("askEmail", sayName)
    intentMap.set("askWeather", helloWorld)
    agent.handleRequest(intentMap);
}
