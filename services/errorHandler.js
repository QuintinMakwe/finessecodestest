module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.status = err.status ? err.status :  'error';

    if(err.name == "JsonWebTokenError"){
        err.message = "You aren't authorized to set password until you provide a valid token"
        err.statusCode = 403
    }

    if(err.name == "SequelizeUniqueConstraintError"){
        err.message = err.errors[0].message
    }
    return res.status(err.statusCode).json({status: err.status, message: err.message, stackTrace: err.stack})
}