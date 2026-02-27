const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-order", async (req, res) => {
const { klient, telefon, tresc } = req.body;

try {
let transporter = nodemailer.createTransport({
host: "smtp.poczta.fm",
port: 587,
secure: false,
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});

await transporter.sendMail({
from: `"Sad-Mar Zamówienia" <${process.env.EMAIL_USER}>`,
to: process.env.EMAIL_USER,
subject: "Nowe zamówienie Sad-Mar",
text: `Klient: ${klient}\nTelefon: ${telefon}\nTreść: ${tresc}`
});

res.json({ success: true });
} catch (err) {
console.log(err);
res.status(500).send("Błąd wysyłki maila");
}
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
console.log("Backend działa na porcie", PORT);
});
