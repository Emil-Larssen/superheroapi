const Joi = require('joi');

const favoriteInput = Joi.object({
    id: Joi.number().required(),
    note: Joi.string().min(2).required()
});

exports.validateFavorite = (req, res, next) => {
    const { error } = favoriteInput.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}