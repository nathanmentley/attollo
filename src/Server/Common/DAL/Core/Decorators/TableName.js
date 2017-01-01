export default function(tableName) {
    return function (target) {
        target.prototype.TableName = tableName.toLowerCase();
    }
};