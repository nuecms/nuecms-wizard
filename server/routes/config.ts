import express from 'express';
import { saveConfig, getSystemOverview } from '../controllers/configController';

const router = express.Router();

router.post('/save-config', saveConfig);
router.get('/system-overview', getSystemOverview);

export const configRouter = router;

