// const { Resend } = require('resend');

// const resend = new Resend(process.env.API_RESEND);

// const sendEmailController = async (req, res) => {
//     try {
//         const { name, email, message } = req.body;

//         // Validation
//         if (!name || !email || !message) {
//             return res.status(400).send({
//                 success: false,
//                 message: "Please provide all fields",
//             });
//         }

//         // Send email using Resend
//         const data = await resend.emails.send({
//             from: 'Acme <onboarding@resend.dev>',
//             to: ['ismailmasood37@gmail.com'], // where you want to receive contact messages
//             subject: 'Regarding Portfolio ',
//             html: `
//         <h5>Detail Information</h5>
//         <ul>
//           <li><p><strong>Name:</strong> ${name}</p></li>
//           <li><p><strong>Email:</strong> ${email}</p></li>
//           <li><p><strong>Message:</strong> ${message}</p></li>
//         </ul>
//       `,
//         });

//         return res.status(200).send({
//             success: true,
//             message: "Your message was sent successfully!",
//             data,
//         });
//     } catch (error) {
//         console.error("Resend error:", error);
//         return res.status(500).send({
//             success: false,
//             message: "Failed to send message",
//             error,
//         });
//     }
// };

// module.exports = { sendEmailController };




// In Controllers/portfolioController.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendEmailController = async (req, res) => {
    const { name, email, message } = req.body;
    console.log("Received request body:", req.body);
    console.log("Using EMAIL:", process.env.EMAIL);


    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: `Message from Portfolio by ${name}`,
            html: `
        <h2>Contact Details</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Email sent successfully!',
        });
    } catch (error) {
        console.error('Resend error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error,
        });
    }
};

module.exports = { sendEmailController };
