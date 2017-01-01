export default function(hiddenFields) {
    return function (target) {
        target.prototype.HiddenFields = hiddenFields;
    }
};