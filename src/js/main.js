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
                throw new MashupPlatform.wiring.EndpointTypeError();
            }
        }

        if (data == null || typeof data !== "object") {
            throw new MashupPlatform.wiring.EndpointTypeError();
        }

        return data;
    };

    var index = function index(obj, i) {
        return obj == null ? null : obj[i];
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

    /* TODO
     * this if is required for testing, but we have to search a cleaner way
     */
    if (window.MashupPlatform != null) {
        MashupPlatform.wiring.registerCallback('inputData', filterData);
    }

    /* test-code */
    window.filterData = filterData;
    /* end-test-code */

})();
