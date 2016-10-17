export default class ObjectUtils {
    static Clone(object) {
        return JSON.parse(JSON.stringify(object));
    }
}