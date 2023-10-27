var express = require('express');
var router = express.Router();
var template = require('./template.js');
var db = require('./db');
const bcrypt = require("bcrypt");

// Login page

router.get('/login', function (request, response) {
    var title = 'Login';
    var html = template.HTML(title,`
            <h2>Login</h2>
            <form action="/auth/login_process" method="post">
            <p><input class="login" type="text" name="id" placeholder="ID"></p>
            <p><input class="login" type="password" name="pwd" placeholder="Password"></p>
            <p><input class="btn" type="submit" value="Login"></p>
            </form>            
            <p>Don't have an account?  <a href="/auth/register">Register</a></p> 
        `, '');
    response.send(html);
});

// Login process

router.post('/login_process', function (request, response) {
    var id = request.body.id;
    var password = request.body.pwd;

    // if ID and PW are entered

    if (id && password) { 
        
        db.query('SELECT id, password FROM userTable WHERE id = ?', [id], function(error, results, fields) { 
            //
            
            if (error) throw error;

            // if entered ID exists in DB

            if (results.length > 0) { 
                password_e_indb = results[0].password;
                const issame =  bcrypt.compareSync(password, password_e_indb);

                // if entered PW is correct, update session information

                if (issame) {
                    request.session.is_logined = true; 
                    request.session.nickname = id;
                    request.session.save(function () {
                        response.redirect(`/`);
                    })}

                // if entered PW is not correct

                else {              
                    response.send(`<script type="text/javascript">alert("Login information (PW) does not match."); 
                    document.location.href="/auth/login";</script>`);    
                }        
            } 

            // if entered ID does not exist in DB
            
            else {              
                response.send(`<script type="text/javascript">alert("Login information (ID) does not match."); 
                document.location.href="/auth/login";</script>`);    
            }            
        });
    } 
    
    // if there is something not entered yet
    
    else {
        response.send(`<script type="text/javascript">alert("Enter your ID and Password!"); 
        document.location.href="/auth/login";</script>`);    
    }
});

// Logout page

router.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        response.redirect('/');
    });
});

// Registration page

router.get('/register', function(request, response) {
    var title = 'Register';    
    var html = template.HTML(title, `
    <h2>Register</h2>
    <form action="/auth/register_process" method="post">
    <p><input class="login" type="text" name="id" placeholder="ID"></p>
    <p><input class="login" type="password" name="pwd" placeholder="Password"></p>    
    <p><input class="login" type="password" name="pwd2" placeholder="Enter Password Again"></p>
    <p><input class="btn" type="submit" value="Create"></p>
    </form>            
    <p><a href="/auth/login">Back to the Login Page</a></p>
    `, '');
    response.send(html);
});
 
// Registration process

router.post('/register_process', function(request, response) {    
    var id = request.body.id;
    var password = request.body.pwd;
    var password2 = request.body.pwd2;

    const password_e = bcrypt.hashSync(password, 10); // saltOrRounds: salt를 몇 번 돌릴건지.

    // if everything is entered

    if (id && password && password2) {
        
        db.query('SELECT * FROM userTable WHERE id = ?', [id], function(error, results, fields) {  // The results of the query are handled in a callback function.?
            //
            
            if (error) throw error;

            // if there is no same ID in DB, and Pw is same with PW2

            if (results.length <= 0 && password == password2) { 
                db.query('INSERT INTO usertable (id, password) VALUES(?,?)', [id, password_e], function (error, data) {
                    if (error) throw error;
                    response.send(`<script type="text/javascript">alert("Registration is Complete!");
                    document.location.href="/";</script>`);
                });
            } 

            // if PW and PW2 is different

            else if (password != password2) { 
                response.send(`<script type="text/javascript">alert("The entered passwords are not same."); 
                document.location.href="/auth/register";</script>`);    
            }

            // if entered ID already exists in DB

            else { 
                response.send(`<script type="text/javascript">alert("The ID already exists."); 
                document.location.href="/auth/register";</script>`);    
            }            
        });
    } 
    
    // if there is something not entered yet

    else { 
        response.send(`<script type="text/javascript">alert("There is information that has not been entered."); 
        document.location.href="/auth/register";</script>`);
    }
});

//

module.exports = router;