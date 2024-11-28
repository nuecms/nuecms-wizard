import express from 'express';
import { listen } from './vite-express';
import { configRouter } from './routes/config';
import patch from './middleware/response';
import { openUrl } from './services/systemService';

const app = express();

app.use(express.json());

patch(app);

// Use the config router
app.use('/api', configRouter);

listen(app, 3000, () => {
  console.log('Server is listening on port 3000...');
  // if is production, open the browser
  if (process.env.NODE_ENV === 'production'){
    openUrl(`http://127.0.0.1:3000`);
  }
});

