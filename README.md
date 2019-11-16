[![Build Status](https://travis-ci.org/jtviegas/entity-service.svg?branch=master)](https://travis-ci.org/jtviegas/entity-service)
[![Coverage Status](https://coveralls.io/repos/github/jtviegas/entity-service/badge.svg?branch=master)](https://coveralls.io/github/jtviegas/entity-service?branch=master)

entity-service
=========

a generic crud service for entities

![overview][overview]


## Installation

  `npm install @jtviegas/entity-service`

## Usage

### required environment variables
    
    - region - aws region ( not mandatory, default: eu-west-1 )
    - AWS_ACCESS_KEY_ID ( mandatory )
    - AWS_SECRET_ACCESS_KEY ( mandatory )
    - DYNDBSTORE_TEST_ENDPOINT ( not mandatory, for testing purposes )

### code snippet example

    let service = require('@jtviegas/entity-service');
    let event = {
                    httpMethod: 'GET'
                    , pathParameters: {
                        entity: ENTITY
                        , app: APP
                        , env: ENV
                    }
                };
    service.handler(event, context, (e,d)=>{
        if(e)
            done(e);
        else {
            let r=JSON.parse(d.body);
            expect(r.length).to.equal(TEST_ITERATIONS);
            done(null);
        }
    });

    
## Tests

  `npm test`

## Contributing

    just help yourself and submit a pull request

[overview]: assets/overview.png "overview"