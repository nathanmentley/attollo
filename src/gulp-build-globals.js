(() => {
    //load package.json
    var fs = require('fs');
    var json = JSON.parse(fs.readFileSync('./package.json'));
    var gitrev = require('git-rev-sync');

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();

    var version = json.version + '-' + gitrev.branch('/home/web/git') + '.' + gitrev.short('/home/web/git') + '.' + year + '.' + month + '.' + day;

    exports.version = version;
})();