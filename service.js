"use strict";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// All defined query params
const lower_key = 'lower';
const upper_key = 'upper';
const min_limit_key = 'min limit';
const max_limit_key = 'max limit';


app.get('/randnum', (req, res) => {
    let data = {}
    console.log('\nRequest received:\n', req.query);

    // Default query params values
    let lower = 1;          // The lowest generated value
    //  upper = *provided*     The largest generated value
    let min_limit = 1;      // The minimum accepted value 
    let max_limit = 1000;   // The maximum accepted value

    try
    {
        // Required parameters
        if( !(upper_key in req.query) )
        {
            throw new Error('Missing required parameter');
        }
        
        const upper = Number(req.query[upper_key]);
        
        if( !isInt(upper) )
        {
            throw new Error(`Invalid type of '${upper_key}'`);
        }


        // Optional parameters and input checks
        if( (min_limit_key in req.query) )
        {
            min_limit = Number(req.query[min_limit_key]);
            
            if( !isInt(min_limit) )
            {
                throw new Error(`Invalid type of '${min_limit_key}'`);
            }
        }

        if( (max_limit_key in req.query) )
        {
            max_limit = Number(req.query[max_limit_key]);

            if( !isInt(max_limit) )
            {
                throw new Error(`Invalid type of '${max_limit_key}'`);
            }
        }

        if( (lower_key in req.query) )
        {
            lower = Number(req.query[lower_key]);

            if( !isInt(lower) )
            {
                throw new Error(`Invalid type of '${lower_key}'`);
            }
        }
        


        // Range checks
        if( min_limit > max_limit )
        {
            throw new Error('Limits error');
        }
        else if( lower > upper )
        {
            throw new Error('Values error');
        }
        else if( upper < min_limit || upper > max_limit || lower < min_limit || lower > max_limit)
        {
            throw new Error('Out of range');
        }
        else
        {
            // Valid request... process and send response
            let randnum = generate_random(lower, upper);
            console.log('Generated number:', randnum);

            data = 
            {
                number: randnum
            };

            return res.status(200).send(data);
        }
    }
    catch(err)
    {
        if(err.message === 'Missing required parameter')
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - the '${upper_key}' key was not found.`
            })
        }
        else if(err.message === 'Out of range')
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - the '${lower_key}' and|or '${upper_key}' values must be in the closed range [${min_limit} - ${max_limit}].`
            })
        }
        else if(err.message === 'Values error')
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - the '${lower_key}' value must not be greater than the '${upper_key}' value.`
            })
        }
        else if(err.message === 'Limits error')
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - the '${min_limit_key}' value must not be greater than the '${max_limit_key}' value.`
            })
        }
        else if(err.message === `Invalid type of '${min_limit_key}'`)
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - query value must be of type integer.`
            })
        }
        else if(err.message === `Invalid type of '${max_limit_key}'`)
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - query value must be of type integer.`
            })
        }
        else if(err.message === `Invalid type of '${lower_key}'`)
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - query value must be of type integer.`
            })
        }
        else if(err.message === `Invalid type of '${upper_key}'`)
        {
            console.log(`Error raised: ${err.message}.`);
            return res.status(400).json({
                error: `${err.message} - query value must be of type integer.`
            })
        }
        else
        {
            console.log('Error raised: Bad request.');
            return res.status(400).json({
                error: `Bad request.`
            })
        }
    }
})


function generate_random(lower, upper)
{
    // Generate a random int from the closed range ['lower', 'upper']
    // which also should be in the closed range ['min_limit', 'max_limit'] 
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}


function isInt(input)
{
    return !isNaN(input) || Number.isInteger(input);
}


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});