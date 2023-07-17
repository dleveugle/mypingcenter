const svc = require('../services');

const pass = 'BLABLA';

const e = new svc.encrypter();


e.compare(pass,  '$2b$10$Ubj7XCyf7SVIL6fBU4.1kuTZAb6.jhTmQl8bGV1Gf/aX7E8oDeR6q')
    .then(data => {console.log(data);});