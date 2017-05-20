var mongoose = require('mongoose');
var dbconn = require('../helpers/dbconn');
var db = mongoose.connection;
var User = require('../models/userSchema');

User.find({email: "meenalskulkarni@gmail.com"}, function(err, users){
	console.log(users);
	if(users.length === 0) {
		var newUser = new User({
			email: 'meenalskulkarni@gmail.com',
			role: 'Teacher'
		});
		//console.log(newUser);
		newUser.save(function(err,entry){
			if(err){
				return console.log("Error while posting user to db in dbSeed.js");
			}else{
				console.log("User saved to db:  "+entry);
				
			}
		});
        var newClass = new Class({
            class_name	: 'Sample Class',
            teacher_id : req.user.id,
            template_A:{

                template_discussion	:	'Nested',
                template_rating	:	'UPVOTE'
            },
            template_B:    {
                template_discussion	:	'Flat',
                template_rating	:	'UPVOTE_DOWNVOTE'
            }

        });
        newClass.save(function(err,entry){
            if(err)
                console.log(err);
            else{
                var newDF = new Discussion({
                    class_id: entry.id

                });
                console.log("DF: "+ newDF);
                newDF.save(function(err,entryDF){
                    if(err)
                        console.log("error in DF");
                    else{
                        console.log("*****&&& "+entryDF);
                        Class.findByIdAndUpdate(entry.id, {$set:{'discussion_id' : entryDF.id}},{new:true}, function(err,docs){
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
})