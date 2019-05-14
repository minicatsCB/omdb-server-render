let core = {
    requestData: function(url) {
        return fetch(url).then(response => {
            if(response.ok) {
                return response.json().then(data => {
                    return Promise.resolve(data);
                });
            } else {
                return Promise.reject(response.status);
            }
        });
    }
}

module.exports = core;
