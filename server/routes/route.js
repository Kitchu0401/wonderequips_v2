import express from 'express';
import Log from './../models/log';
import Message from './../models/message';

const router = express.Router();

// router.get('/test', (req, res) => {
//     res.json({ result: 'hayo!' });
// });

// Log: insert
router.post('/log', function(req, res) {
    var log = new Log();
    log.type = req.body.type;

    log.save(function(err) {
        if ( err ) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }

        res.json({ result: 1 });
    });
});

// Message: insert
router.post('/message', function(req, res) {
    var message = new Message();
    message.content = req.body.content;

    message.save(function(err) {
        if ( err ) {
            console.error(err);
            res.json({ result: 0 });
            return;
        }

        res.json({ result: 1 });
    });
});

// Message: select
router.get('/message', function(req, res) {
    // var message = new Message();
    // message.content = req.body.content;
    // 
    // message.save(function(err) {
    //     if ( err ) {
    //         console.error(err);
    //         res.json({ result: 0 });
    //         return;
    //     }
    // 
    //     res.json({ result: 1 });
    // });

    // TODO temp response
    res.json({ result: 1 });
});

module.exports = router;