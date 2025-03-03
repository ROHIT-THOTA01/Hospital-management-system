const express = require('express');
const router = express.Router();
const {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
} = require('../controllers/hospitals');

// @route   POST /api/v1/hospitals/create
// @desc    Create a new hospital
// @access  Private
router.post('/create', createHospital);

// @route   GET /api/v1/hospitals?city=delhi
// @desc    Get hospitals by city
// @access  Public
router.get('/', getHospitalsByCity);

// @route   DELETE /api/v1/hospitals/delete?id=:id
// @desc    Delete a hospital
// @access  Private
router.delete('/delete', deleteHospital);

// @route   PUT /api/v1/hospitals/update?id=:id
// @desc    Update a hospital
// @access  Private
router.put('/update', updateHospital);

// @route   POST /api/v1/hospitals/details?id=:id
// @desc    Add hospital details
// @access  Private
router.post('/details', addHospitalDetails);

module.exports = router; 