const handlersUsr = require('./handlersUser');

const Joi = require('Joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    role: Joi.string().required()
});

module.exports = [
    {
        method: 'GET',
        path: '/api/users',
        handler: handlersUsr.findAll
    },
    {
        method: 'GET',
        path: '/api/users/{usrId}',
        handler: handlersUsr.find,
        config: {
            validate: {
                params: {
                    usrId: Joi.string().length(24).required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/users',
        handler: handlersUsr.create,
        config: {
            validate: {
                payload: userSchema
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/users/{usrId}',
        handler: handlersUsr.update,
        config: {
            validate: {
                params: {
                    usrId: Joi.string().length(24).required()
                },
                payload: userSchema
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/users/{usrId}',
        handler: handlersUsr.remove,
        config: {
            validate: {
                params: {
                    usrId: Joi.string().length(24).required()
                }
            }
        }
    }];
    
