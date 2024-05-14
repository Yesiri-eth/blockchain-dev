const express =require("express");
const validator = require("validator");
const database = require("./database");
const UserModel = require("./usermodel");
const dotenv = require("dotenv") ;
const jwt = require("jsonwebtoken")
dotenv.config()
const AuthMiddleware = require("./middleware")

const {isAddress, ethers, verifyMessage} = require("ethers")
const{Op} = require("sequelize");
const app = express()
const walletsignerviewcontroller = require("./controllers/walletsignerviewcontroller");
app.use(express.json())
app.set("view engine","ejs")

async function logincontroller(req, res){
    const {email , password} = req.body;
if (!email){
    return res.status(400).json({message: "email cannot be found"})
}    
if (!password){
    return res.status(400).json({message: "password cannot be found"})}
if (!validator.isEmail(email)){
    return res.status(400).json({message: "email isn't valid"})
}

if(!validator.isStrongPassword(password)){
    return res.status(400).json({message: "password is not strong"})
}
const lowercaseemail=email.toLowerCase()
const user = await UserModel.findOne({
    where:{
        email: lowercaseemail,
        password: password
    }
})
if (!user){
    return res.status(401).json({message: "user cannot be found"})
}

const accessToken = jwt.sign({id:user.id, email: user.email, address: user.address}, process.env.SECRET)
return res.json({accessToken})

 return res.json({message:"login successful"})
} 



async function registrationcontroller(req, res){
    const {email , password, address} = req.body;
    if (!email){
        return res.status(400).json({message: "email cannot be found"})
    }    
    if (!address){
        return res.status(400).json({message: "address cannot be found"})
    }
    if (!password){
        return res.status(400).json({message: "password cannot be found"})
    }
     
    if(!isAddress(address)) {
        return res.status(400).json({message: 'address is not valid'})
    }

    
    if (!validator.isEmail(email)){
        return res.status(400).json({message: "email isn't valid"})
    }
    
    if(!validator.isStrongPassword(password)){
        return res.status(400).json({message: "password is not strong"})
    }
const lowercaseemail = email.toLowerCase()
const lowercaseaddress = address.toLowerCase()
    const user = await UserModel.findOne({
        where:{
          [Op.or]: {
            address: lowercaseaddress,
            email: lowercaseemail
          }
        }
    })
    if (user){
        return res.status(401).json({message: "user have ALREADY REGISTERED or email or address already exists"})
    }

    const newuser = await UserModel.create({
        email: lowercaseemail,
        address: lowercaseaddress,
        password
    })
    await newuser.save()
        return res.json({message:"registration completed"})

}
async function profilecontroller(req,res){
return res.status(200).json(req.user) 
}

async function loginwithwalletcontroller(req,res){
  const {timestamp , signature}=   req.body;
  const address = verifyMessage(timestamp, signature)

  
  const lowercaseaddress=address.toLowerCase()
  const user = await UserModel.findOne({
      where:{
          address: lowercaseaddress
        }
            })
            if (!user){
                return res.status(401).json({message: "invalid address"})
            }
            const parsetimestamp = parseInt(timestamp)
            // 100+60 = 160 > (100 to 130)
            if(timestamp > (Date.now() + (60000))){
                return res.status(401).json({message: "signature has exprired"})
            }
            const accessToken = jwt.sign({id:user.id, email: user.email, address: user.address}, process.env.SECRET)
            return res.json({accessToken})
   
  return res.status(200).json({address})
}
    app.post("/login/email", logincontroller)
app.post("/register", registrationcontroller) 
app.post("/login/wallet", loginwithwalletcontroller)
app.get("/profile",AuthMiddleware ,profilecontroller)
app.get("/signer", walletsignerviewcontroller)

app.listen(5000, function(){
    console.log ("server ti bere")
    database.sync(function() {
        console.log ("database started")
    })
})

