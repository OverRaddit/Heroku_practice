const express = require('express')
const bodyParser = require('body-parser')
const {WebhookClient} = require('dialogflow-fulfillment');

const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    console.log("test")
})

app.listen(port, () => {
    dialogflowFulfillment(request, response)
})

const dialogflowFulfillment = (request, response) => {
    const agent = new WebhookClient({request, response})

    function sayHello(agent){
        agent.add("Hi there, this response is coming from heroku")
    }

    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    //intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    agent.handleRequest(intentMap);
}