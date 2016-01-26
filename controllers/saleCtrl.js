var saleModel = require('../models/saleModel');
var productModel = require('../models/productModel');


module.exports = {
    
    create: function(req, res){
        var sale = new saleModel(req.body);
        sale.save(function(err, result){
            if(err){res.send(err)}
            else{
                for(var i = 0; i < req.body.products.length; i++){
                    var count = i;
                    productModel.find({_id: req.body.products[count].product}, function(err1, result1){
                        var body = req.body.products[count];
                        var newData = result1[0];
                        newData.instock -= body.amount;
                        newData.totalsold += body.amount;
                        productModel.findByIdAndUpdate( req.body.products[count].product, newData, function(err2, result2){
                        })
                    })
                }
                res.send(result)
            }
        });
    },
    
    read: function(req, res){
        saleModel.find({}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readpop: function(req, res){
        saleModel.find({}).populate({path: 'client', select: 'firstname lastname -_id'}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'products.product' , select: 'brand name -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    readid: function(req, res){
        saleModel.find({_id: req.params.id}, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    readidpop: function(req, res){
        saleModel.find({_id: req.params.id}).populate({path: 'client', select: 'firstname lastname -_id'}).populate({path: 'stylist', select: 'firstname lastname -_id'}).populate({path: 'products', select: 'brand name price -_id'}).exec(function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    },
    
    update: function(req, res){
        saleModel.findByIdAndUpdate(req.params.id, req.body, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        });
    },
    
    delete: function(req, res){
        saleModel.findByIdAndRemove(req.params.id, function(err, result){
            if(err){res.send(err)}
            else{res.send(result)}
        })
    }
    
}