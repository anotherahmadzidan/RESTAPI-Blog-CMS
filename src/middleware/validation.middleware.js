const validate =
    (schema, property = "body") =>
        (req, res, next) => {
            try {
                // Proses validasi Zod
                schema.parse(req[property]);
                next();
            } catch (error) {
                // Cek apakah ini error validasi dari Zod (punya properti .errors)
                if (error.errors) {
                    return res.status(400).json({
                        success: false,
                        message: "Validation error",
                        errors: error.errors.map((e) => ({
                            field: e.path.join("."),
                            message: e.message
                        }))
                    });
                }
                next(error);
            }
        };

module.exports = validate;