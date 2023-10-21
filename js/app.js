const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const path = require('path');

const app = express();
const port = process.env.Port || 3000;
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'../')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'../index.html'));
});

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname, '../contact.html'));
});

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ringrealityrs@gmail.com",
      pass: "xawq itas mxcj dqjh "
    }
});

app.post('/contact-form', (req, res) => {
    const { name, email, message, date, subject ,phone } = req.body;

    const mailOptions = {
        from: req.body.email,
        to: 'ringrealityrs@gmail.com',
        subject: req.body.subject,
        text: `
            name: ${name}
            email: ${email}
            message: ${message}
            date: ${date}
            phone: ${phone}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            alert('There was an error sending your message. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
        

            res.json({ success: true });


        }
    });
});

app.post('/send-mail', (req, res) => {
    const { name, email, message, date, subject ,phone} = req.body;

    const mailOptions = {
        from: req.body.email,
        to: 'ringrealityrs@gmail.com',
        subject: req.body.subject,
        text: `
            name: ${name}
            email: ${email}
            message: ${message}
            date: ${date}
            phone: ${phone}

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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});