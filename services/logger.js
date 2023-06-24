

const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
            // Log only if level is less than (meaning more severe) or equal to this
            level: "debug",
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
            new transports.File({ filename: "logs/app.log" }),
            ],
        });