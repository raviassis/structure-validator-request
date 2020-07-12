const { attributes } = require('structure');
//validate body request
exports.validate = (attributesValidators) => {
    return (req, res, next) => {
        try {
            const validator = attributes(attributesValidators)(class {});
            const validation = new validator(req.body).validate();
            if (!validation.valid) {
                res.status(422).json(validation.errors);
                return;
            }
            next();
        } catch (error) {
            next(error);
        }        
    };    
};