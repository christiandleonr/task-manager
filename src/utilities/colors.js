const chalk = require('chalk')

success = chalk.green
warning = chalk.yellow
error = chalk.red
message = chalk.white.underline
route = chalk.blue.underline

module.exports = {
    success,
    warning,
    error,
    message,
    route
}