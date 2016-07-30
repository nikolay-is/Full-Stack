const handlersAds = require('./handlersAds');

const Joi = require('Joi');

const adSchema = Joi.object({
    title: Joi.string().min(5).max(70).required(),
    category: Joi.string().min(2).required(),
    description: Joi.string().min(2).max(4096).required(), //min 20
    author: Joi.string().min(2).max(50).required(),
    contact_person: Joi.string().min(2).max(50).required(),
    address: Joi.string().min(2).max(50).required(),    
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
    //validityDate: Joi.date().min('1-1-1900').max('now').iso().optional()
    picture : Joi.binary().optional(),
    //picture: Joi.Buffer(0),
    userId : Joi.string().length(24).optional()
});

module.exports = [
    {
    method: 'GET',
    path: '/api/ads',
    handler: handlersAds.findAll
    },
    {
        method: 'GET',
        path: '/api/ads/{adsId}',
        handler: handlersAds.find,
        config: {
            validate: {
                params: {
                    adsId: Joi.string().length(24).required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/ads',
        handler: handlersAds.create,
        config: {
            validate: {
                payload: adSchema
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/ads/{adsId}',
        handler: handlersAds.update,
        config: {
            validate: {
                params: {
                    adsId: Joi.string().length(24).required()
                },
                payload: adSchema
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/ads/{adsId}',
        handler: handlersAds.remove,
        config: {
            validate: {
                params: {
                    adsId: Joi.string().length(24).required()
                }
            }
        }
    }];
    
