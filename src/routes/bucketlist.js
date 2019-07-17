import express from 'express';
import passport from 'passport';
import bucketlistController from '../controllers/bucketList';

const router = express.Router();
router.post('/bucketlists', bucketlistController.postBucketList);
router.get('/bucketlists', bucketlistController.getBucketList);
router.get('/bucketlists/:id', bucketlistController.getById);

export default router;
