const Hospital = require('../models/Hospital');
const { validationResult } = require('express-validator');

// @desc    Create a new hospital
// @route   POST /api/v1/hospitals/create
// @access  Private/Admin
exports.createHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hospital = await Hospital.create(req.body);

    res.status(201).json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get hospitals by city or ID
// @route   GET /api/v1/hospitals?city=delhi or /api/v1/hospitals?id=123
// @access  Public
exports.getHospitalsByCity = async (req, res) => {
  try {
    const { city, id } = req.query;

    // If ID is provided, return single hospital
    if (id) {
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return res.status(404).json({
          success: false,
          error: 'Hospital not found',
        });
      }
      return res.json({
        success: true,
        data: hospital,
      });
    }

    // Otherwise, handle city-based search with pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;
    const startIndex = (page - 1) * limit;

    let query = {};
    if (city) {
      query.city = new RegExp(city, 'i');
    }

    const total = await Hospital.countDocuments(query);
    const hospitals = await Hospital.find(query)
      .skip(startIndex)
      .limit(limit);

    res.json({
      success: true,
      count: hospitals.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
      data: hospitals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete hospital
// @route   DELETE /api/v1/hospitals/delete
// @access  Private
exports.deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.body.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found',
      });
    }

    await hospital.deleteOne();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Update hospital
// @route   PUT /api/v1/hospitals/update
// @access  Private
exports.updateHospital = async (req, res) => {
  try {
    let hospital = await Hospital.findById(req.body.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found',
      });
    }

    hospital = await Hospital.findByIdAndUpdate(req.body.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Add hospital details
// @route   POST /api/v1/hospitals/details
// @access  Private
exports.addHospitalDetails = async (req, res) => {
  try {
    let hospital = await Hospital.findById(req.body.id);

    if (!hospital) {
      return res.status(404).json({
        success: false,
        error: 'Hospital not found',
      });
    }

    hospital = await Hospital.findByIdAndUpdate(
      req.body.id,
      { 
        description: req.body.description,
        images: req.body.images,
        numberOfDoctors: req.body.numberOfDoctors,
        numberOfDepartments: req.body.numberOfDepartments
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: hospital,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
}; 