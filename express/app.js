import express from 'express';
import { PORT } from './env.js';
import path from 'path';

const app = express();

app.use(express.static("public"));

app.get('/', (req, res) => {
    // // res.send(import.meta.dirname);
    // const __filename = new url(import.meta.url).pathname;
    // console.log(__filename);
    // res.send("Hello ji");
    const homePagePath = path.join(import.meta.dirname, 'public', 'index.html');
    res.sendFile(homePagePath);
});
//params
app.get('/profile/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello ${username}`);
});
//multiple params
app.get('/profile/:username/articles/:slug', (req, res) => {
    const username = req.params.username;
    const slug = req.params.slug;
    res.send(`Hello ${username} and ${slug}`);
});

//query params
app.get('/product', (req, res) => {
    console.log(req.query);
    res.send(`<h1>Product name is ${req.query.search}</h1>`);
});


app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});

