const Page = require('../Module/PageModule');

// @desc    Create a new page
// @route   POST /api/pages
// @access  Private
exports.createPage = async (req, res, next) => {
  try {
    const { 
      title,
      productImage,
      productName,
      productPrice,
      buttonText,
      primaryColor,
      secondaryColor,
      fontStyle,
      formFields,
      utmParameters
    } = req.body;

    const page = new Page({
      title,
      productImage,
      productName,
      productPrice,
      buttonText,
      primaryColor,
      secondaryColor,
      fontStyle,
      formFields,
      utmParameters,
      createdBy: req.user._id
    });

    const createdPage = await page.save();
    res.status(201).json(createdPage);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all pages for a user
// @route   GET /api/pages
// @access  Private
exports.getPages = async (req, res, next) => {
  try {
    let query = { createdBy: req.user._id };
    
    // Admin can see all pages
    if (req.user.role === 'admin') {
      query = {};
    }
    
    const pages = await Page.find(query).populate('createdBy', 'name email');
    res.json(pages);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single page
// @route   GET /api/pages/:id
// @access  Private
exports.getPage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Check if user is owner or admin
    if (page.createdBy._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    res.json(page);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a page
// @route   PUT /api/pages/:id
// @access  Private
exports.updatePage = async (req, res, next) => {
  try {
    const { 
      title,
      productImage,
      productName,
      productPrice,
      buttonText,
      primaryColor,
      secondaryColor,
      fontStyle,
      formFields,
      utmParameters
    } = req.body;

    const page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Check if user is owner or admin
    if (page.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    page.title = title || page.title;
    page.productImage = productImage || page.productImage;
    page.productName = productName || page.productName;
    page.productPrice = productPrice || page.productPrice;
    page.buttonText = buttonText || page.buttonText;
    page.primaryColor = primaryColor || page.primaryColor;
    page.secondaryColor = secondaryColor || page.secondaryColor;
    page.fontStyle = fontStyle || page.fontStyle;
    page.formFields = formFields || page.formFields;
    page.utmParameters = utmParameters || page.utmParameters;
    
    const updatedPage = await page.save();
    res.json(updatedPage);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a page
// @route   DELETE /api/pages/:id
// @access  Private
exports.deletePage = async (req, res, next) => {
  try {
    const page = await Page.findById(req.params.id);
    
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    
    // Check if user is owner or admin
    if (page.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }
    
    await page.remove();
    res.json({ message: 'Page removed' });
  } catch (error) {
    next(error);
  }
};