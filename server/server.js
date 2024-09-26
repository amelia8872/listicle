import express from 'express';
import cors from 'cors';
import tipsRouter from './routes/tips.js';

const app = express();

app.use(cors());

// a middleware function to serve static files from public directory
app.use('/public', express.static('./public'));

// serve the files from the client\public\scripts directory, define a middleware function to serve static files from the scripts directory
app.use('/scripts', express.static('./public/scripts'));

app.use('/tips', tipsRouter);

app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">Grow Up Business API</h1>'
    );
});

// Start a server on port process.env.PORT or 3001
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
