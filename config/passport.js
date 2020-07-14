const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const db = require('./connection');

passport.serializeUser(async (user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    if(user.access == 'ctm'){
        var query = "SELECT * FROM cms_wt_erp.customers WHERE id='"+user.id+"';";
    } else {
        var query = "SELECT * FROM cms_wt_erp.user WHERE id='"+user.id+"';";
    };
    let row = await db(query);
    done(null, row[0]);
});

passport.use(
    'local-signup',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        const query = "SELECT * FROM cms_wt_erp.user WHERE email='"+req.body.email+"';";
        let users = await db(query);
        
        if (users.length) {
            return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
        } else {
            if(req.body.password !== req.body.confirmPassword){
                return done(null, false, req.flash('signupMessage', 'Senhas Não correspondem.'));
            } else {
                const newPartner = {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    password: bcrypt.hashSync(req.body.password, null, null)
                };
                
                const insertQuery = "INSERT INTO cms_wt_erp.user (name, email, phone, password) values ('"
                +newPartner.name+"', '"
                +newPartner.email+"', '"
                +newPartner.phone+"', '"
                +newPartner.password+"')";

                db(insertQuery)
                    .then(row => {
                        newPartner.id = row.insertId;
                        return done(null, newPartner);
                    })
                    .catch(err => {
                        console.log(err);
                        return;
                    });
            };
        };
    })
);

passport.use(
    'local-login',
    new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    async (req, email, password, done) => {
        const userQuery = "SELECT * FROM cms_wt_erp.user WHERE email='"+email+"';";
        
        let users = await db(userQuery);
        
        if (!users.length){
            return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.'));
        };

        if(users.length){
            if (!bcrypt.compareSync(password, users[0].password)){
                return done(null, false, req.flash('loginMessage', 'Senha inválida.'));
            };
            return done(null, users[0]);
        };
    })
);

module.exports = passport;