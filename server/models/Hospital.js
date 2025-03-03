const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters'],
    },
    city: {
      type: String,
      required: [true, 'Please add a city'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please add an image URL'],
    },
    speciality: {
      type: [String],
      required: [true, 'Please add at least one speciality'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 1,
    },
    description: {
      type: String,
      default: '',
    },
    images: {
      type: [String],
      default: [],
    },
    numberOfDoctors: {
      type: Number,
      default: 0,
    },
    numberOfDepartments: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for city field for faster queries
HospitalSchema.index({ city: 1 });

module.exports = mongoose.model('Hospital', HospitalSchema); 