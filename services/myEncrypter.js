const bcrypt = require("bcrypt")

class myEncrypter {
    constructor() {
        this.saltRounds = 10;
        this.encrypt = this.encrypt.bind(this);
    }

    async encrypt(password) {
        return bcrypt.hash(password, this.saltRounds);
    }

    async compare(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = myEncrypter;
