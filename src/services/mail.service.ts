import { APP_EMAIL, APP_NAME, SENDGRID_API_KEY } from "@/config";
import sgMail, { MailDataRequired } from "@sendgrid/mail";
import path from "path";
import fs from "fs";
import { HttpException } from "@/exceptions/httpException";

class MailServices {
    constructor () {
        sgMail.setApiKey(SENDGRID_API_KEY);
    }

    public findReplaceMail = async (templatePath: string, findArray: string[], replaceArray: string[]) => {
        try {
            // Resolve the full path to the template file
            const mailTemplate = path.join(__dirname, templatePath);
            let mailContent = fs.readFileSync(mailTemplate, 'utf-8');

            // Ensure findArray and replaceArray are arrays and have matching lengths
            if (findArray.length === replaceArray.length) {
                // Loop through each find and replace pair
                findArray.forEach((findStr, i) => {
                    const replaceStr = replaceArray[i];

                    // Use global regular expressions to replace all occurrences
                    const regex = new RegExp(findStr, 'g');
                    mailContent = mailContent.replace(regex, replaceStr);
                });
            } else {
                throw new HttpException(500, 'Find and replace arrays must have the same length.');
            }

            return mailContent;
        } catch (error) {
            throw new HttpException(500, `Error processing mail template: ${error.message}`);
        }
    };


    sendEmail = async (to: string, subject: string, htmlMessage: string) => {
        // const from: mailD
        const msg: MailDataRequired = {
            to,
            from: {
                name: APP_NAME,
                email: APP_EMAIL
            },
            subject,
            ...(htmlMessage && { html: htmlMessage }), // Include html if provided
        };

        try {
            await sgMail.send(msg);
            console.log('Message sent');
        } catch (e) {
            console.error('Error sending email:', e.response ? e.response.body : e);
        }
    }

}

export default MailServices;