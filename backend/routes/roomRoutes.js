const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.post(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  roomController.createRoom
);

router.get(
  '/',
  authMiddleware,
  roleMiddleware('ADMIN'),
  roomController.getRooms
);

module.exports = router;
