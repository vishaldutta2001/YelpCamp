const mongoose=require('mongoose')
const Campground=require('../models/campground')
const cities=require('./cities')
const {descriptors,places}=require('./seedHelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')

const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error!'))
db.once('open',()=>{
    console.log('Database connected')
})
const sample=array=>array[Math.floor(Math.random()*array.length)]

const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<300;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20) + 10
        const camp=new Campground({
            //Your User ID
            author:'643005d66cbace91b8b636ab',
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude 
              ]
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/drvefwlyh/image/upload/v1681107492/YelpCamp/mrmltxwhztqbnlt8jf4o.jpg',
                  filename: 'YelpCamp/mrmltxwhztqbnlt8jf4o',
                },
                {
                  url: 'https://res.cloudinary.com/drvefwlyh/image/upload/v1681107494/YelpCamp/odlnhyyg1rfhds2tmyjt.jpg',
                  filename: 'YelpCamp/odlnhyyg1rfhds2tmyjt',
                }
              ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close()
})


