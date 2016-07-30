const handlersCat = require('./handlersCategory');

const Joi = require('Joi');

const categorySchema = Joi.object({
    name: Joi.string().min(2).required()
});

module.exports = [
    {
        method: 'GET',
        path: '/api/categories',
        handler: handlersCat.findAll
    },
    {
        method: 'GET',
        path: '/api/categories/{categoriyId}',
        handler: handlersCat.find,
        config: {
            validate: {
                params: {
                    catId: Joi.string().length(24).required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/categories',
        handler: handlersCat.create,
        config: {
            validate: {
                payload: categorySchema
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/categories/{catId}',
        handler: handlersCat.update,
        config: {
            validate: {
                params: {
                    catId: Joi.string().length(24).required()
                },
                payload: categorySchema
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/categories/{catId}',
        handler: handlersCat.remove,
        config: {
            validate: {
                params: {
                    catId: Joi.string().length(24).required()
                }
            }
        }
    }];
    
