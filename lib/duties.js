var log = require('util').debuglog('duties');

var Duties = function() {
    if(!(this instanceof Duties))
        return new Duties();

    this.stack   = [];
    this.looping = false;
    this.suspend = false;
};

Duties.prototype = {
    add: function(func) {
        var self = this;
        var utils = {
            suspend: function suspend() {
                self.suspend = true;
            },
            resume: function resume() {
                self.suspend = false;
                if(self.looping)
                    process.nextTick(self.tick.bind(self));
            },
            step: function step() {
                return {};
            },
            add: this.add.bind(this)
        };

        var params = Array.prototype.slice.call(arguments, 1);
        var gen = func.apply({}, [utils].concat(params));
        gen.name = func.name;
        this.stack.push(gen);
    },
    start: function() {
        this.looping = true;
        process.nextTick(this.tick.bind(this));
    },
    stop: function() {
        this.looping = false;
    },
    tick: function() {
        log(this.stack.map(function(x) { return x.name }));

        if(this.suspend)
            return;

        if(this.stack.length == 0) {
            this.looping = false;
            return;
        }

        if(this.looping)
            process.nextTick(this.tick.bind(this));

        var index  = this.stack.length - 1;
        var gen    = this.stack[index];
        var result = gen.next();

        if(result.done)
            this.stack.splice(index, 1);
    }
};

module.exports = Duties;
