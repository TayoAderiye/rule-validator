const { response } = require("express");

// Making a conidition check middleware, passing condition, condition_value and value(req.body.data[field])
exports.conditionCheck = (condition, condition_value, value) => {
    let val;

    // if value is undefined
    if (value == undefined) {
        return val = undefined
    }

    // if the condition is 'gte'
    if (condition === 'gte') {

        // if value is greater than the condition_value or the value is equal to the condition_value
        if (value > condition_value || value == condition_value) return val = true;
        else return val = false;
    }
    // if the condition is 'eq'
    if (condition === 'eq') {

        // if value is equal to the condition_value 
        if (value == condition_value) return val = true;
        else return val = false;
    }

    // if the condition is 'gt'
    if (condition === 'gt') {

        // if value is greater than the condition_value 
        if (value > condition_value) return val = true;
        else return val = false;
    }

    // if the condition is 'neq'
    if (condition === 'neq') {

        // if value is not equal to the condition_value
        if (value != condition_value) return val = true;
        else return val = false;
    }

    // if the condition is 'contains'
    if (condition === 'contains') {

        // if value is an array or the value is a String
        if (Array.isArray(value) || typeof (value) == "string") {
            if (value.includes(condition_value)) {
                return val = true;
            }
            return val = false;
        }
        return val = false;
    }
    return val
}


// IsJsonString function to handle if req.body is a json object
function IsJsonString(str) {
    const strg = JSON.stringify
    try {
        console.log(JSON.parse(strg))
    } catch (e) {
        return false
    }
    return true
}

// Making a payload check middleware to ensure the authencity of the request
exports.payloadCheck = (req, res, next) => {

    // if the req.body is not a JSON object or is an array return "Invalid JSON payload"
    if (IsJsonString(req.body) || Array.isArray(req.body)) {
        return res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        })
    }

    // if the req.body.rule is undefined (if req.body.rule is missing) return "rule is required"
    if (req.body.rule == undefined) {
        return res.status(400).json({

            message: "rule is required.",
            status: "error",
            data: null

        })

    }
    // if the req.body.rule is is an array return "rule should be an object"
    if (Array.isArray(req.body.rule)) {
        return res.status(400).json({

            message: "rule should be an object.",
            status: "error",
            data: null

        })

    }
    // if the req.body.rule is is not an object return "rule should be an object"
    if (typeof (req.body.rule) != 'object') {
        return res.status(400).json({

            message: "rule should be an object.",
            status: "error",
            data: null

        })

    }
    // if the req.body.data is undefined (if req.body.data is missing) return "data is required"
    if (req.body.data == undefined) {
        return res.status(400).json({

            message: "data is required.",
            status: "error",
            data: null

        })
        // if the req.body.data is not a String and not an object return "data should be an object"
    } if (typeof (req.body.data) != "string" && typeof (req.body.data) != "object") {
        return res.status(400).json({
            message: "data should be an object.",
            status: "error",
            data: null

        })

    }
    // Destructuring of req.body.rule
    const { condition_value, condition, field } = req.body.rule

    // if condition_value field is missing return "condition_value is required."
    if (!condition_value) {
        return res.status(400).json({
            message: "condition_value is required.",
            status: "error",
            data: null
        })
    }
    // if condition field is missing return "condition is required."
    if (!condition) {
        return res.status(400).json({
            message: "condition is required.",
            status: "error",
            data: null
        })
    }
    // if field is missing return "field is required."
    if (!field) {
        return res.status(400).json({
            message: "field is required.",
            status: "error",
            data: null
        })
    }
    // if condition is not a String return "condition should be a string."
    if (typeof (condition) != 'string') {
        return res.status(400).json({
            message: "condition should be a string.",
            status: "error",
            data: null

        })
    }
    // if field is not a String return "field should be a string."
    if (typeof (field) != 'string') {
        res.status(400).json({
            message: "field should be a string.",
            status: "error",
            data: null
        })

    }
    // if condition_value is not a String  return "condition_value should be a string."
    if (typeof (condition_value) != 'string' && isNaN(condition_value)) {
        res.status(400).json({
            message: "condition_value should be a string.",
            status: "error",
            data: null
        })

    }
    next();
}