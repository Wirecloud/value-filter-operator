/* globals MockMP */

(function () {

    "use strict";

    describe("ValueFilter", function () {

        beforeAll(function () {
            window.MashupPlatform = new MockMP({
                type: 'operator',
                prefs: {
                    "prop_name": "attr"
                },
                inputs: ['inputData'],
                outputs: ['outputData']
            });
        });

        beforeEach(function () {
            MashupPlatform.reset();
        });

        it("supports JSON encoded data", function () {
            filterData('{"attr": "value"}');

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('outputData', "value");
        });

        it("does nothing if prop_name is empty", function () {
            MashupPlatform.prefs.set("prop_name", "");

            filterData('{"attr": "value"}');

            expect(MashupPlatform.wiring.pushEvent).not.toHaveBeenCalled();
        });

        it("filters multilevel paths", function () {
            MashupPlatform.prefs.set("prop_name", "a.1.c");

            filterData('{"a": [false, {"c": "value"}]}');

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('outputData', "value");
        });

        it("don't crash when filtering multilevel paths and some level does not exist", function () {
            MashupPlatform.prefs.set("prop_name", "a.1.c");

            filterData('{"a": true}');

            expect(MashupPlatform.wiring.pushEvent).toHaveBeenCalledWith('outputData', null);
        });

        it("throws an Endpoint Value error if data is not valid JSON data", function () {
            expect(function () {
                filterData("{a}");
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("throws an Endpoint Type error if data is not a JSON object", function () {
            expect(function () {
                filterData("5");
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

        it("throws an Endpoint Type error if data is not an object", function () {
            expect(function () {
                filterData(5);
            }).toThrowError(MashupPlatform.wiring.EndpointTypeError);
        });

    });
})();
