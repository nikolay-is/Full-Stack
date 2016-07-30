const mongodb = require('mongodb');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('users').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs);
        }
    );
};

exports.find = function (request, reply) {
    this.db.collection('users', function (err, users_collection) {
        if (err) throw err;
        users_collection.findOne({ _id: new mongodb.ObjectID(request.params.usrId) },
            (err, users) => {
                if (err) throw err;
                if (users === null) {
                    reply(Boom.notFound(`users with Id=${request.params.usrId} not found.`));
                } else {
                    console.log(users);
                    reply(users);
                }

            });
    });
};

exports.create = function (request, reply) {
    let users = request.payload;
    let collection = this.db.collection('users');
    collection.insertOne(users).then((result) => {
        if (result.ops.length === 1) {
            const usersUri = request.raw.req.url + '/' + users._id;
            reply(users).created(usersUri);
        } else {
            reply(Boom.badRequest(`Invalid users data: ${users}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.update = function (request, reply) {
    let users = request.payload;
    let collection = this.db.collection('users');
    collection.findOneAndUpdate({ _id: new mongodb.ObjectID(request.params.usrId) }, users  ).then((result) => {
        if (result.ok) {
            users._id = request.params.usrId;
            //console.log(users);
            const usersUri = request.raw.req.url + '/' + users._id;
            reply(users).created(usersUri);
        } else {
            reply(Boom.badRequest(`Invalid users data: ${users}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.remove = function (request, reply) {
    this.db.collection('users', function (err, users_collection) {
        if (err) throw err;
        users_collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.usrId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    //console.log('Deleted: ', request.raw.req.url);
                    reply(result.value);
                } else {
                    reply(Boom.notFound(`users with Id=${request.params.usrId} not found.`));
                }
            });
    });
};