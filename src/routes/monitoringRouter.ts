import express from 'express';
import MonitoringHistoryController from '../controllers/monitoringHistoryController';

const router = express.Router();

router.get('/', (req, res) => MonitoringHistoryController.get(req, res));


export const routerMonitoring = router;