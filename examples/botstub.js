// Super ghetto stub. Don't judge me

module.exports = function() {};
module.exports.prototype.findBlockToBreak = function() {
    return { type: 'block', id: 'stone', location: { type: 'location', x: 0, y: 0, z: 0 } };
};
module.exports.prototype.navigate = function(location, cb) {
    console.log('[navigate] starting' /* + JSON.stringify(location) */);
    setTimeout(function() {
        console.log('[navigate] done');
        cb();
    }, 3000);
};
module.exports.prototype.breakBlock = function(block, cb) {
    console.log('[break]    starting' /* + JSON.stringify(block) */);
    setTimeout(function() {
        console.log('[break]    done');
        cb();
    }, 3000);
};
module.exports.prototype.attack = function(target, cb) {
    console.log('[attack]   swing' /* + JSON.stringify(target)) */);
    setTimeout(function() {
        if(--target.health == 0)
            target.dead = true;
        cb();
    }, 100);
};
module.exports.prototype.on = function(e, cb) {
    setTimeout(function() {
        console.log('!!! A zombie appears !!!');
        cb({ type: 'mob',   id: 'zombie', dead: false, health: 20 });
    }, 7000);
};
module.exports.prototype.chat = function(message) {
    console.log('[chat]     "' + message + '"');
}
