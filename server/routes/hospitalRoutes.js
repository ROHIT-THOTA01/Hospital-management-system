const express = require('express');
const { check } = require('express-validator');
const {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
} = require('../controllers/hospitalController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/create',
  [
    protect,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('city', 'City is required').not().isEmpty(),
      check('image', 'Image URL is required').not().isEmpty(),
      check('speciality', 'Speciality is required').isArray().notEmpty(),
    ],
  ],
  createHospital
);

router.get('/', getHospitalsByCity);

router.delete('/delete', [protect], deleteHospital);

router.put('/update', [protect], updateHospital);

router.post('/details', [protect], addHospitalDetails);

module.exports = router; 