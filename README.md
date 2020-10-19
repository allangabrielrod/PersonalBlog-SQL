<div align="center">
    <img src="./github/logo.png" alt="[blog-logo]" />
    <p>A simple nodejs personal blog.</p>
</div>

<br />

# 📷 Screenshots


## Home

<img src="./github/screenshots/home.png" alt="[blog-home] " />
<br />
<br />

## Login
<img src="./github/screenshots/login.png" alt="[blog-login] " />
<br />
<br />

## Register
<img src="./github/screenshots/register.png" alt="[blog-login] " />
<br />
<br />

## Post
<img src="./github/screenshots/show.png" alt="[blog-show] " />
<br />
<br />

## Compose
<img src="./github/screenshots/new.png" alt="[blog-compose] " />
<br />
<br />

# 🛠️ Technologies
 
 - ### [Node.js]("https://nodejs.org/en/")
 - ### [MongoDB]("https://www.mongodb.com/")
 - ### [Express]("http://expressjs.com/pt-br/")
 - ### [Mongoose]("https://mongoosejs.com/")
 - ### [Passport.js]("http://www.passportjs.org/")
    - [Passport-local]("http://www.passportjs.org/packages/passport-local/")
    - [Passport-local-mongoose]("https://www.npmjs.com/package/passport-local-mongoose")
 - ### [Client-Sessions]("https://www.npmjs.com/package/client-sessions")
 - ### [Sanitizer]("https://www.npmjs.com/package/client-sessions")
 - ### [EJS]("https://ejs.co/")
 - ### [Bootstrap 4]("https://getbootstrap.com/")

<br />
<br />

# 🚀 How to deploy

## First Steps

1. Make sure you have [GIT]("https://git-scm.com/") installed in your system
2. Make sure you have [Node.js]("https://nodejs.org/en/") installed in your system
3. Make sure you have [MongoDB]("https://www.mongodb.com/") installed in your system
4. Clone this repository:

    <code>$ git clone https://github.com/allangabrielrod/Personal-Blog.git</code>
5. Setup the environment variables. (Take a look below)

<br/>

## Environment Variables

Before you run this project you must setup the following environment variables. We recommend you to choose between a <code>.env</code> file inside the project root directory or in your system as local variables.

- ### <code> PORT </code> <p>Network port that the server should listen.</p>


- ### <code> CK_SECRET </code> <p>Session cookie secret.</p>

- ### <code> ADMIN_TOKEN </code> <p>Application admin token.</p>

<br/>

## Last Steps

1. After you've got all set up, run the following to download the project dependencies:

   <code>$ npm -i </code>

2. After you're done, run the following to run the application:

   <code>$ node app.js </code>

3. Done!

<br/>

# 💁 Extra Tips

If you're a developer and want to make changes to this project, we recommend you to install [nodemon]("https://nodemon.io/") as a node global package. So you can focus on development instead of waste time restarting the application on every change. To install it just run:

<code>$ npm i -g nodemon</code>