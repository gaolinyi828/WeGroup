const jwt = require('jsonwebtoken');
const secret = 'mysecretkey';

const auth = function (req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.header('x-auth-token');

    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        try {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.user = decoded.user;
                    next();
                }
            });
        } catch (err) {
            console.error('Something wrong with auth middleware');
            res.status(500).send('Server error');
        }
    }
}

module.exports = auth;
