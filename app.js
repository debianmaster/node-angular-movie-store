var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
var Parse = require('parse').Parse;
Parse.initialize("Sz0IdummyOxVdummyw5qrD7GY8sgk2okqU7u", "CgPYY88M9yCTdummy8HyROUdummyuA");
var Movie = Parse.Object.extend("MovieItem");

app.post('/storeMovie', function(req, res){
    var movie = new Movie();
    var bdy = req.body;
    movie.set('name',bdy.name);
    movie.set('year',bdy.year);
    movie.set('director',bdy.director);
    movie.set('musicDirector',bdy.musicDirector);
    movie.set('hero',bdy.hero);
    movie.set('heroin',bdy.heroine);
    movie.set('url',bdy.url);
    var songsArray=[];
    for(var k=0;k<10;k++){
        if(bdy['song'+k].title.length!=0){
            var tmp = bdy['song'+k];
            songsArray.push({singers:tmp.singers,stars:tmp.stars,writtenBy:tmp.writtenBy,title:tmp.title});
        }
    }
    movie.set('songs',songsArray);
    movie.save();
    res.redirect('/');
});
app.get('/getMovies', function(req, res){
    console.log('getMovies');
    var query = new Parse.Query(Movie);
    query.find({
        success: function(movies) {
            res.json(movies);
        },
        error: function(object, error) {
            res.end('error');
        }
    });
});
app.get('/getNewMovie',function(req,res){
    var tmpMovie = new Movie();
    tmpMovie.set('songs',[ {singers:"",stars:"",title:"",writtenBy:""}]);
    res.json(tmpMovie);
});
app.get('/getAllMovies',function(req,res){
    var query = new Parse.Query(Movie);
    query.find({
        success: function(results) {
            res.json(results);
        },

        error: function(error) {
            res.end('Error');
        }
    });
});
app.post('/saveMovie', function(req, res){
    console.log(req.body);
    var myMovie = new Movie();
    myMovie.id= req.body.objectId;
    for(var k in req.body){
        myMovie.set(k,req.body[k]);
    }
    myMovie.save(null,{
        success:function(obj){
            console.log("saved");
            res.end(JSON.stringify(obj));
        },
        error: function(obj, error) {
            console.log(error);
            res.end('error');
        }
    })
});
app.listen(8008);