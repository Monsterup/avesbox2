let redis = require('../../../redis-client');
Model = require('../models/birdsManagementModel');

exports.index = function(req, res){
    redis.get('all-livestock13', function (err, reply) {
        if (err) res.json(null);
        else if (reply) 
            res.json(JSON.parse(reply));
        else {
            //LVSTK doesn't exist in cache - we need to query the main database
            Model.get(function(err, doc){
                // function (err, doc) {
                if (err || !doc) res.json(null);
                else {//Lvstk found in database, save to cache and return to client
                    redis.set('all-livestock13',JSON.stringify({from : 'redis-server',doc}))
                    res.json(doc);
                }
            })
        }
    });
}
exports.store = function(req,res){
    var lvstk = new Model();
    lvstk.eartag = req.body.eartag ? req.body.eartag : lvstk.eartag;
    lvstk.pemilik = req.body.pemilik;
    lvstk.alamat = req.body.alamat;
    lvstk.save(function(err){
        if(err)
            res.json(err)
        
        res.json({
            message : 'tambah data berhasil',
            data : lvstk
        })
    })
}

exports.indexCached = function(req, res){
    Lvstk.get(function(err, lvstks){
        if(err){
            res.json({
                status : 'error',
                message : err
            })
        }
        res.json({
            status : 'success',
            data : lvstks
        })
    })
}