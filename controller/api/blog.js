const { user } = require('../../model/user') // user model
const { post } = require('../../model/post') // user model
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')
var slug = require('slug')
const mongoose = require("mongoose");
const User = mongoose.model("user",user);  //user model
const Post = mongoose.model("post",post);  //post model

Test = async function(req, res, next) {
	res.json({'success':false,'message':'This is test','data':'data'})
}

Home  = async function(req,res){
	let user = await User.findOne({_id:req.user.id});
    return  res.json({'success':false,'message':user});
}

login = async function(req, res, next){
    const {mobile,password} = req.body;
    try {
      let user = await User.findOne({mobile:mobile});
      console.log(user);
      if (!user)
        return res.json({'success':false,'message':'Your are not registered with us'});

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({'success':false,'message':'incorrect Password'});

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "RohitBindKey",
        {
          expiresIn: 10000
        },
        (err, token) => {
            if (err){return res.json({'success':false,'error':err})};
            return res.json({'success':true,'message':'You are loged in','token':token});
        }
      );
    } catch (e) {
       res.json({'success':false,'error':e.message,'message':'server error'});
    }
}


singUp = async function(req,res){
    const {name,mobile,email,password} = req.body;
    try{
    	let user = await User.findOne({mobile:mobile});
    	if(user){
    		res.json({'success':false,'message':'This mobile is already registered'});
    	}
    	user = new User({
    		name:name,
		    mobile:mobile,
		    email:email,
        });
        const saltRounds  = 5;
    	const encryptedPassword = await bcrypt.hash(password, saltRounds)    
    	user.password = encryptedPassword;
    	await user.save();
    	const payload = {
	            user: {
	                id: user.id,
	                name:user.name
	            }
	        };

        jwt.sign(
            payload,
            "RohitBindKey", {
                expiresIn: 10000
            },
            (err, token) => {
                if (err){return res.json({'success':false,'error':err})};
                return res.json({'success':true,'message':'you are registered successfully','token':token});
            }
        );
    }catch(e)
    {
    	res.json({'success':false,'error':e.message,'message':'Error in Saving'});
    }
}

allpost = async (req, res, next) => {
  try {
    let post = await Post.find({});
    if (post)
      return res.json({'success':true,'message':'data found','data':post});
    else
      return res.json({'success':false,'message':'No data found'});
  } catch (e) {
    res.status(401).json({'success':false,'error':e.message,'message':'saver Error'})
  }
}

allpostSave = async (req,res) => {
  try{
    const { title,shortdesc,desc,metatitle,metadesc,metakey,save,views} = req.body;
    let user = await User.findOne({_id:req.user.id});
    newpost = new Post({
      title:title,
      user:{
        name:user.name,
        mobile:user.mobile
      },
      images:'',
      slug:slug(title),
      shortdesc:shortdesc,
      description:desc,
      views:views,
      meta_title:metatitle,
      meta_desc:metadesc,
      meta_keyword:metakey,
      draft:save
    });
    let newpostdata = await newpost.save();
    if(newpostdata)
      res.json({'success':true,'message':'post added successfully'})
    else  
      res.json({'success':false,'message':'Enable to add post'})

  }catch(e){
    res.status(401).json({'success':false,'error':e.message,'message':'saver Error'})
  }
}

module.exports = {
    Test: Test,
    singUp: singUp,
    Home: Home,
    login: login,
    allpost:allpost,
    allpostSave:allpostSave,
};