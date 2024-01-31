const nodemailer = require("nodemailer");
const config = require("../config/config");
exports.Activity = async function (email, name) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply@mrmint.io",
      pass: "Espsoft123#",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  let mailOptions = {
    from: "noreply@mrmint.io",
    to: `${email}`,
    subject: "Welcome to the Stepmint Family!",
    html: `<head>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 10200px;
            margin: 20px auto;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
        }

        .card {
            padding-bottom: 20px;
        }

        img {
            height: auto;
           margin: auto;

        }

        h2 {
            color: #008080;
        }

        p {
            font-size: 16px;
            line-height: 1.5;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        ul li {
            margin-bottom: 10px;
        }

        a {
            color: #008080;
            text-decoration: none;
        }

        a:hover {
            text-decoration: underline;
        }

        .iconSpan{
         width:"5px";
         height:"5px";   
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <p>Dear Esteemed Stepmint Family!</p>
            
            <p>We are thrilled to have you on board as a valued member of our dynamic community that's not only redefining crypto but also blending the worlds of health and wealth.</p>

            <p>Your subscription marks the beginning of an enriching journey with Stepmint, where opportunities abound, insights unfold, and together, we shape a brighter future.</p>

            <!-- Image below the specified text -->
            <img src="https://stepmint.io/assets/images/subscribe_email_banner.png" style="width: 70%;" alt="Stepmint Image">

            <p>Stay connected with us on the following social media for regular updates, engaging content, and exclusive community insights.</p>

            <ul>
                <li><span class="spanIcon">🌐</span> Facebook: <a href="https://www.facebook.com/profile.php?id=61551542573562">https://www.facebook.com/profile.php?id=61551542573562</a></li>
                <li><span class="spanIcon">📸</span> Instagram: <a href="https://instagram.com/stepmint?igshid=MzMyNGUyNmU2YQ==">https://instagram.com/stepmint?igshid=MzMyNGUyNmU2YQ==</a></li>
                <li><span class="spanIcon">🔗</span> LinkedIn: <a href="https://www.linkedin.com/company/stepmint/about/?viewAsMember=true">https://www.linkedin.com/company/stepmint/about/?viewAsMember=true</a></li>
                <li><span class="spanIcon">🐦</span> Twitter: <a href="https://twitter.com/step_mint">https://twitter.com/step_mint</a></li>
                <li><span class="spanIcon">🚀</span> Telegram Channel: <a href="https://t.me/+QXZoyCAEwAtiYThl">https://t.me/+QXZoyCAEwAtiYThl</a></li>
                <li><span class="spanIcon">💬</span> Telegram Group: <a href="https://t.me/+EGFly7Bwyns1ZWM1">https://t.me/+EGFly7Bwyns1ZWM1</a></li>
            </ul>

            <p>Thank you for being an integral part of Stepmint.</p>

            <p>Best Regards,<br> Stepmint Team</p>
        </div>
    </div>
</body>`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return false;
    } else {
      console.log("Email sent: " + info.response);
      return true;
    }
  });
};
