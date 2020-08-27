import axios from 'axios';

export const httpGetData = function (
    url,
    config,
    successCallback,
    errorCallback
) {
    "use strict";
    axios
        .get(url, config)
        .then(response => {
            successCallback(response);
        })
        .catch(error => {
            errorCallback(error);
        });
};