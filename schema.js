const joi =require("joi");

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title :  joi.string().required(),
        description : joi.string().required(),
        price: joi.number().positive.required(),
        location : joi.string().required(),
        country : joi.string().required(),
        image : joi.string().allow("" , null)
    }).required(),
   

});
