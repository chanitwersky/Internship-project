export default class Validators {
    static validateId(id: string): boolean {
        if (id.length > 9 && !/^-?\d+$/.test(id)) {
            return false;
        }

        return true;
    }
}