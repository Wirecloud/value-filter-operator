/*
 * value-filter
 * https://github.com/Wirecloud/value-filter
 *
 * Copyright (c) 2018 Universidad Politécnica de Madrid
 * Licensed under the MIT license.
 */

(function () {

    "use strict";

    var parseInputEndpointData = function parseInputEndpointData(data) {
        if (typeof data === "string") {
            try {
                data = JSON.parse(data);
            } catch (e) {
                throw new MashupPlatform.wiring.EndpointTypeValue();
            }
        } else if (data == null || typeof data !== "object") {
            throw new MashupPlatform.wiring.EndpointTypeValue();
        }
        return data;
    };

    var index = function index(obj,i) {
        return obj[i]
    };

    var filterData = function filterData(event_data) {
        var data = parseInputEndpointData(event_data);
        var value;
        var path = MashupPlatform.prefs.get('prop_name');
        if (path !== "") {
            value = path.split('.').reduce(index, data);
            value = (value == undefined ? null : value);
            MashupPlatform.wiring.pushEvent('outputData', value);
        }
    };

    MashupPlatform.wiring.registerCallback('inputData', filterData);
    MashupPlatform.prefs.registerCallback(function (new_preferences) {

    }.bind(this));

    /* test-code */

    /* end-test-code */

})();
