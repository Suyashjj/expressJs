import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import studentRoutes from './routes/studentRoutes.js';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname(fileURLToPath(import.meta.url)), 'views'));

app.use('/', studentRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
