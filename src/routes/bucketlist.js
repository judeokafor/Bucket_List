import express from 'express';
import passport from 'passport';
import bucketlistController from '../controllers/bucketList';

const router = express.Router();
router.post('/bucketlists', bucketlistController.postBucketList);
// router.get('/bucketlists', bucketlistController.postBucketList);

export default router;
