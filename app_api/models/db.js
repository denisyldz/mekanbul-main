var mongoose = require("mongoose");
//var dbUrl ="mongodb://localhost/mekanbul"
var dbUrl ="mongodb+srv://denisyldz:denisyldz@mekanbul.daf39vm.mongodb.net/mekanbul?retryWrites=true&w=majority";
require("./mekansema");
mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => {
    console.log(dbUrl + " adresindeki veri tabanına bağlandı");
});

mongoose.connection.on("error", () => {
    console.log("Bağlantı hatası");
});

mongoose.connection.on("disconnected", () => {
    console.log("Bağlantı kesildi");
});

function close(msg, callback) {
    mongoose.connection.close(() => {
        console.log(msg);
        callback();
    });
}
process.on("SIGINT", () => {
    close("Uygulama kapatilidi", () => {
        process.exit(0);
    });
});