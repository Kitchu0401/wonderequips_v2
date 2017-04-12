import express from 'express';
import Log from './../models/log';
import Message from './../models/message';

const router = express.Router();

const RESPONSE_COMMON_SUCCESS = { result: 1 };
const RESPONSE_COMMON_FAILURE = { result: 0 };

// Log: insert
router.post('/log', function(req, res) {
    var log = new Log();
    log.type = req.body.type;

    log.save(function(err) {
        if ( err ) {
            console.error(err);
            res.json(RESPONSE_COMMON_FAILURE);
            return;
        }

        res.json(RESPONSE_COMMON_SUCCESS);
    });
});

// Message: insert
router.post('/message', function(req, res) {
    var message = new Message();
    message.content = req.body.content;

    message.save(function(err) {
        if ( err ) {
            console.error(err);
            res.json(RESPONSE_COMMON_FAILURE);
            return;
        }

        res.json(RESPONSE_COMMON_SUCCESS);
    });
});

// Message: select
router.get('/message', function(req, res) {
    Message.find().limit(5).sort({ published_date: -1 }).exec(function(err, messageList) {
        if ( err ) { 
            res.json(RESPONSE_COMMON_FAILURE);
            return;
        }

        res.json({ 
            result: 1,
            messageList: messageList
        });
    });
});

module.exports = router;