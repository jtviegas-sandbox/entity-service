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
                if( event.pathParameters && event.pathParameters.app && event.pathParameters.entity && event.requestContext && event.requestContext.stage ) {
                    let app = event.pathParameters.app;
                    let entity = event.pathParameters.entity;
                    let env = event.requestContext.stage;

                    if( event.pathParameters.id )
                        store.entityRetrieval(app, env, entity, parseInt(event.pathParameters.id), done);
                    else {
                        let params = {
                            id: 0
                            , pageSize: commons.defaultPageSize
                        };

                        if( event.queryStringParameters ){
                            try {
                                if (event.queryStringParameters.id)
                                    params.id = parseInt(event.queryStringParameters.id);
                                if (event.queryStringParameters.pageSize)
                                    params.pageSize = parseInt(event.queryStringParameters.pageSize);
                            } catch (e) {
                                logger.error("[entityService|handler] %o", e);
                            }
                        }

                        store.entitiesRetrieval(app, env, entity, params, done);
                    }

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



