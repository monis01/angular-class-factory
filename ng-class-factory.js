/*
    //@ it does not support types, will be added in further versions 
*/
angular.module('ngClassFactory', [])
    .factory('classFactory', [function() {
        var error = {}

        function classObject() {
            if (arguments.length) {
                for (var i in arguments) {
                    this[arguments[i]] = '';
                }
            } else {
                return this;
            }
        }
        classObject.prototype.addKeys = addKeys;
        classObject.prototype.removeKeys = removeKeys;
        classObject.prototype.resetKeys = resetKeys;
        classObject.prototype.forceResetToNull = forceResetToNull;
        classObject.prototype.setKeysToNull = setKeysToNull;
        classObject.prototype.removeEmptyValueKeys = removeEmptyValueKeys;
        classObject.prototype.areAllKeysNull = areAllKeysNull;

        function addKeys() {
            //@ this function takes list of keys as an argument and add to current referrenced object
            var self = this;
            try {
                if (arguments.length) {
                    for (var i in arguments) {
                        self[i] = ''
                    }
                } else {
                    error.code = 1;
                    error.msg = "Keys are missing"
                    throw error
                }
            } catch (e) {
                console.log(e);
            }
            return self;
        }

        function removekeys() {
            var self = this;
            try {
                if (arguments.length) {
                    for (var i in arguments) {
                        if (Object.keys(self).indexOf(arguments[i]) != -1) {
                            delete self[arguments[i]];
                        }
                    }
                    return self;
                } else {
                    error.code = 1;
                    error.msg = "Keys are missing"
                    throw error
                }
            } catch (e) {
                console.log(e.message);
            }
        }

        function resetKeys() {
            //@ if keys in arguments will be provied, then those keys will be resetted
            //@ else whole keys will get reset
            var self = this;
            if (arguments.length) {
                resetMe(arguments);
            } else {
                resetMe(Object.keys(self));
            }

            function resetMe(keysVal) {
                for (var i in keysVal) {
                    self[i] = '';
                }
            }
            return self;
        }

        function forecResetToNull() {
            var self = this;
            self.forEach(function(value, key) {
                self[key] = null;
            })
            return self;
        }

        function setKeysToNull() {
            var self = this;
            try {
                if (arguments) {
                    for (var i in arguments) {
                        self[i] = null
                    }
                } else {

                }
            } catch (e) {

            }
            return self;
        }


        function removeEmptyValueKeys() {
            var self = this;
            Object.keys(self).forEach(function(value, key)) {
                if (self[value] == '') {
                    self[value] = null;
                }
            }
            return self;
        }

        function areAllKeysNull() {
            var self = this;
            var allKeysNull = true;
            Object.keys(self).forEach(function(value, key) {
                if (self[value] != null) {
                    allKeysNull = false;
                }
            })
            return allKeysNull;
        }

        return classObject;
    }])