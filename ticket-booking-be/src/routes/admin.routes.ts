import { Router } from 'express';
import { adminAuth } from '../middlewares/adminAuth';
import * as adminController from '../controllers/admin.controller';

const router = Router();

// All admin routes are guarded by adminAuth middleware
router.use(adminAuth);

// POST /api/v1/admin/reset
router.post('/reset', adminController.resetAllTickets);

export default router;
