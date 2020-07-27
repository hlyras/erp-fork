const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/model/user');
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
        let user = await User.findByEmail(req.body.email);

        if(!req.body.name){
            return done(null, false, req.flash('signupMessage', 'É necessário preencher todos os campos.'));
        };

        if (user.length) {
            return done(null, false, req.flash('signupMessage', 'Este usuário já está cadastrado.'));
        } else {
            if(req.body.password !== req.body.confirmPassword){
                return done(null, false, req.flash('signupMessage', 'Senhas Não correspondem.'));
            } else {
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, null, null),
                    phone: req.body.phone
                };

                console.log(await User.save(newUser));
                return done(null, false, req.flash('signupMessage', 'Colaborador(a) '+req.body.name+' cadastrado(a) com sucesso!'));
                // newUser.id = row.insertId;
                // return done(null, newUser);
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