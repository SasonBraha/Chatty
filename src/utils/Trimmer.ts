export default (req, res, next) => {
  if (req.body) {
    const trimmedData = Object.keys(req.body).reduce((acc, val) => Object.assign(acc, { [val]: req.body[val].trim() }), {});
    req.body = trimmedData;
    next();
  } else {
    next();
  }
}