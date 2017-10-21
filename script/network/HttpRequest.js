import BaseConfig from '../common/Config.js'
import HttpProtocolConfig from './HttpProtocolConfig';

import {timer, formatTime} from 'redux-logger/src/helpers';
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const groupLog = isDebuggingInChrome
    ? console.groupCollapsed
    : console.log;
const groupEnd = isDebuggingInChrome
    ? console.groupEnd
    : console.log;

function transformParams2Body(params) {
    let body = '';
    if (typeof params === 'object') {
        for (var key in params) {
            var value = params[key]
            body = addParamToBody(body, key, value)
        }
    }
    return body
}

function addParamToBody(body_, key_, value_) {
    if (value_ === undefined || value_ === null) {
        return body_
    }
    var value_ = encodeURIComponent(value_)
    if (body_.length === 0)
        return key_ + '=' + value_
    else if (body_.length > 0)
        return key_ + '=' + value_ + '&' + body_
}

function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

var headerConfig = {}

export const setHttpRequestHeader = function(header)
{
    headerConfig = header;
}

export const addHttpRequestHeader = function(header)
{
    headerConfig = {...headerConfig,...header}
}

export const HttpRequest = function(urlOrKey, params = {}, method = 'GET') {
    let url = urlOrKey;
    let requestMethod = method;
    let body = params;
    let config = HttpProtocolConfig[urlOrKey];
    if (config) {
        url = `${BaseConfig.urlBase}${config.url}`;
        requestMethod = config.method;
    }
    body = transformParams2Body(params);
    ///logger
    var logObj = {
        urlOrKey,
        requestMethod,
        url,
        body
    };
    logObj.startTime = timer.now();
    logObj.requestState = 'start';
    httpRequestLogger(logObj);
    ///
    return timeout(30000, fetch((requestMethod == 'GET')? `${url}?${body}`: url,
        {
            method: requestMethod,
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                ...headerConfig
            },
            body : (requestMethod == 'GET')? null: body
        })).then((response) => {
        return handleResponse(response,logObj);
    }).catch(e => {
        logObj.requestState = 'error';
        logObj.error = e;
        httpRequestLogger(logObj);
        return Promise.reject(e);
    });
}

export const httpRequestLogger = function(logObj) {
    const time = new Date();
    const formattedTime = formatTime(time)
    const formattedDuration = (logObj.requestState != 'start')
        ? `in ${ (timer.now() - logObj.startTime).toFixed(2)} ms`
        : ``;
    const formattedUrl = (logObj.requestMethod == 'GET')
        ? `${logObj.url}?${logObj.body}`
        : `${logObj.url}\nBody: ${logObj.body}`;
    let formattedColor = "color:blue";
    if (logObj.requestState == 'start')
        formattedColor = "color:blue";
    else if (logObj.requestState == 'finish')
        formattedColor = "color:green";
    else
        formattedColor = "color:red";

    groupLog(`[HttpRequest] ${logObj.requestMethod} ${logObj.requestState} %c${logObj.urlOrKey}`, formattedColor, ` ${formattedTime} ${formattedDuration}`)
    console.log(`${formattedUrl}`)
    if (logObj.requestState == 'error')
        console.log(logObj.error);
    else if (logObj.requestState == 'finish')
        console.log(logObj.res);
    groupEnd()
}

export const handleResponse = function(response, logObj) {
    return new Promise(function(resolve, reject) {
        response.json().then(res => {
            logObj.requestState = 'finish';
            logObj.res = res;
            httpRequestLogger(logObj);
            resolve(res);
        }).catch(e => reject(e))
    })
}