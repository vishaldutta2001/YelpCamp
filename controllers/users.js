const User=require('../models/user')

module.exports.renderRegister=(req,res)=>{
    res.render('users/register')
}
module.exports.register=async(req,res)=>{
    try{
        const {username,email,password}=req.body
        const user=new User({username,email})
        const registeredUser = await User.register(user,password) //passport-local-mongoose
        req.login(registeredUser,(err)=>{ //register ke saath saath login bhi ho jaega
            if(err) return next(err)
            req.flash('success','successfuly register a new user')
            res.redirect('/campgrounds')
        })
    }
    catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }  
}
module.exports.renderLogin=(req,res)=>{
    res.render('users/login')
}
module.exports.login=(req,res)=>{
    req.flash('success','Welcome back!')
    const redirectUrl=req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    res.redirect(redirectUrl)
}
module.exports.logout=(req,res)=>{
    req.logout((error)=>{
        if(error) next(error)
        req.flash('success','Goodbye!')
        res.redirect('/campgrounds')
    })
}