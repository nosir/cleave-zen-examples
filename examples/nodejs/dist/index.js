"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleave_zen_1 = require("cleave-zen");
const options = { delimiter: '-' };
const value = (0, cleave_zen_1.formatCreditCard)('5163000011112222', options);
console.log(value);
