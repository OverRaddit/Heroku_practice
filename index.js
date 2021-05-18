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
        agent.add("안녕하세요오오오오오~~")
    }

    // 인텐트와 함수를 1대1 대응 시키는 객체 intentMap
    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", sayHello)
    intentMap.set("Lecture", sayHello)
    agent.handleRequest(intentMap);
}