const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

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

    function sayWeather(agent){
        var url = "http://api.openweathermap.org/data/2.5/weather?q=seoul&appid=aca3d57df145ee10c372ff22aefdaa56";
            $.ajax({
                url : url,
                method : 'GET',
                success :  (data)=> {
                    var temp = String((data.main.temp - 272)).substring(0,3); // 온도
                    var location = data.name; // 지역이름 
                    agent.add('지역 ：' + location + ' 온도　：' + tempr　+ "도입니다. "+'\n');
                    // 아이콘 취득 
                    // var imgURL = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
                    // 아이콘 표시
                    //$('#img').attr("src", imgURL);
                  }
            });
    }
    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    intentMap.set("askEmail", sayName)
    intentMap.set("askWeather", sayWeather)
    agent.handleRequest(intentMap);
}
