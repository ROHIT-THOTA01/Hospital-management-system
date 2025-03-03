const Hospital = require('../models/Hospital');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Create a new hospital
// @route   POST /api/v1/hospitals/create
// @access  Private
exports.createHospital = asyncHandler(async (req, res, next) => {
  const hospital = await Hospital.create(req.body);
  res.status(201).json({
    success: true,
    data: hospital,
  });
});

// @desc    Get hospitals by city
// @route   GET /api/v1/hospitals?city=delhi
// @access  Public
exports.getHospitalsByCity = asyncHandler(async (req, res, next) => {
  const { city } = req.query;

  if (!city) {
    // If no city provided, return all hospitals
    const hospitals = await Hospital.find()
      .select('name city image speciality rating description')
      .sort('-rating')
      .limit(10);

    return res.status(200).json({
      success: true,
      count: hospitals.length,
      data: hospitals,
    });
  }

  // Case-insensitive search for partial matches
  const hospitals = await Hospital.find({
    city: { $regex: new RegExp(city, 'i') }
  })
    .select('name city image speciality rating description')
    .sort('-rating')
    .limit(10);

  res.status(200).json({
    success: true,
    count: hospitals.length,
    data: hospitals,
  });
});

// @desc    Delete a hospital
// @route   DELETE /api/v1/hospitals/delete?id=:id
// @access  Private
exports.deleteHospital = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorResponse('Please provide a hospital ID', 400));
  }

  const hospital = await Hospital.findById(id);

  if (!hospital) {
    return next(new ErrorResponse(`Hospital not found with id of ${id}`, 404));
  }

  await hospital.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Update a hospital
// @route   PUT /api/v1/hospitals/update?id=:id
// @access  Private
exports.updateHospital = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorResponse('Please provide a hospital ID', 400));
  }

  let hospital = await Hospital.findById(id);

  if (!hospital) {
    return next(new ErrorResponse(`Hospital not found with id of ${id}`, 404));
  }

  hospital = await Hospital.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: hospital,
  });
});

// @desc    Add hospital details
// @route   POST /api/v1/hospitals/details?id=:id
// @access  Private
exports.addHospitalDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorResponse('Please provide a hospital ID', 400));
  }

  let hospital = await Hospital.findById(id);

  if (!hospital) {
    return next(new ErrorResponse(`Hospital not found with id of ${id}`, 404));
  }

  hospital = await Hospital.findByIdAndUpdate(
    id,
    {
      description: req.body.description,
      images: req.body.images,
      numberOfDoctors: req.body.numberOfDoctors,
      numberOfDepartments: req.body.numberOfDepartments,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    data: hospital,
  });
}); 