const User=require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorMonitor } = require('stream');

const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_SECRET_KEY,
  ACCESS_TOKEN_EXPIRES,
  REFRESH_TOKEN_EXPIRES,
} = process.env;


let arr_valid = ['()','{}','[]'];

function validBrackets(input_string){
  console.log(input_string);
  while (arr_valid.includes(input_string)) {
      console.log('inside loop');
    input_string = input_string.replace("()", "").replace('{}', "").replace('[]', "")
  }
  return input_string == ''
}


exports.validBrackets=async(req,res,next)=>{
  let input_query = req.body.input_query;
  try {
      if(!arr_valid.length || !input_query)
      {
        let err  = new Error("Can not find the value !");
        err.statusCode = 406;
        throw err;
      }
      let status = await validBrackets(input_query);
      res.status(200).json({message:'Fetched Vaue !',status :status});
  } 
  catch (err) {
    res.status(500).json({message:e.message});
    next()
  }
}
exports.modifyBrackets=async(req,res,next)=>{
  let action  = req.query.action;
  let modify_value = req.body.modify_value;
  try {
    //first condition if there is any admin login and token then we just need to verify who is the request user is and whether he has permission for all of these
    if(!action)
    {
      let err  = new Error("Access Denied");
      err.statusCode = 403;
      throw err;
    }
    if(action === 'delete' || action === "modify")
    {
      if(!arr_valid.length || !modify_value)
      {
        let err  = new Error("Blank Input Array");
        err.statusCode = 406;
        throw err;
      }
      let index  = arr_valid.indexOf(modify_value)
      if(action === "delete")
      {
        arr_valid.splice(index,1);
      }
      else {
        arr_valid[index]=modify_value;
      }
    }
    else if(action === "add") {
      let check_existance  =  arr_valid.filter(item=>item === modify_value)
      if(!check_existance.length)
      {
        arr_valid.push(modify_value);
      }
    }
    res.status(200).json({message:'Successfully done !'});

  } catch (e) {
    if (!err.statusCode)
    {
        err.statusCode = 500;
        err.message = "something went wrong !"
    }
    next(err);
  }
}

exports.login = async (req,res,next)=>{
  const user_name=req.body.username;
  const password=req.body.password;
  let validUser;
  try
  {
     if (user_name == "" || password =="") {
       const error = new Error("insufficient data !")
       error.statusCode = 406
       throw error
     }
      const user=await User.findOne({username:user_name});
      validUser=user;
      if (!user)
      {
        const error = new Error('wrong credentials !');
        error.statusCode = 401;
        throw error;
      }
      if(!user.password)
      {
        const error = new Error('wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const isEqual=await bcrypt.compare(password,user.password);
      if (!isEqual)
      {
        const error = new Error('wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token=jwt.sign({ u_name:validUser.username,userId:validUser._id},ACCESS_TOKEN_EXPIRES,{expiresIn:ACCESS_TOKEN_EXPIRES});
      const refreshToken=jwt.sign({ u_name:validUser.username,userId:validUser._id},REFRESH_TOKEN_SECRET_KEY,{expiresIn:REFRESH_TOKEN_EXPIRES});
      user.refreshToken=refreshToken;
      await user.save();
        res.status(200).json({message:"Login Success",token:token,refreshToken:refreshToken,userId:user._id});

  }
  catch(err)
  {
    if (!err.statusCode)
    {
        err.statusCode = 500;
        err.message = "something went wrong !"
    }
    next(err);
  }
};


exports.signup=async(req,res,next)=>{
  try
  {
    const username =req.body.username;
    const password = req.body.password;
    if(!username || !password)
    {
      const error = new Error('Data Not Sufficent !');
      error.statusCode = 406;
      throw error;
    }
    const user = await User.findOne({username:req.body.username})
    if(user)
    {
      const error = new Error('User Already There !');
      error.statusCode = 401;
      throw error;
    }
    const hashedPwd=await bcrypt.hash(password,12);
    const newUser = await new User({
      username:username,
      password:hashedPwd,
      refreshToken:""
    })
    await newUser.save();
    res.status(201).json({message:"User Created"});
  }
  catch(err)
  {
    if (!err.statusCode)
    {
        err.statusCode = 500;
        err.message = "something went wrong !"
    }
    next(err);
  }
}

//Endpoint to refresh the Token
exports.checkToken=async(req,res,next)=>{
  const id=req.body.userId;;
  const refreshToken=req.body.refreshToken;let newAccessToken,decodedToken;
  try
  {
      const user=await User.findOne({_id:id});
      if(user.refreshToken===refreshToken)
      {
        try
        {
          decodedToken =jwt.verify(refreshToken,REFRESH_TOKEN_SECRET_KEY);
        }
        catch(err)
        {
          err.message='Refresh Token Expired. Re-Enter credentials to login!'
          err.statusCode = 401;
          throw err;
        }
        newAccessToken=jwt.sign({  u_name:user.username,userId:user.ide},ACCESS_TOKEN_KEY,{expiresIn:'25m'});
      }
      else
      {
        const error = new Error('Invalid Request.Refresh Token not Found. Login again !.');
        error.statusCode = 401;
        throw error;
      }
      res.status(200).json({message:"Tokens updated",newAccessToken:newAccessToken});
  }
  catch(err)
  {
    if (!err.statusCode)
    {
        err.statusCode = 500;
        err.message = "something went wrong !"
    }
    next(err);
  }
}
