![alt text](https://user-images.githubusercontent.com/1014114/30410983-4d64af18-98dc-11e7-8fe5-5fb832847e63.png "Koa bookshelf screenshot")

koa-bookshelf
=============

Sample CRUD application with NodeJS, KoaJS, MongoDB, Twitter Bootstrap 3.
<br/>
Demo: https://koa-bookshelf.herokuapp.com/

Running locally
=============
Make sure node is 0.11.* or higher
<br/>
Make sure MongoDB is running
<br/>
Start app
``` sh
gulp
```
or by running 
``` sh
npm start
```
or
``` sh
node --harmony app.js
```

Deploy on Heroku
=============
Login to Heroku from Terminal
``` sh
heroku login
```
then push files to Heroku
``` sh
git commit -am "Sample comment"
git push heroku master
heroku open
```
