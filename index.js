'use strict';

const winston = require('winston');
const ServerError = require('@jtviegas/jscommons').ServerError;
const commons = require('@jtviegas/jscommons').commons;
const store = require('@jtviegas/entity-store');
const logger = winston.createLogger(commons.getDefaultWinstonConfig());

const entityService = {

    handler : (event, context, callback) => {
        logger.info("[entityService|handler|in] <= %o", event);

        const done = (err, res) => callback( null, {
            statusCode: err ? err.status : 200,
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

        try{
            if( event.httpMethod !== 'GET' )
                throw new ServerError(`Unsupported method "${event.httpMethod}"`, 400);
            else {
                if( event.pathParameters && event.pathParameters.app && event.pathParameters.entity && event.pathParameters.env ) {
                    let app = event.pathParameters.app;
                    let entity = event.pathParameters.entity;
                    let env = event.pathParameters.env;

                    if( event.pathParameters.id )
                        store.entityRetrieval(app, env, entity, parseInt(event.pathParameters.id), done);
                    else
                        store.entitiesRetrieval(app, env, entity, done);
                }
                else
                    throw new ServerError("Unsupported path", 404);
            }
        }
        catch(e){
            logger.error("[entityService|handler] %o", e);
            done(e);
        }
        logger.info("[entityService|handler|out]");
    }

}

module.exports = entityService;



