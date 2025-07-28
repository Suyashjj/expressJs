import { Router } from 'express';
import { readFile, writeFile } from 'fs/promises';
import crypto from 'crypto';

// Create router instance
const router = Router();

// File paths using import.meta.url
const DATA_FILE = new URL('../data/links.json', import.meta.url);
const INDEX_HTML = new URL('../index.html', import.meta.url);
const STYLE_CSS = new URL('../style.css', import.meta.url);

// Load links from file
const loadLinks = async () => {
    try {
        const data = await readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

// Save links to file
const saveLinks = async (links) => {
    await writeFile(DATA_FILE, JSON.stringify(links));
};

// Route: Serve report page
router.get('/report', (req, res) => {
    const students = [
        { name: 'Suyash', age: 22 },
        { name: 'Aman', age: 23 },
        { name: 'Riya', age: 21 }
    ];

    res.render('report', { students });
});


// Route: Serve CSS file
router.get('/style.css', async (req, res) => {
    try {
        const css = await readFile(STYLE_CSS, 'utf-8');
        res.setHeader('Content-Type', 'text/css');
        res.send(css);
    } catch (err) {
        res.status(500).send('CSS not found');
    }
});

// Route: Serve homepage
router.get('/', async (req, res) => {
    const html = await readFile(INDEX_HTML, 'utf-8');
    const links = await loadLinks();

    let urlsList = '';
    for (const [shortCode, url] of Object.entries(links)) {
        urlsList += `<li><strong>${shortCode}</strong>: <a href="/${shortCode}">localhost:3002/${shortCode}</a> → ${url}</li>`;
    }

    const finalHtml = html.replace('{{shortened-urls}}', urlsList).replace('{{message}}', '');
    res.send(finalHtml);
});

// Route: Shorten URL
router.post('/shorten', async (req, res) => {
    const links = await loadLinks();
    const { url, shortCode } = req.body;

    const finalShortCode = shortCode || crypto.randomBytes(4).toString('hex');

    if (links[finalShortCode]) {
        return res.redirect('/');
    }

    links[finalShortCode] = url;
    await saveLinks(links);

    res.redirect('/');
});

// Route: Redirect to original URL
router.get('/:shortCode', async (req, res) => {
    const links = await loadLinks();
    const url = links[req.params.shortCode];

    if (url) {
        res.redirect(url);
    } else {
        res.status(404).send('Short URL not found');
    }
});

// //defaut routes
// export default router;

//name export
export const shortenerRoutes = router;

