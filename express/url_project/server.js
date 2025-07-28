import express from 'express';
import { shortenerRoutes } from './routes/shortener-routes.js';

const app = express();
const PORT = 3002;

// Middleware
app.use(express.urlencoded({ extended: true }));

//ejs
app.set('view engine', 'ejs');
app.set('views', './views');

// Use the router from routes
app.use('/', shortenerRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});