const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const port = 3000;
const server = http.Server(app);

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use( express.static(path.join(__dirname,'../')));



app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname,'../index.html'));
});

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "mohmmdcapo13@gmail.com",
      pass: "cbzo uztr xjki wjbo"
    }
  });

app.post('/contact-form', (req, res) => {
    const { name, email, message,date  } = req.body;

    const mailOptions = {
        from: email,
        to: 'mohmmdcapo13@gmail.com',
        subject: 'Contact Form Submission',
        text: `
            name: ${name}
            email: ${email}
            message: ${message}
            date: ${date}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.json({ success: false });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true });
        }
    });
});
// app.get('/', (req, res) => {
//     res.send('Welcome to the Contact Form App'); // You can customize this response
// });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
