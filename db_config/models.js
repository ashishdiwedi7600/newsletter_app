// const database = require("../models/signUp")                                

// exports.insertRecord = async (records) => {
//     console.log("hhhhhhh",records);
//     const { name,phone, email, randomPassword, verificationPasscode,accountStatus } = records

//     return new Promise(async(resolve, reject) => {
//         const newuser = new database.signUp({ name,phone, email, randomPassword,verificationPasscode,accountStatus });
//          await database.signUp.insertMany([newuser])
//             .then(r => {
                
//                 resolve({ status: 200, msg: 'added successfully' })
                
//             })
//             .catch(e => { reject(e)})
//     })
// }


// exports.userLogin = async (records) => {


//     console.log(records,'aaa');
//     const {email,password}=records 
//     return new Promise((resolve, reject) => {
//         database.signup.findOne({'email':email,'password':password})
//             .then(r => { 
//                 console.log(r,'oooo')
//                 resolve({ status: 200,data:r, msg: 'added successfully' })
                
//             })
//             .catch(e => {console.log(e,'eeee'), reject({status:404,data:e,msg:'invalid user'}) })
//     })
// }