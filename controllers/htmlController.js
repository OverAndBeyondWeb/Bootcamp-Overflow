var express = require('express');

var router = express.Router();
var db = require('../models')

router.get('/', function(req, res) {
    res.render('home');
});

router.get('/login', function(req, res) {
    res.render('login')
});

router.get('/postview/:id', function(req, res) {
    db.Post.findOne(
        {
            where: {
                id: req.params.id
            },
            include: [{all:true}]
        }
    ).then(function(results) {
        console.log(results.User)
        res.render('postview', {
            postinfo: results,
            user: req.user
        })
    });
});

router.get('/postlist', function(req, res) {
    db.Post.findAll(
        {
            include: [db.User]
        }
    ).then(function(results) {

        res.render('postlist', { post: results })
    });
});

router.get('/signup', function(req, res) {


    res.render('signup')
});

router.get('/user', function(req, res) {
if(req.user) {
    db.User.findOne({
        where: {
            id: req.user.id
        },
        include: [{all:true}]
    }).then(function(data) {
        console.log(data.userImage);
        
        res.render('user', { user: data, post: data.Posts, comment: data.Comments })
    })
}
});

router.get('/post', function(req, res) {
    res.render('post', {user: req.user})
})

module.exports = router