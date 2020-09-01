const chalk = require('chalk')

success = chalk.green
warning = chalk.yellow
error = chalk.red
message = chalk.white.underline

module.exports = {
    success,
    warning,
    error,
    message
}