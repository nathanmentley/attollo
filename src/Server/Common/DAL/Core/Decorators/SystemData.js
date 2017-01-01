export default function() {
    return function (target) {
        target.prototype.IsSystemData = true;
    }
};