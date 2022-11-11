var mongoose = require("mongoose");
var dbUrl ="mongodb+srv://denisyldz:denisyldz1@cluster0.u35xhvx.mongodb.net/?retryWrites=true&w=majority";
require("./mekanShema");
mongoose.connect(dbUrl);

mongoose.connection.on("connected", () => {
    console.log(dbUrl + "adresindeki veri tabanin abaglandi");
});

mongoose.connection.on("error", () => {
    console.log("Baglanti hatasi");
});

mongoose.connection.on("disconnected", () => {
    console.log("BAglanti kesilidi");
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