import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import RoundNumber from './lib';

let schema = new Schema({
    num: Number,
    roundNum: {
        type: RoundNumber,
        fractionDigits: 2,
    }
});
let M = mongoose.model('M', schema);
let m: any = new M({
    num: 0.01,
    roundNum: 0.01,
});

console.log(m);
//output: {num: 0.01, roundNum: 0.01 }

m.num += 0.06;
m.roundNum += 0.06;
console.log(m);
//output: { num: 0.06999999999999999, roundNum: 0.07 }