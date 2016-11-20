export default class ArrayUtils {
    static GetUnique(array, selector) {
        var values = [];

        array.forEach((x) => {
            var value = selector(x);

            if(values.indexOf(value) == -1) {
                values.push(value);
            }
        });

        return values;
    }
}