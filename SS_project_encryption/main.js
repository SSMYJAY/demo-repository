const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser');
const FileStore = require('session-file-store')(session)

var authRouter = require('./lib_login/auth.js');
var authCheck = require('./lib_login/authCheck.js');
var template = require('./lib_login/template.js');

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.use('/auth', authRouter); 
  // Authentication router
    // This line mounts the authRouter module to the /auth route.?
    // : all routes defined in the authRouter will be accessible under the /auth path.?

// 가장 근본 

app.get('/', (req, res) => {
  // if not logged in, redirect to the login page

  if (!authCheck.isOwner(req, res)) {  
    res.redirect('/auth/login');
    return false;
  } 
  
  // if logged in, redirect to the main page

  else {                                      
    res.redirect('/main');
    return false;
  }
})

// main page

app.get('/main', (req, res) => {
  // if not logged in, redirect to the login page

  if (!authCheck.isOwner(req, res)) {  
    res.redirect('/auth/login');
    return false;
  }

  // If the user is authenticated, it generates an HTML response.?

  var html = template.HTML('Welcome',
    `<hr>
        <h2>Welcome to Main page!</h2>
        <p>Login Successful!</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);
})

// listen: 컴퓨터(서버)가 request(누군가의 요청)를 알아채고 무언가 해야된다는 의미
  // listen 에는 포트번호와 callback 함수가 들어간다.
    // callback: javascript에서 다른 함수의 매개변수로 함수를 전달하고, 어떠한 이벤트가 발생한 후 매개변수로 전달한 함수가 다시 호출되는 것
    // -> 어떠한 행동을 다른 객체에게 시키고, 그 일이 끝나는 것을 기다리지 않고 끝나고 부를 때까지 다른 일을 하는 것

app.listen(port, () => {
  console.log(`Example app - listening on port ${port}`)
})