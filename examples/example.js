var Duties = require('../index.js');
var Bot = require('./botstub.js');

var duties = new Duties();
var bot = new Bot(); // stub for other bot related code

var MiningTask = function* MiningTask(d, config) {// node --harmony required
    while(true) {
        var block = bot.findBlockToBreak();
        yield d.add(NavigateTask,   block.location);
        yield d.add(BreakBlockTask, block);
    }
};

var NavigateTask = function* NavigateTask(d, location) {
    bot.navigate(location, d.resume);
    yield d.suspend();
};

var BreakBlockTask = function* BreakBlockTask(d, block) {
    bot.breakBlock(block, d.resume);
    yield d.suspend();
};

var ExecuteTask = function* ExecuteTask(d, target) {
    while(!target.dead) {
        bot.attack(target, d.resume);
        yield d.suspend();
    }
};

duties.add(MiningTask);

bot.on('threatDetected', function(threat) {
    duties.add(ExecuteTask, threat);
});

duties.start();
