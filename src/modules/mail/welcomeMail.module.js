import { mailjet } from "./services/config.service.js"
import { MailGenerator } from "./services/mailGenerator.service.js"
import { MailSender } from "./services/messageFrom.service.js"



export const welcomeMessageSender = function (receiverFullName, receiverEmail, role) {

    const email = {
        body: {
            title: "Welcome to Foodlie App",
            name: receiverFullName,
            intro: `Congratulations <b>${receiverFullName}</b>, you have successfully registered as a ${role} but registration not completed, follow the next procedure to complete your registration.`,
            
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
                    "Subject": "Welcoming message",
                    "HTMLPart": emailBody
                }
            ]
        })

    request.then((result) => {
        return {
            status: true,
            msg: "Message sent successfully"
        }
    })
    .catch((err) => {
        return {
            status: false,
            msg: "Message sent failed"
        }
    })
    
}