const mongoose = require('mongoose');

const formFieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['text', 'email', 'phone', 'number'],
    default: 'text'
  },
  required: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
});

const utmSchema = new mongoose.Schema({
  source: String,
  medium: String,
  campaign: String,
  term: String,
  content: String
});

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  buttonText: {
    type: String,
    default: 'Submit'
  },
  primaryColor: {
    type: String,
    default: '#4F46E5'
  },
  secondaryColor: {
    type: String,
    default: '#10B981'
  },
  fontStyle: {
    type: String,
    default: 'sans-serif'
  },
  formFields: [formFieldSchema],
  utmParameters: utmSchema,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Page', pageSchema);