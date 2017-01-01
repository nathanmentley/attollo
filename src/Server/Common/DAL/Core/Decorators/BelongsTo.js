export default function(name, type, field, through) {
    return function (target) {
        target.prototype.BelongsTo = target.prototype.BelongsTo || [];

        if(through) {
            through.forEach((x) => x.Field = x.Field.toLowerCase());
        }

        target.prototype.BelongsTo.push({ Name: name, Type: type, Field: field.toLowerCase(), Through: through });
    }
};