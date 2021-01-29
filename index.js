const express = require('express')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express()




app.use(express.json())


// Handling unexpected token in JSON positions
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err)
        return res.status(400).json({
            message: "Invalid JSON payload passed.",
            status: "error",
            data: null
        })
    } next()
})


//Details route file
const detail = require('./routes/details')

//RuleValidation route file
const ruleval = require('./routes/rulevalidation')


//Mount Details router
app.use('/', detail)

//Mount RuleValidation router
app.use('/validate-rule', ruleval)





const PORT = process.env.PORT || 5000

const server = app.listen(
    PORT,
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`))