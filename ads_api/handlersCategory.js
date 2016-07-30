const mongodb = require('mongodb');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('categories').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs);
        }
    );
};

exports.find = function (request, reply) {
    this.db.collection('categories', function (err, categories_collection) {
        if (err) throw err;
        categories_collection.findOne({ _id: new mongodb.ObjectID(request.params.catId) },
            (err, categories) => {
                if (err) throw err;
                if (categories === null) {
                    reply(Boom.notFound(`categories with Id=${request.params.catId} not found.`));
                } else {
                    //console.log(categories);
                    reply(categories);
                }

            });
    });
};

exports.create = function (request, reply) {
    let categories = request.payload;
    let collection = this.db.collection('categories');
    collection.insertOne(categories).then((result) => {
        if (result.ops.length === 1) {
            const categoriesUri = request.raw.req.url + '/' + categories._id;
            reply(categories).created(categoriesUri);
        } else {
            reply(Boom.badRequest(`Invalid categories data: ${categories}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.update = function (request, reply) {
    let categories = request.payload;
    let collection = this.db.collection('categories');
    collection.findOneAndUpdate({ _id: new mongodb.ObjectID(request.params.catId) }, categories  ).then((result) => {
        if (result.ok) {
            categories._id = request.params.catId;
            const categoriesUri = request.raw.req.url + '/' + categories._id;
            reply(categories).created(categoriesUri);
        } else {
            reply(Boom.badRequest(`Invalid categories data: ${categories}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.remove = function (request, reply) {
    this.db.collection('categories', function (err, categories_collection) {
        if (err) throw err;
        categories_collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.catId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    reply(result.value);
                } else {
                    reply(Boom.notFound(`categories with Id=${request.params.catId} not found.`));
                }
            });
    });
};