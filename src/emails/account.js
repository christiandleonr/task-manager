const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

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