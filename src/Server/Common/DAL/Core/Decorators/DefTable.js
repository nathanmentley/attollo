export default function() {
    return function (target) {
        target.IsSystemData = true;
    }
};