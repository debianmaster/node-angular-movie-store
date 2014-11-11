/**
 * Created by cjonagam on 11/9/2014.
 */
var nameApp = angular.module('nameApp', []);
var movieData=[];
nameApp.controller('MovieCtrl', function ($scope,$http){
    var selected=false;
    var timer = setInterval(function(){
        $http.get('/getAllMovies').
            success(function(data, status, headers, config) {
                $scope.movies = data;
                if(!selected) {
                    $scope.movie = $scope.movies[0];
                    selected=true;
                    timeOut=10000;
                }
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    },10000);
    $http.get('/getAllMovies').
        success(function(data, status, headers, config) {
            $scope.movies = data;
            if(!selected) {
                $scope.movie = $scope.movies[0];
                selected=true;
                timeOut=10000;
            }
        }).
        error(function(data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    $scope.selectMovie =function(movie){
        console.log(movie);
        $scope.movie = movie;
    }
    $scope.addSong = function(){
        $scope.movie.songs.push({title:'',writtenBy:'',singers:''});
    }
    $scope.addMovie = function(){
        $http.get('/getNewMovie').success(function(movie){
            $scope.movie = movie;
            $scope.movies.push(movie);
        });
    }
    $scope.saveMovie =function(movie){
        console.log(movie);
        $http.post('/saveMovie',movie).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.movie.objectId=data.objectId;
                //$scope.movie.apply();
                alert("saved object "+ data.objectId);
            }).
            error(function(data, status, headers, config) {
                alert(data);
            });
    }
    $scope.removeSong = function(i) {
        $scope.movie.songs.splice(i, 1);;
    }
});





/*
 $scope.director= "Trinadha Rao Nakkina";
 $scope.hero ="Varun Sandesh";
 $scope.heroin=  "Poorna";
 $scope.year=  "1986";
 $scope.musicDirector=  "Sai Kartheek";
 $scope.name = "Nuvvala Nenila";
 $scope.songs = [
 {singers:"Shankar Mahadevan",stars:"",title:"Aagadu",writtenBy:"Srimani"},
 {singers:"Shankar Mahadevan",stars:"",title:"Aagadu",writtenBy:"Srimani"}
 ];
 */