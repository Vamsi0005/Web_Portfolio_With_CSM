import { sendError } from '../utils/response.js';

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });

    // Replace with parsed/sanitized data where relevant
    if (parsed.body) req.body = parsed.body;
    if (parsed.query) req.query = parsed.query;
    if (parsed.params) req.params = parsed.params;

    next();
  } catch (err) {
    if (err.errors) {
      const formattedErrors = err.errors.map((e) => ({
        field: e.path.slice(1).join('.'),
        message: e.message
      }));
      return sendError(res, 'Validation failed. Please check the submitted fields.', 400, formattedErrors);
    }
    next(err);
  }
};
