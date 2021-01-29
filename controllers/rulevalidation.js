const { conditionCheck } = require('../utils/condition')

//@des       Get the Information of Applicant 
//@route     GET 
//@access    public
exports.getInfo = (req, res, next) => {
    const info = {
        name: 'Tayo Aderiye Oluwasijibomi',
        github: '@TayoAderiye',
        email: 'tayoriye@gmail.com',
        mobile: "08103676641",
    }
    const msg = "My Rule-Validation API"
    const stat = "success"
    res.status(200).json({
        message: msg,
        status: stat,
        data: info
    })
}


//@des       Rule Validation
//@route     POST 
//@access    public

exports.rules = (req, res, next) => {

    // Destructuring of req.body.rule
    const { condition, condition_value, field } = req.body.rule;

    // Splitting field with '.' and passing it to variable list
    var list = field.split('.')

    //if the count of variable list after being split is less than 2
    if (list.length < 2) {

        //Perform all condition checks from ('../utils/condition')
        var check = conditionCheck(condition, condition_value, req.body.data[field])


        // if the check is valid give the response
        if (check) {
            res.status(200).json({
                message: `field ${field} successfully validated.`,
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: field,
                        field_value: req.body.data[field],
                        condition: condition,
                        condition_value: condition_value
                    }
                }
            })

            // If check is undefined (if rule object is missing) give the response
        } if (check == undefined) {
            return res.status(400).json({
                message: `field ${field} is missing from data.`,
                status: "error",
                data: null
            })
        }

        // if the check is not valid give the response
        if (!check) {
            return res.status(400).json({
                message: `field ${field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: field,
                        field_value: req.body.data[field],
                        condition: condition,
                        condition_value: condition_value
                    }
                }
            })
        }
    }
    //If after spliiting and list length is 2
    else if (list.length == 2) {

        // Perform all condition checks from ('../utils/condition')
        var check = conditionCheck(condition, condition_value, req.body.data[list[0]][list[1]])
        if (check) {
            res.status(200).json({
                message: `field ${field} successfully validated.`,
                status: "success",
                data: {
                    validation: {
                        error: false,
                        field: field,
                        field_value: req.body.data[list[0]][list[1]],
                        condition: condition,
                        condition_value: condition_value
                    }
                }
            })

            // If check is undefined (if a field is missing) give the response  
        } else if (check == undefined) {
            return res.status(400).json({
                message: `field ${field} is missing from data.`,
                status: "error",
                data: null
            })
        }
        // if the check is not valid give the response
        else if (!check) {
            return res.status(400).json({
                message: `field ${field} failed validation.`,
                status: "error",
                data: {
                    validation: {
                        error: true,
                        field: field,
                        field_value: req.body.data[field],
                        condition: condition,
                        condition_value: condition_value
                    }
                }
            })
        }
    }


}