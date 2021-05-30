const express = require('express')
const bodyParser = require('body-parser')
var axios = require('axios')
const {WebhookClient} = require('dialogflow-fulfillment');
const { request } = require('express');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000
const openweatherappid = "aca3d57df145ee10c372ff22aefdaa56";
const city = "서울특별시";

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
    city = req.body.queryResult.parameters['geo-city']
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
        return axios({
          method: "GET",
          url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openweatherappid}`,
          data: "",
        })
          .then((response) => {
            console.log("======================second======================")
            console.log(url);
            console.log(response.data.main.temp - 272); //Hello World
            var temperature = String(response.data.main.temp - 272)
            console.log("============================================")
            agent.add("오늘 " + city + "은(는) 현재 섭씨"+ temperature + "입니다 !"); 
          })
          .catch((error) => {
            console.log(error);
          });
        
        
        // return axios.get('http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=aca3d57df145ee10c372ff22aefdaa56').then((Response)=>{
        //   console.log(response.data.main.temp - 272); //Hello World
        //   agent.add(response.data.main.temp - 272); 
        // }).catch((Error)=>{
        //     console.log(Error);
        // });
        
    }
      

    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    intentMap.set("askEmail", sayName)
    intentMap.set("askWeather", helloWorld)
    agent.handleRequest(intentMap);
}
