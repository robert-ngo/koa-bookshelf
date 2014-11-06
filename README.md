![alt tag](https://photos-4.dropbox.com/t/1/AAAPVzA3DmCAerxsUXm3jkgr90PkHff73r2rVa-rppxzwg/12/14251402/png/1024x768/3/1415314800/0/2/BookLib.png/X5wAldutzz2bDNRhs92HLDVW8zeLBu45uQdDDh2CHKM)

koa-bookshelf
=============

Sample CRUD application with NodeJS, KoaJS, MongoDB, Twitter Bootstrap 3.
<br/>
Working demo link: https://koa-bookshelf.herokuapp.com/

To import sample data
=============
Change variable in app.js
``` sh
var resetDB = false;
var populateData = false; 
```

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
git commit -am "It's a beautiful day"
git push heroku master
heroku open
```
