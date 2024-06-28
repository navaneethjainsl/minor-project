const session = require('express-session');
const passport = require('passport');
const {Strategy} = require('passport-local');



app.get('/login', async (req, res)=>{
    res.render('login');
});

// Login User
app.post('/login', passport.authenticate("local", {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    sequelize.sync().then(async () => {
        let details = {
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            ph_no: req.body.ph_no,
            dob: req.body.dob,
            
        };
        
        await Passenger.create(details);
        
        // details = {
        //     ...details,
        //     ...{expiry: now.getTime() + expirationTime * 1000}
        // }
        // localStorage.setItem("Credentials", JSON.stringify(details));

        res.redirect('/login');
  
    }).catch((error) => {
        console.error('Unable to create user : ', error);
        console.log('-------------------------------------------- ');
        res.redirect('/signup');
    });
});

passport.use(new Strategy(
    async function(username, password, cb) {
        
        // console.log("req.body");
        // console.log(req.body);
        let expirationTime = 300; //5 minutes
        
        sequelize.sync().then(() => {
  
            Passenger.findOne({
                where: {
                    username : username
                }
            }).then(async (user) => {
                console.log("user");
                console.log(user);
                console.log("user.dataValues");
                console.log(user.dataValues);
        
                if(user && user.dataValues.password === password){
        
                    await Login.create({
                        p_id: user.dataValues.p_id,
                        start_time: new Date(),
                        // start_time: new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata' }),
                    
                    });
        
                    // user.dataValues = {
                    //     ...details,
                    //     ...{expiry: now.getTime() + expirationTime * 1000}
                    // }
        
                    // localStorage.setItem("Credentials", JSON.stringify(user.dataValues));
                    
                    // res.redirect('/home');

                    return cb(null, user);
                }
                else{
                    // res.send('<h1>Incorrect username or password<h1>');
                    return cb('Incorrect username or password')
                    
                }
            })
            .catch((error) => {
                console.error('Failed to retrieve data : ', error);
                return cb('username does not exist')
            });
      
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});