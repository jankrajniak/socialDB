import express from 'express';
import routes from './routes/index.js';
import db from './config/connection.js';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

await db();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);;
});