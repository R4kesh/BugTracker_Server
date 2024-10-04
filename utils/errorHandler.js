module.exports = (err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Server Error',
    });
  };
  