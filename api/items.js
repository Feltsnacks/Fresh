var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('giftr', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'giftr' database");
        db.collection('items', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'items' collection doesn't exist. Creating it with sample data...");
               populateDB();
            }
        });
    }
});
 
exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving item: ' + id);
    db.collection('items', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    console.log('Retrieving items');
    db.collection('items', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};
 
exports.add = function(req, res) {
    var listitem = req.body;
    console.log('Adding item: ' + JSON.stringify(listitem));
    db.collection('items', function(err, collection) {
        collection.insert(listitem, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}
 
exports.update = function(req, res) {
    var id = req.params.id;
    var listitem = req.body;
    console.log('Updating item: ' + id);
    console.log(JSON.stringify(user));
    db.collection('items', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, listitem, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating item: ' + err);
                res.send({'error':'An error has occurred'});
           } else {
                console.log('' + result + ' document(s) updated');
                res.send(listitem);
            }
        });
    });
}
 
exports.del = function(req, res) {
    var id = req.params.id;
    console.log('Deleting item: ' + id);
    db.collection('items', function(err, collection) {
       collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.

var populateDB = function() {
 
    var items = [
    {
        name: "Kindle Paperwhite",
        listid: "52344acb44a5e97c2f000001",
        url: "http://www.amazon.com/Kindle-Paperwhite-Touch-light/dp/B007OZNZG0",
        imgurl: "http://fpoimg.com/300x300?text=giftr",
        price: "139.00",
        currency: "USD"
    },
    {
        name: "Kindle Paperwhite",
        listid: "52344acb44a5e97c2f000003",
        url: "http://www.amazon.com/Kindle-Paperwhite-Touch-light/dp/B007OZNZG0",
        imgurl: "http://fpoimg.com/300x300?text=giftr",
        price: "139.00",
        currency: "USD"
    },
    {
        name: "Kindle Paperwhite",
        listid: "52344acb44a5e97c2f000004",
        url: "http://www.amazon.com/Kindle-Paperwhite-Touch-light/dp/B007OZNZG0",
        imgurl: "http://fpoimg.com/300x300?text=giftr",
        price: "139.00",
        currency: "USD"
    },
    {
        name: "Kindle Paperwhite",
        listid: "52344acb44a5e97c2f000002",
        url: "http://www.amazon.com/Kindle-Paperwhite-Touch-light/dp/B007OZNZG0",
        imgurl: "http://fpoimg.com/300x300?text=giftr",
        price: "139.00",
        currency: "USD"
    }];
 
    db.collection('items', function(err, collection) {
        collection.insert(items, {safe:true}, function(err, result) {});
    });

};