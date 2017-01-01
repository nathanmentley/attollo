export default function(name, type, field, through) {
    return function (target) {
        target.prototype.HasMany = target.prototype.HasMany || [];

        if(through) {
            through.forEach((x) => x.Field = x.Field.toLowerCase());
        }

        target.prototype.HasMany.push({ Name: name, Type: type, Field: field.toLowerCase(), Through: through });
    }
};