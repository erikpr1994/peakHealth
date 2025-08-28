import { Router } from 'express';

const router: Router = Router();

// Placeholder for future route implementations
// These will be implemented in subsequent tickets
router.get('/routines', (req, res) => {
  res.status(200).json({
    message: 'Routines endpoint - to be implemented',
    service: 'routines-service',
  });
});

router.get('/library', (req, res) => {
  res.status(200).json({
    message: 'Library endpoint - to be implemented',
    service: 'routines-service',
  });
});

export default router;
