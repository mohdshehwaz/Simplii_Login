const User = require('../models/user');
const sendEmail = require('../mailer/mailer');

module.exports.create_otp = async (req,res)  => {
    try{
        
        let otpCode = Math.floor((Math.random()*10000) + 1);
        console.log("OTP is -> ", otpCode);
        var data = await User.findOne({email:req.body.email});
        if(data){
            let curr  = new Date().getTime();
            let diff = data.gap - curr;

            let blockTime = data.blocked-curr;
            if(blockTime > 0){
                return res.json(200,{
                    message:"Your Account has been blocked duee to wrong password please try again after some time"
                });
            }

            if(diff>0){
                return res.json(200,{
                    message:"We can not generate token in less than minute"
                });
            }
            else{
                console.log("In difference of the email ",diff);
                if(data.verified === true){
                    return res.json(500,{
                        message:"Email address has been verified already"
                    });
                }
                data = await User.updateOne({
                    _id:data._id
                },{
                    $set:{
                        otp:otpCode,
                        gap:new Date().getTime() + 60*1000,
                        expiryIn:new Date().getTime() + 300*1000,
                        verified:false
                    }
                });
                return res.json(200,{
                    message:"OTP generated again successfully",
                    OTP:otpCode
                })
            }
            
        }
        const user = await User.create({
            email:req.body.email,
            expiryIn:new Date().getTime() + 300*1000,
            otp:otpCode,
            gap:new Date().getTime() + 60*1000
            
        });
        
        sendEmail.sendMail(user,otpCode);
        console.log("user is -> ", user);
        return res.json(200,{message:"OK",OTP:otpCode});
    }
    catch(err){
        console.log(err.message);
        return res.json(500,{
            message:"Please enter valid email address"
        });
    }
}

module.exports.verify_otp = async (req,res) => {
    try{
        var data = await User.findOne({email:req.body.email});
        
        if(data){
            let curr  = new Date().getTime();
            let diff = data.expiryIn - curr;
            if(data.verified === true){
                return res.json(200,{
                    message:"OTP has already been used Please try to generate another otp"
                });
            }
            let blockTime = data.blocked-curr;
            if(blockTime > 0){
                return res.json(200,{
                    message:"Your Account has been blocked duee to wrong password please try again after some time"
                });
            }


            if(diff<0){
                // data = await User.updateOne({
                //     _id:data._id
                // },{
                //     $set:{
                //         count:count,
                //     }
                // });
                return res.json(200,{
                    message:"Token has been expired, Please generate a new token"
                });
            }
            else{
               
                if(data.otp === req.body.otp){
                    
                    data = await User.updateOne({
                        _id:data._id
                    },{
                        $set:{
                            verified:true,
                        }
                    });
                    return res.json(200,{
                        message:"Email has been verified successfully"
                    });
                }
                else{
                    let count = data.count + 1;
                    if(count === 5){
                        data = await User.updateOne({
                            _id:data._id
                        },{
                            $set:{
                                blocked:new Date().getTime() + 60*60*1000,
                            }
                        });
                        console.log("In the count section ",data);
                        return res.json(200,{
                            message:"Your email address has been blocked for 1 hour"
                        });
                    }
                    data = await User.updateOne({
                        _id:data._id
                    },{
                        $set:{
                            count:count,
                        }
                    });
                    return res.json(200,{
                        message:"You have entered wrong OTP, Please try again"
                    });
                }
            }

        }
    }
    catch(err){
        console.log(err.message);
        return res.json(500,{
            message:"Please enter valid email address"
        });
        
    }
}