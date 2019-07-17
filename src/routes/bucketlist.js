import express from 'express';
import passport from 'passport';
import bucketlistController from '../controllers/bucketList';

const router = express.Router();
router.post(
  '/bucketlists',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.postBucketList,
);
router.get(
  '/bucketlists',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.getBucketList,
);
router.get(
  '/bucketlists/:id',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.getById,
);
router.put(
  '/bucketlists/:id',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.updateById,
);

export default router;
