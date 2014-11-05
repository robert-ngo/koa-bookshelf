
koa-bookshelf
=============

Sample CRUD application with KoaJS

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
Make sure MongoDB is running
Start app
``` sh
gulp
```
or by running 
``` sh
node --harmony app.js
```

Deploy on Heroku
=============
``` sh
git commit -am "It's a beautiful day"
git push heroku master
heroku open
```