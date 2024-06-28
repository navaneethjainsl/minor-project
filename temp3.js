// Passport local strategy
passport.use('local-signin', new LocalStrategy(
    async function (username, password, done) {
      try {
        const usersRef = collection(dbf, "users");
        const q = query(usersRef, where("username", "==", username));
        const userSnap = await getDocs(q);
  
        if (userSnap.empty) {
          return done(null, false, { message: 'Incorrect username.' });
        }
  
        let userData;
        userSnap.forEach((doc) => {
          userData = doc.data();
        });
  
        const match = await bcrypt.compare(password, userData.password);
        if (match) {
          return done(null, userData); // Pass the entire user object
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } catch (error) {
        return done(error);
      }
    }
  ));
  
  // Serialize user
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });
  
  // Deserialize user
  passport.deserializeUser(async (username, done) => {
    try {
      const usersRef = collection(dbf, "users");
      const q = query(usersRef, where("username", "==", username));
      const userSnap = await getDocs(q);
  
      if (userSnap.empty) {
        return done(null, false);
      }
  
      let userData;
      userSnap.forEach((doc) => {
        userData = doc.data();
      });
  
      done(null, userData);
    } catch (error) {
      done(error);
    }
  });
  
  // Routes
  app.post('/login', (req, res, next) => {
    passport.authenticate('local-signin', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/failureRedirect'); // Redirect if no user found
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/successRedirect'); // Redirect on successful login
      });
    })(req, res, next);
  });
  
  app.get('/successRedirect', (req, res) => {
    res.json({ success: true });
  });
  
  app.get('/failureRedirect', (req, res) => {
    res.json({ success: false, message: "Username or password incorrect" });
  });
  
  app.post("/signup", async (req, res) => {
    const { name, username, email, collegeEmail, usn, dob, phno, password, confirmPassword } = req.body;
  
    if (password !== confirmPassword) {
      return res.status(401).json({ success: false, message: "Passwords don't match" });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const usersRef = collection(dbf, "users");
    await setDoc(doc(usersRef, username), {
      name,
      username,
      email,
      collegeEmail,
      usn,
      dob,
      phno,
      password: hashedPassword
    });
  
    const userRef = collection(dbf, username);
    await setDoc(doc(userRef, "notes"), {});
  
    res.status(200).json({ success: true });
  });
  
  // Route protection middleware
  function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  // Protected route example
  app.get('/protected', ensureAuthenticated, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });