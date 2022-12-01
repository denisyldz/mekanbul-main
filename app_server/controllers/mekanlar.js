var express = require('express');
var router = express.Router();
const axios = require("axios");
var apiSecenekleri= {
    sunucu:"http://localhost:3000",
    apiYolu:"/api/mekanlar"
}

var mesafeyiFormatla = function(mesafe) {
    var yeniMesafe,birim;
    if(mesafe>1){
        yeniMesafe = parserFloat(mesafe).toFixed(1);
        birim="km";
    }else {
        yeniMesafe= parseInt(mesafe*1000,10);
        birim = "m"
    }
return yeniMesafe+birim;
}
var anaSayfaOlustur=function(res,mekanListesi) {
    var mesaj;
    if(!(mekanListesi instanceof(Array))){
        mesaj="API HATASI: Bir şeyler ters gitti.";
        mekanListesi=[];
    } else {
        if(!mekanListesi.length) {
            mesaj="Civarda herhangi bir mekan yok.";
        }
    }
    res.render("anasayfa",{
        "baslik":"Anasayfa",
        "sayfaBaslik": {
            "siteAd":"MekanBul",
            "slogan":"Mekanları Keşfet"
        },
        "mekanlar": mekanListesi,
        "mesaj": mesaj
    });
}
const anaSayfa=function(req, res, next) {
    axios.get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu, {
        params:{
            enlem:req.query.enlem,
            boylam:req.query.boylam
        }
    }).then(function(response){
        var i,mekanlar;
        mekanlar = response.data;
        for(i=0;i<mekanlar.length;i++){
            mekanlar[i].mesafe=mesafeyiFormatla(mekanlar[i].mesafe);
        }
        anaSayfaOlustur(res,mekanlar);
    }).catch(function(hata){
        anaSayfaOlustur(res,hata);
    });
}


const mekanBilgisi=function(req, res) {
    res.render('mekanbilgisi',
    { 
        "baslik":"Mekan Bilgisi",
        "mekanBaslik":"Starbucks",
        "mekanDetay": {
            "ad":"Starbucks",
            "adres":"Modernevler",
            "puan":"4",
            "imkanlar": ["Kahve","Çay","Kek"],
            "koordinatlar": {
                "enlem":"37.7",
                "boylam":"30.5"
            },
            "saatler": [
                {
                    "gunler":"Pazartesi-Cuma",
                    "acilis":"9:00",
                    "kapanis":"23:00",
                    "kapali": false
                },
                {
                    "gunler":"Cumartesi-Pazar",
                    "acilis":"10:00",
                    "kapanis":"22:00",
                    "kapali": false
                }
            ],
            "yorumlar": [
                {
                    "yorumYapan":"Deniz YILDIZ",
                    "puan":"4",
                    "tarih":"29 Ekim 2022",
                    "yorumMetni":"Kahveler iyi."
                }
            ]
        }
    });
};

const yorumEkle = function(req, res, next) {
    res.render('yorumekle', { title: 'Yorum Sayfası' });
};

module.exports = {
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}

