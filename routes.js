var citymaster = require('./models/citymaster');
//var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var Book = require('./models/Book.js');
var Product = require('./models/Product.js');

module.exports = {
    configure: function (app) {

        

        app.get('/api/getcitymaster/:cityid', function (req, res) {
            // console.log(req +"asad"+ cityid);
            citymaster.getcitymaster(req.params.cityid, res);
        });
        // app.post('/api/addcitymaster/', function (req, res) {
		// 	console.log("hii asad"+req);
        //     citymaster.addcitymaster(req.body,res);
        // });
        app.post('/api/editcitymaster/', function (req, res) {
            citymaster.editcitymaster(req.body, res);
        });
        app.delete('/api/deletecitymaster/:cityid', function (req, res) {
            citymaster.deletecitymaster(req.params.cityid, res);
        });
        // app.get('/api/listcitymaster/', function (req, res) {
        //     citymaster.listcitymaster(res);
        // });

        app.get('/api/listcitymaster', function(req, res, next) {
            Book.find(function (err, products) {
              if (err) return next(err);
              res.json(products);
            });
          });




        app.post('/api/addcitymaster/', function(req, res, next) {
            
            Book.create(req.body, function (err, post) {
                //console.log(req.body);
                if (err) {
                    res.send({
                        status: 1,
                        message: 'citymaster creation failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: 'citymaster created successfully'
                    });
                }
            });
          });

          app.post('/api/addproduct/', function(req, res, next) {
            
            Product.create(req.body, function (err, post) {
                console.log(req.body);
                if (err) {
                    res.send({
                        status: 1,
                        message: 'Product creation failed'
                    });
                } else {
                    res.send({
                        status: 0,
                        message: 'Product created successfully'
                    });
                }
            });
          });
          
          app.get('/api/listproduct', function(req, res, next) {
            Product.find()
            .lean()
            .populate('id', 'categotyname')
            .exec((err, products) => {
                if (err) { console.log(err); return next(err)};
                console.log(products)
                res.json(products);
              })
          });

       
    }
};