

const { createLogger, format, transports } = require('winston');


class MyLogger {
    constructor(route) {
        const logger =
            createLogger({
                // Log only if level is less than (meaning more severe) or equal to this
                level: 'debug',
                // Use timestamp and printf to create a standard log format
                format: format.combine(
                format.timestamp(),
                format.printf(
                    (info) => `${info.timestamp} ${info.level}: ${info.message}`
                )
                ),
                // Log to the console and a file
                transports: [
                new transports.Console(),
                new transports.File({ filename: `logs/${route}.log` }),
                ],
        });
        this.logger = logger;
    }
    async _d(data) {
        this.logger.debug(data);
    }
    async _i(data) {
        this.logger.info(data);
    }
    async _e(data) {
        this.logger.error(data);
    }
    async _w(data) {
        this.logger.warn(data);
    }
    async _iRequestParams(req){
        this._i(`Request params: ${JSON.stringify(req.params,' ', 2)}`);
    }
    setLevel(level) {
        this.logger.level = level;
    }
}
    
module.exports = MyLogger;
