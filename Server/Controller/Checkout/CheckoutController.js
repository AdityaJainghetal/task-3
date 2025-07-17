const CheckoutPage = require("../../Module/CheckoutModule");
const imagekit = require("../../config/imagekit");
// const  = require('../utils/errorHandler');

exports.createCheckoutPage = async (req, res, next) => {
  console.log(req.email ,req._id, "body");

  try {
    const {
      title,
      productName,
      productPrice,
      buttonText,
      primaryColor,
      secondaryColor,
      font,
      formFields,
      utmParameters,
    } = req.body;

    // Make sure user is authenticated and user ID is available
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not authenticated",
      });
    }

    let image = "";
    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer.toString("base64"),
        fileName: req.file.originalname,
        folder: "/checkout-builder",
      });
      image = result.url;
    }

    const checkoutPage = await CheckoutPage.create({
      owner: req.user._id, // This should be the correct user ID
      title,
      product: {
        name: productName,
        price: productPrice,
        image,
      },
      buttonText,
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
      },
      font,
      formFields,
      utmParameters,
    });

    res.status(201).json({
      success: true,
      data: {
        checkoutPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getCheckoutPage = async (req, res, next) => {
  const checkoutPage = await CheckoutPage.findById(req.params.id);

  if (!checkoutPage) {
    return next(new Error("No checkout page found with that ID", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      checkoutPage,
    },
  });
};

exports.getUserCheckoutPages = async (req, res, next) => {
  const checkoutPages = await CheckoutPage.find({ owner: req.user._id });

  res.status(200).json({
    success: true,
    results: checkoutPages.length,
    data: {
      checkoutPages,
    },
  });
};

exports.updateCheckoutPage = async (req, res, next) => {
  const checkoutPage = await CheckoutPage.findOneAndUpdate(
    { _id: req.params.id, owner: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!checkoutPage) {
    return next(new Error("No checkout page found with that ID", 404));
  }

  res.status(200).json({
    success: true,
    data: {
      checkoutPage,
    },
  });
};

exports.deleteCheckoutPage = async (req, res, next) => {
  const checkoutPage = await CheckoutPage.findOneAndDelete({
    _id: req.params.id,
    owner: req.user._id,
  });

  if (!checkoutPage) {
    return next(new Error("No checkout page found with that ID", 404));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
};
