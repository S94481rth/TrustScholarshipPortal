const bcrypt = require('bcrypt');
const saltRounds = 10;

bcrypt.hash("apple", saltRounds, (err, hash) => {
    console.log(hash)
})


bcrypt.compare("apple", "$2b$10$MSvApeO.VM1Smhq./oDNJerwYkkNIiaXmoxx4HskYa5h98WhHrgIu", (err, result)=> {
    console.log(result)
})