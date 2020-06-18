const jwt = require("jsonwebtoken");
const {tokens,secret} = require("../config/config").jwt;
const uuid = require("uuid/v4")

const mongoose =require("mongoose");

const Token = require("../models/token");

const generateAccessToken = (userId) => {
    const payload = {
        userId,
        type: tokens.access.type
    };
    const option = {expiresIn: tokens.access.expiresIn};
    return jwt.sign(payload,secret,option);
}

const generateRefreshToken = (userId) => {
    const payload = {
        id: uuid(),
        type: tokens.refresh.type
    };
    const option = {expiresIn: tokens.refresh.expiresIn};

    return {
        id: payload.id,
        tokens: jwt.sign(payload,secret,option)
    }
}

const replaceDbRefreshToken = (tokenId,userId) => 
    Token.findOneAndDelete({userId})
    .exec()
    .then(() => {Token.create({tokenId,userId})})

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
}