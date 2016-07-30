const mongodb = require('mongodb');
const Boom = require('boom');

exports.findAll = function (request, reply) {
    this.db.collection('ads').find().toArray(
        function (err, docs) {
            if (err) throw err;
            reply(docs);
        }
    );
};

exports.find = function (request, reply) {
    this.db.collection('ads', function (err, ads_collection) {
        if (err) throw err;
        ads_collection.findOne({ _id: new mongodb.ObjectID(request.params.adsId) },
            (err, ads) => {
                if (err) throw err;
                if (ads === null) {
                    reply(Boom.notFound(`Ads with Id=${request.params.adsId} not found.`));
                } else {
                    reply(ads);
                }

            });
    });
};

exports.create = function (request, reply) {
    let ads = request.payload;
    let collection = this.db.collection('ads');
    ads.validityDate = new Date(new Date().setDate(new Date().getDate() + 60));


    collection.insertOne(ads).then((result) => {
        if (result.ops.length === 1) {
            const adsUri = request.raw.req.url + '/' + ads._id;
            //picture: Buffer(0),
            // user : new mongodb.ObjectID
            reply(ads).created(adsUri);
        } else {
            reply(Boom.badRequest(`Invalid ads data: ${ads}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.update = function (request, reply) {
    let ads = request.payload;
    let collection = this.db.collection('ads');
    collection.findOneAndUpdate({ _id: new mongodb.ObjectID(request.params.adsId) }, ads  ).then((result) => {
        if (result.ok) {
            console.log('Updated: ', request.raw.req.url);
            ads._id = request.params.adsId;
            console.log(ads);
            const adsUri = request.raw.req.url + '/' + ads._id;
            reply(ads).created(adsUri);
        } else {
            reply(Boom.badRequest(`Invalid ads data: ${ads}`));
        }
    }).
    catch((err) => {
        reply(Boom.badImplementation(`Server error: ${err}`));
    });
};

exports.remove = function (request, reply) {
    this.db.collection('ads', function (err, ads_collection) {
        if (err) throw err;
        ads_collection.findOneAndDelete({ _id: new mongodb.ObjectID(request.params.adsId) },
            (err, result) => {
                if (err) throw err;
                if (result.ok) {
                    console.log('Deleted: ', request.raw.req.url);
                    //reply(replaceId(result.value));
                    reply(result.value);
                } else {
                    reply(Boom.notFound(`Ads with Id=${request.params.adsId} not found.`));
                }
            });
    });
};