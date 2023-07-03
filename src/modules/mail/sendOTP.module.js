import { mailjet } from "./services/config.service.js"
import { MailGenerator } from "./services/mailGenerator.service.js"
import { MailSender } from "./services/messageFrom.service.js"



export const OTPSender = function (receiverEmail, receiverFullName, otp) {

    const email = {
        body: {
            title: `Hi! ${receiverFullName}`,
            name: receiverFullName,
            // intro: `Hi! ${receiverFullName}`,
            action: {
                instructions: 'This is your OTP code, do not share with any one',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: `<b style="font-size: 18px;">OTP: ${otp}</b>`,
                    // link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                }
            },
            // outro: messageBody,
            greetings: true,
            signature: false,
        }
    }
    
    const emailBody = MailGenerator.generate(email)

    const request =  mailjet.post("send", { 'version': 'v3.1' })
        .request({
            "Messages": [
                {
                    "From": MailSender,
                    "To": [
                        {
                            "Email": receiverEmail,
                            "Name": receiverFullName
                        }
                    ],
                    "Subject": "OTP Verification code",
                    "HTMLPart": emailBody
                }
            ]
        })

    request.then((result) => {
        return {result: result.body, msg: "Message sent successfully"}
    })
    .catch((err) => {
        return {result: err.statusCode, msg: "Message sent failed"}
    })
    
}