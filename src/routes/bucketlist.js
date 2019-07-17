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
router.delete(
  '/bucketlists/:id',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.deleteById,
);
router.post(
  '/bucketlists/:id/items',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.postBucketListItems,
);
router.put(
  '/bucketlists/:id/items/:item_id',
  passport.authenticate('jwt', { session: false }),
  bucketlistController.updateBucketListItems,
);

export default router;
