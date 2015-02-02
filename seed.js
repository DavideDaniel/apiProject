var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("musicUsers.db");

// db.run("INSERT INTO pets (name,type) VALUES", 
//     'Fluffy', 'hamster',
//     'salty', 'cat', 
//     'pepper', 'cat',
//     'big moe', 'frog', 
//     'Frick', 'goldfish',
//     'frack', 'goldfish', 
//     function(err){
//         if (err) {
//             throw err;
//         }
//     }
// );