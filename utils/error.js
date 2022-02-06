class ValidationError extends Error {}

const handleError = (err, req, res, next) => {
  console.error(err);

  res.status(err instanceof ValidationError ? 400 : 500).render('error', {
    message:
      err instanceof ValidationError ? err.message : 'Sorry, try again later',
  });

  //   if (err instanceof ValidationError) {
  //     res
  //       .status(404)
  //       .render('error', { message: 'Pache not exist, check again web adress' });
  //     return;
  //   }
};

module.exports = {
  handleError,
  ValidationError,
};
