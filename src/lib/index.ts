import * as mongoose from 'mongoose';
import { SchemaType, Error } from 'mongoose';

const SchemaName = 'RoundNumber';

type RoundNumberProp = { fractionDigits?: number };
class RoundNumber extends SchemaType {
    private options;
    private $conditionalHandlers;
    //@ts-ignore
    private castForQuery(arg): any;
    constructor(key, options) {
        super(key, options, SchemaName);
        Object.assign(this.$conditionalHandlers, {
            '$lt': val => this.castForQuery(val),
            '$lte': val => this.castForQuery(val),
            '$gt': val => this.castForQuery(val),
            '$gte': val => this.castForQuery(val),
        });
    }

    round(val: number, fractionDigits?: number) {
        let fd = fractionDigits || this.options.fractionDigits;
        if (fd) {
            let d = 10 ** fd;
            return Math.round(val * d) / d;
        }
        return Math.round(val);
    }
    cast(val) {
        if (val == null) {
            return val;
        }

        const _val = Number(val);
        if (isNaN(_val)) {
            throw new Error.CastError(SchemaName,
                val + ' is not a valid number', '');
        }
        return this.round(_val);
    }
}

mongoose.Schema.Types[SchemaName] = RoundNumber;
export default RoundNumber;