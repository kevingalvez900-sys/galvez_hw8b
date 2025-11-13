const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.static("css"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(`${__dirname}/views/index.html`));

app.get("/form", (req, res) => res.sendFile(`${__dirname}/views/form.html`));
app.post("/form", (req, res) => {
  const { name, email } = req.body;
  res.send(`<h2>Thank you ${name}! Confirmation sent to ${email}.</h2><a href='/'>Back</a>`);
});

app.get("/countries", (req, res) => res.sendFile(`${__dirname}/views/countries.html`));
app.post("/api/countries", (req, res) => {
  const { name, countries } = req.body;
  res.send(`Traveler ${name} has visited ${countries.length} countries.`);
});

let articles = [{ id: 1, title: "First" }, { id: 2, title: "Second" }];
app.get("/articles", (req, res) => res.sendFile(`${__dirname}/views/articles.html`));
app.post("/articles", (req, res) => {
  const { title, content } = req.body;
  const maxId = Math.max(...articles.map(a => a.id));
  const newArticle = { id: maxId + 1, title, content };
  articles.push(newArticle);
  res.send(`New article "${title}" added with ID ${newArticle.id}`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));