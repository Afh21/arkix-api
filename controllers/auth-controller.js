const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const keys = require('../extras/keys');
const {
   login: validateAuthLogin,
   register: validateAuthRegister
} = require('../models/validations/auth-validate');

module.exports = {
   login: (req, res) => {
      const { errors, isValid } = validateAuthLogin(req.body);

      if (!isValid) {
         return res.status(400).json({
            message: 'Login unsuccessfully',
            errors: errors,
            ok: isValid
         });
      }

      const { email, password } = req.body;
    
    await User
            .findOne({ email: email })
            .then(user => {      
      
                if (!user) {
                    errors.email = "User not found";
                    return res.status(404).json({
                    message: "User doesn't exists",
                    errors: errors,
                    ok: false
                    });
                }
      
                bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                    if (isMatch) {

                        const payload = {
                            id: user._id,
                            name: user.name,              
                            email: user.email,              
                        };
                        
                        jwt
                            .sign(
                                payload,
                                keys.secretJwt,
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                    message: "Token generate successfully",
                                    ok: true,
                                    token: "Bearer " + token,
                                    errors: errors
                                    });
                                }
                            );
                    } 
                    else {
                        errors.password = "Password Incorrect";
                    
                        return res.status(400).json({
                            message: "Ups! Password incorrect.",
                            ok: false,
                            errors: errors
                        })
                    }
                    })
                    .catch(err => err)   
                })
    }



} // Module.exports
