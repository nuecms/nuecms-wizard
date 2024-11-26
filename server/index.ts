import express from 'express';
import { listen } from './vite-express';
import { configRouter } from './routes/config';
import patch from './middleware/response';

const app = express();

app.use(express.json());

patch(app);

// Use the config router
app.use('/api', configRouter);

listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

