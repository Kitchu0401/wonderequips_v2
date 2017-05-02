var axios = require('axios')

var instance = axios.create({ baseUrl: 'http://kitchu.lazecrew.com/WonderEquips/api/' })

instance.get('message').then(function(a, b) { console.log(a, b) })