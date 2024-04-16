import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// Skapa express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Generera engångslösenord
function generateOTP() {
  // Generera en sexsiffrig numerisk OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}

// Din kod här. Skriv dina arrayer
const users = [];
const accounts = [];
const sessions = [];

// Din kod här. Skriv dina routes:

app.get("/", (req, res) => {
  res.send("first page");
});

// Skapa användare
app.post("/users", (req, res) => {
  console.log("Received POST request to create user");

  const { id, username, password } = req.body;
  users.push({ id, username, password });
  accounts.push({ username, balance: 0 });
  console.log(users);
  console.log(accounts);
  res.send("User created");
});

// Visa saldo
app.post("/me/accounts", (req, res) => {
  const { username, token } = req.body;
  if (!token) {
    return res.status(401).json({ error: "One time password is required" });
  }

  const session = sessions.find(
    (session) =>
      session.username === username && session.oneTimePassword === token
  );
  if (!session) {
    return res.status(401).json({ error: "Wrong one time password" });
  }

  const account = accounts.find((acc) => acc.username === username);
  if (!account) {
    return res.status(404).json({ error: "User not found" });
  }

  const balance = account.balance;
  res.json({ balance: account.balance });
  // res.send("Post accounts received: " + { balance });
});

// Logga in och skapa engångslösenord
app.post("/sessions", (req, res) => {
  const { username, password } = req.body;

  // Kontrollera användaruppgifterna
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Wrong username or password" });
  }

  // Generera engångslösenord
  const oneTimePassword = generateOTP();
  sessions.push({ username, oneTimePassword });

  console.log("Logged in", username, password);
  res.json({ message: "Logged in.", oneTimePassword });
});

// Sätta in pengar
app.post("/me/accounts/transactions", (req, res) => {
  const { username, token, amount } = req.body;

  const session = sessions.find(
    (s) => s.username === username && s.oneTimePassword === token
  );
  if (!session) {
    return res.status(401).json({ error: "Wrong one time password" });
  }

  const account = accounts.find((acc) => acc.username === username);
  if (!account) {
    return res.status(404).json({ error: "User not found" });
  }

  const numericAmount = parseInt(amount, 10);
  // res.send(`Successfully deposited ${amount} to account ${account}`);
  res.json({ balance: account.balance });

  account.balance += numericAmount;
});

// Starta servern
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Bankens backend körs på http://localhost:${PORT}`);
});
