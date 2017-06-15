var GoogleStrategy = require('passport-google-oauth20').Strategy;
var User = require('../models/userSchema');
var configAuth = require('./auth');


module.exports = function(passport){

	passport.serializeUser(function(user,done){
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id,done){
		User.findById(id, function(err, user) {
            done(err, user);
        });
	});
		
	passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL

    },
    
    function(accessToken, refreshToken, profile, done){
    	process.nextTick(function() {
    		console.log("*** passport :"+ profile.id);
    		console.log("--------------------\n");
            console.log(profile);
            console.log("--------------------\n");
            //find the user based on their google id
            User.findOne({ 'google_id' : profile.id }, function(err, user) {
                if (err){
                	return done(err);
                }
                if (user) {
                    console.log("User found: "+ user);
                    // user is found, log them in
                    return done(null, user);
                } else {
                    // if the user is not in db create a new user
                    var newUserSet = '';
                    User.find({}).exec(function(err,users) {
                        if (err) {
                            res.send("Error");
                        } else {
                            console.log("-------Users in DB currently-----\n"+users);
                            var length = users.length;

                            if(length <=1 ){
                                newUserSet = 'A';

                            }else{
                                if(users[length - 2].user_set === 'A')
                                    newUserSet = 'B';
                                else
                                    newUserSet = 'A';

                                var newUser = {
                                    google_id : profile.id,
                                    token : accessToken,
                                    refresh_token : refreshToken,
                                    fullname  : profile.displayName,
                                    profile_img : profile.photos[0].value,
                                    user_set : newUserSet

                                };
                                User.findOneAndUpdate({'email':profile.emails[0].value},newUser, {new: true},function(err,users){
                                    if(err)
                                        console.log(err);
                                    else{
                                        console.log("----- "+users);
                                    }
                                    return done(null, users);
                                });

                                var newClass = new Class({
                                    class_name	: 'Sample Class',
                                    teacher_id : entry._id,
                                    template_A:{

                                        template_discussion	:	'Nested',
                                        template_rating	:	'UPVOTE'
                                    },
                                    template_B:    {
                                        template_discussion	:	'Flat',
                                        template_rating	:	'UPVOTE_DOWNVOTE'
                                    }

                                });
                                newClass.save(function(err,classEntry){
                                    if(err)
                                        console.log(err);
                                    else{
                                        var newDF = new Discussion({
                                            class_id: classEntry.id

                                        });
                                        console.log("DF: "+ newDF);
                                        newDF.save(function(err,entryDF){
                                            if(err)
                                                console.log("error in DF");
                                            else{
                                                console.log("*****&&& "+entryDF);
                                                Class.findByIdAndUpdate(classEntry.id, {$set:{'discussion_id' : entryDF.id}},{new:true}, function(err,docs){
                                                    if(err)
                                                        console.log(err)
                                                    else{
                                                        console.log(docs);

                                                    }
                                                });


                                            }
                                        });

                                    }
                                });

                            }
                        }
                    });
                }
            });
        });
    
    }));
};

