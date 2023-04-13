if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
// require('dotenv').config()

const express=require('express')
const app=express()
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('connect-flash')
const passport=require('passport')
const localStrategy=require('passport-local')
const User=require('./models/user')
const methodOverride=require('method-override')
const ejsMate=require('ejs-mate')
const mongoSanitize = require('express-mongo-sanitize');
const helmet=require('helmet')
const userRouter=require('./routes/users')
const campgroundRouter=require('./routes/campgrounds')
const reviewRouter=require('./routes/reviews')
const MongoDBStore=require('connect-mongo')(session)
//"connect-mongo": "^3.2.0"

const dbUrl=process.env.DB_URL||'mongodb://127.0.0.1:27017/yelp-camp'
mongoose.connect(dbUrl)


const db=mongoose.connection
db.on('error',console.error.bind(console,'connection error!'))
db.once('open',()=>{
    console.log('Database connected')
})

app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,'public')))
app.use(mongoSanitize({
    replaceWith: '_',
}));

const secret=process.env.SECRET||'thisshouldbeabettersecret'
const store=new MongoDBStore({
    url:dbUrl,
    secret,
    touchAfter:24*60*60
})
store.on("error",function(e){
    console.log('Session store error',e)
})

const sessionConfig={
    store,
    name:'session',//gives a unique or separate name form connect.sid  
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true, //security purpose//cookie can be accessed through html it is safe from js script attacks
        // secure:true, //our cookie session will only works on https secure request
        expires:Date.now()+ 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
//using "helmet": "^4.1.1"
app.use(helmet());


const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/drvefwlyh/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://images.pexels.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);



app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
    // if(!['/login','/'].includes(req.originalUrl)){
    //     res.locals.returnTo=req.originalUrl
    // }
    console.log(req.query)
    res.locals.currentUser=req.user //req.user is undefined if current user is not logged in
    res.locals.success=req.flash('success')//otherwise it give user details if the current user is logged in
    res.locals.error=req.flash('error')
    next()
})
app.get('/fakeUser',async(req,res)=>{
    const user=new User({email:'coltttt@gmail.com',username:'colttt'})
    const newUser=await User.register(user,'chicken')
    res.send(newUser)
})

app.use('/',userRouter)
app.use('/campgrounds',campgroundRouter)
app.use('/campgrounds/:id/reviews',reviewRouter)

app.get('/',(req,res)=>{
    res.render('home')
})

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
})
app.use((err,req,res,next)=>{
    const {statusCode=500}=err
    if(!err.message) err.message='something went wrong'
    res.status(statusCode).render('error',{err})
})
const port=process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Serving on port ${port}`)
})
