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
        user: "sadmar7@poczta.fm",
        pass: "TWOJE_HASLO_MAILA"
      }
    });

    await transporter.sendMail({
      from: '"Sad-Mar Zamówienia" <sadmar7@poczta.fm>',
      to: "sadmar7@poczta.fm",
      subject: "Nowe zamówienie Sad-Mar",
      text: `Klient: ${klient}\nTelefon: ${telefon}\nTreść: ${tresc}`
    });

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send("Błąd wysyłki maila");
  }
});

app.listen(10000, () => {
  console.log("Backend działa");
});

