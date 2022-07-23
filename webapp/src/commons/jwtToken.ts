import base64url from "base64url";
import { LS_TOKEN_KEY } from "../constants";
var CryptoJS = require("crypto-js");
export function createJWTFake(email: string) {
    let header = {
        "alg": "HS256",
        "typ": "JWT"
    };
    let today = new Date();
    let expireDate = new Date();
    expireDate.setDate(today.getDate() + 1);
    let data = {
        "exp": expireDate.getTime(),
        "userName": email,
        "userId": 1
    };
    let secret = "GameOfThrones2022@";
    let jwtTokenData = {
        stringifiedHeader: "",
        encodedData: "",
        signature: ""
    };

    //jwtTokenData.stringifiedHeader = CryptoJS.enc.Utf8.parse().toString();
    let encodedHeader = base64url(JSON.stringify(header));

    //jwtTokenData.encodedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data)).toString();
    let encodedData = base64url(JSON.stringify(data));
    let token = encodedHeader + "." + encodedData;
    
    jwtTokenData.signature = CryptoJS.HmacSHA256(token, secret).toString();
    let signature = base64url(jwtTokenData.signature);
    let signedToken = token + "." + signature;

    return signedToken
}

export function getAccessToken() {
    let accessToken = localStorage.getItem(LS_TOKEN_KEY);
    if (accessToken != null && accessToken != "") {
        var accessTokenPayload = parseJwt(accessToken);
        // Check token expire
        let nowDateTime = new Date();
        let nowDateTimeBefore1Minute = nowDateTime.setMinutes(-1);
        let nowTimeStampBefore1Minute = Math.floor(nowDateTimeBefore1Minute);
        if (accessTokenPayload != null && accessTokenPayload.exp > nowTimeStampBefore1Minute) {
            return accessToken;
        }
        else {
            localStorage.removeItem(LS_TOKEN_KEY);
            return "";
        }
    }
    return "";
}

function parseJwt(token:string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export function getUserInfo(accessToken: string) {
    if(accessToken) {
        var accessTokenPayload = parseJwt(accessToken);
        return accessTokenPayload;
    }
    return {};
}