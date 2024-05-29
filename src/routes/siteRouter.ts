import express from 'express';
import siteController from '../controllers/siteController';

const router = express.Router();

router.get('/', (req, res) => siteController.get(req, res));

router.post('/', (req, res) => siteController.post(req, res));

router.put('/', (req, res) => siteController.put(req, res));

router.delete('/', (req, res) => siteController.delete(req, res));

export const routerSite = router;