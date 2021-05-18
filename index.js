const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

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
        var name2 = agent.request.queryResult.parameters['name']; 
        var name = agent.parameters.name['name'];
        agent.add("[heroku]테슷흐1")
        agent.add(`[heroku]${name}`);
        agent.add("[heroku]" + name);
        agent.add("[heroku]테슷흐2")
        agent.add(`[heroku]${name2}`);
        agent.add("[heroku]" + name2);
    }

    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    intentMap.set("askEmail", sayName)
    agent.handleRequest(intentMap);
}
