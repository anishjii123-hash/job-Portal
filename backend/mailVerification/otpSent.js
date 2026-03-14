import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();



      export const sentOtp = async (email,otp) => {
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
      })
      const mailOptions = {
        from:process.env.MAIL_USER,
        to:email,
        subject:"OTP for Password Reset",
        html:`Your OTP for password reset is <b>${otp}</b>. It will expire in 10 minutes.`
        
      }
      transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
          console.log(error)
        }else{
          console.log("Email sent: " + info.response)
        }
      })

      }
     