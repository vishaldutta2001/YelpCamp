const BaseJoi=require('joi')
const sanitizeHtml=require('sanitize-html')

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});
const Joi = BaseJoi.extend(extension)

module.exports.campgroundSchema=Joi.object({
    campground:Joi.object({
        title:Joi.string().required().escapeHTML(),
        price:Joi.number().required().min(0),
        //image:Joi.string().required(),
        location:Joi.string().required().escapeHTML(),
        description:Joi.string().required().escapeHTML()
    }).required(),
    deleteImages:Joi.array()
}) 

module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.number().required().min(1).max(5),
        body:Joi.string().required().escapeHTML()
    }).required()
})




//if(!req.body.campground) throw new ExpressError('invalid campground data',400) //to handle post request from postman where campground data is invalid or empty
//we are making joi schema for validation of data coming from json or ajax or postman
//const result=campgroundSchema.validate(req.body)
//if it satisfy validation it will only contain value otherwise it will contain value and error
//error -> details [[object]]