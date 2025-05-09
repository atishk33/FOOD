const jwt = require('jsonwebtoken');

const generateToken = (id, tokenVersion) => {
    return jwt.sign({ id, tokenVersion }, "secret-key", {
        expiresIn: "1d"
    });
};

module.exports = { generateToken };
