"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericSyntax = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
class GenericSyntax {
    constructor(obj) {
        this.parseObj(obj);
    }
    parseObj(obj) {
        const keys = Object.keys(obj);
        keys.forEach((key) => {
            const value = obj[key];
            this[key] = GenericSyntax.parseValue(value);
        });
    }
    static parseValue(value) {
        if (typeof value === "string" ||
            typeof value === "boolean" ||
            typeof value === "number")
            return value;
        else if (value instanceof Array)
            return value.map((v) => GenericSyntax.parseValue(v));
        else if (typeof value === "object") {
            return new GenericSyntax(value);
        }
        throw new Error("Unexpected value type: " + typeof value);
    }
}
exports.GenericSyntax = GenericSyntax;
