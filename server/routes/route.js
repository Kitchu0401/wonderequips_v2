import express from 'express';
import Log from './../models/log';
import Message from './../models/message';
import Champ from './../models/champ';
import Test from './../models/test';

const router = express.Router();

const RESPONSE_COMMON_SUCCESS = { result: 1 };
const RESPONSE_COMMON_FAILURE = { result: 0 };

const MESSAGE_INTERVAL = 10 * 1000;

// Log: insert
router.post('/log', function(req, res) {
    var log = new Log();
    log.type = req.body.type;

    log.save(function(err) {
        if ( err ) {
            console.error(err);
            res.json(RESPONSE_COMMON_FAILURE);
        }

        res.json(RESPONSE_COMMON_SUCCESS);
    });
});

// Message: insert
router.post('/message', function(req, res) {
    // check recent message
    var last_published_date = req.session.last_published_date;
    if ( last_published_date && last_published_date + MESSAGE_INTERVAL > Date.now() ) {
        res.json({ result: 0, message: 'There\'s message recently sent!' });
    }

    // set session attribute
    var published_date = Date.now();
    req.session.last_published_date = published_date;
    
    // save and return recently saved messages
    new Message({
        content: req.body.content,
        published_date: published_date
    })
    .save()
    .then(function(inserted) {
        Message
            .find()
            .limit(5)
            .sort({ published_date: -1 })
            .exec()
            .then(function(messageList) { 
                res.json({
                    result: 1,
                    messageList: messageList
                });
            });
    })
    .catch(function(err) {
        console.error(err);
        res.json(RESPONSE_COMMON_FAILURE);
    });
});

// Message: select
router.get('/message', function(req, res) {
    Message.find().limit(5).sort({ published_date: -1 }).exec(function(err, messageList) {
        if ( err ) { 
            res.json(RESPONSE_COMMON_FAILURE);
        }

        res.json({ 
            result: 1,
            messageList: messageList
        });
    });
});

// Champ: insert (Off from front-end)
router.post('/champ', function(req, res) {
    try {
        var data = JSON.parse(req.body.champString);

        // insert one document
        if ( Array.isArray(data) ) {
            Champ.remove(function(err) {
                if ( err ) {
                    console.error(err);
                    throw 'An error occured during removing documents!';
                }

                Champ.insertMany(data, function(err, docs) {
                    if ( err ) { 
                        console.error(err);
                        throw 'An error occured during saving documents!';
                    }

                    Champ.find().exec().then(function(champList) {
                        res.json({
                            result: 1,
                            count: champList.length,
                            champList: champList
                        });
                    });
                });
            });
        }
        // insert multiple documnets
        else if ( typeof data === 'object' ) {
            Champ.remove(function(err) {
                if ( err ) {
                    console.error(err);
                    throw 'An error occured during removing documents!';
                }

                new Champ(data).save(function(err) {
                    if ( err ) {
                        console.error(err);
                        throw 'An error occured during saving documents!';
                    }

                    Champ.find().exec().then(function(champList) {
                        res.json({
                            result: 1,
                            count: champList.length,
                            champList: champList
                        });
                    });
                });
            });

        }
        else {
            throw 'Invalid parameter type: ' + typeof data;
        }
    } catch(err) {
        console.error(err);
        res.json(RESPONSE_COMMON_FAILURE);
    }
});

// Champ: select
router.get('/champ', function(req, res) {
    Champ
    .find()
    .exec()
    .then(function(champList) {
        res.json({
            result: 1,
            count: champList.length,
            champList: champList
        });
    })
    .catch(function(err) {
        res.json(RESPONSE_COMMON_FAILURE);
    });
});

// Test: insert
router.post('/test', function(req, res) {
    console.log(req.body.message);
    new Test({ message: req.body.message })
        .save()
        .then(function(inserted) {
            Test
                .find()
                .limit(5)
                .sort({ datetime: -1 })
                .exec()
                .then(function(found) { res.json({ data: found }); })
        })
        .catch(function(err) { console.error(err); })
});

module.exports = router;