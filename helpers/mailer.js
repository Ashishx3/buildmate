import User from '@/models/userModel';
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email, emailType, userID})=>{

try{

  const hashedToken = await bcryptjs.hash(userID.toString(),10)


    if (emailType === "VERIFY" ) {
      await User.findByIdAndUpdate(userID,
        {
        $set:{verifyToken:hashedToken, verifyTokenExpiry : Date.now() + 3600000}})
      
    }
    else if(emailType === "RESET"){
       await User.findByIdAndUpdate(userID,
        {
        
        $set:{forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry : Date.now() + 3600000}})
    }

    
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "9279910194c64e", // 😁😁
    pass: "4e8b9b3577bc99"
  }
});

const mailOptions = {
    from: "ashish@singh.ai",
    to: email,
    subject: emailType === 'VERIFY' ? "VERIFY YOUR EMAIL": "RESET YOUR PASSWORD",
   
    html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser.
    <br>
    ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>`, 
  }
  
 const mailResponse =  await transporter.sendMail(mailOptions)
 return mailResponse
}
catch (error) {
  console.error("Error sending email:", error)
  throw new Error("Failed to send verification email")
}




}