const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const Product=require('./review')
//https://res.cloudinary.com/drvefwlyh/image/upload/v1681107494/YelpCamp/odlnhyyg1rfhds2tmyjt.jpg
//https://res.cloudinary.com/drvefwlyh/image/upload/w_300/v1681107494/YelpCamp/odlnhyyg1rfhds2tmyjt.jpg
//we can apply virtual fun on schemas only which will update the url 
const ImageSchema=new Schema({
    url:String,
    filename:String
})
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200')
})
const opts = { toJSON: { virtuals: true } };

const CampgroundSchema=new Schema({
    title:String,
    images:[ImageSchema],
    geometry:{
        type:{
            type:String,
            enum:['Point'],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    price:Number,
    description:String,
    location:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
},opts)
CampgroundSchema.virtual('properties.popUpMarkup').get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>
            <p>${this.description.substring(0,20)}...</p>`
})//virtuals are not accessible in geoJSON so we have to tell our Schema to accept it

//mongoose middleware
//whenever we call findByIdAndDelete it will trigger FindOneAndDelete middleware
CampgroundSchema.post('findOneAndDelete',async(doc)=>{
    if(doc){
        await Product.deleteMany({
            _id:{$in : doc.reviews}
        })
    }
})
module.exports=mongoose.model('Campground',CampgroundSchema)
