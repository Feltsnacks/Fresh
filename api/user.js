var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('giftr', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'giftr' database");
        db.collection('users', {strict:true}, function(err, collection) {
            if (err) {
                console.log("The 'users' collection doesn't exist. Creating it with sample data...");
               populateDB();
            }
        });
    }
});

exports.findOrCreate = function (profile) {
    var fbid = profile.id;
    console.log('Retrieving user: ' + fbid);
    db.collection('users', function(err, collection) {
        collection.findOne({'id':new BSON.ObjectID(fbid)}, function(err, item) {
            if (err) {
                collection.insert(user, {safe:true}, function(err, result) {
                    if (err) {
                        res.send({'error':'An error has occurred'});
                    } else {
                        console.log('Success: ' + JSON.stringify(result[0]));
                        res.send(result[0]);
                    }
                });
            } else {
                res.send(item);
            }
        });
    });
};

exports.findById = function (req, res) {
    var id = req.params.id;
    console.log('Retrieving user: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
 
exports.findAll = function(req, res) {
    console.log('Retrieving users');
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.add = function (req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
        db.collection('users', function(err, collection) {
            collection.insert(user, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        });
};

exports.update = function (req, res) {
    var id = req.params.id;
    var user = req.body;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
        db.collection('users', function(err, collection) {
            collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
                if (err) {
                    console.log('Error updating user: ' + err);
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('' + result + ' document(s) updated');
                    res.send(wine);
                }
            });
        });
};

exports.del = function (req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
        db.collection('users', function(err, collection) {
            collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred - ' + err});
               } else {
                    console.log('' + result + ' document(s) deleted');
                    res.send(req.body);
                }
            });
        });
};
 
/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.

var populateDB = function() {
 
    var users = [
    {
        username: "hansgra",
        fullname: "Hans Christian Granum",
        password: "tullball",
        email: "hansemann@hjemme.no"
    },
    {
        username: "awelin",
        fullname: "Alex Welin",
        password: "hemmelig",
        email: "alex@thehouse.com"
    }];
 
    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
 
};