const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'christiandleonr@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'christiandleonr@gmail.com',
        subject: 'We are sad to see you go',
        text: `Good bye ${name}. We will miss you :(`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEMail
}