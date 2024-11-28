import express from 'express';
import { Router } from 'express';
import { saveConfig, getSystemOverview, getStatus } from '../controllers/configController';

const router = express.Router();

router.post('/save-config', saveConfig);
router.get('/system-overview', getSystemOverview);

router.get('/status', getStatus);


export const configRouter: Router = router;

