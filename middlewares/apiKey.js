const express = require('express');
const jwt = require('jsonwebtoken')

// apikey is nesseccery for login  or register api....
const apiKey =  function (req,res,next){
    if(req.header('Authorization') == "rohitbind")
    {
        next();
    }else{
         res.status(401).json({'success':false,'message':"api key daala.."});
    }
}

const ensureToken = function(req,res,next){
    var bearerHeader = req.header('Authorization')

    if(typeof bearerHeader === 'undefined')
        res.status(401).json({'success':false,'message':"Naa Naa token dala...."})

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    try {
        const decoded = jwt.verify(bearerToken, "RohitBindKey");
        req.user = decoded.user;
        next();
    } catch (e) {
        res.status(401).json({'success':false,'error':e.message,'message':"Naa Naa sahi token dala...."})
    }
}

module.exports = {
    apiKey:apiKey,
    ensureToken:ensureToken
};