![alt tag](https://photos-4.dropbox.com/t/1/AAD3vhdLsWREe4XvaQLV0QRH1NKYDF9ZIfVm0VL4jLPB9w/12/14251402/png/1024x768/3/1415296800/0/2/BookLib.png/JQTVoYDZ9rjnBzSUmbOIR94AZVQtMyxS8izUxF1uyBA)

koa-bookshelf
=============

Sample CRUD application with KoaJS. 
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
node --harmony app.js
```

Deploy on Heroku
=============
``` sh
git commit -am "It's a beautiful day"
git push heroku master
heroku open
```
