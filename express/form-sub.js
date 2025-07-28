import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Serve index.html from form-submission folder
app.use(
    express.static(
        path.join(path.dirname(fileURLToPath(import.meta.url)), 'form-submission')
    )
);

app.post('/submit', (req, res) => {
    const { name, email } = req.body;

    console.log('📦 Full form data:', req.body);
    console.log('📥 New form submission:');
    console.log('Name:', name);
    console.log('Email:', email);

    res.send(`Form submitted! Name: ${name}, Email: ${email}`);
});

// 404 handler - for unknown routes
app.use((req, res) => {
    return res
        .status(404)
        .sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'form-submission', '404.html'));
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
