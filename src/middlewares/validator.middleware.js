
export const validateSchema = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();

    } catch (error) {
      const formatedErrors = error?.errors?.map((err) => err.message);
      res.status(400).json({ message: formatedErrors });
    }
  }
}