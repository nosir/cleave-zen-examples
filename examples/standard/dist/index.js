"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleave_zen_1 = require("cleave-zen");
const main = () => {
    log('General');
    const generalOptions = {
        delimiter: '-',
        blocks: [3, 3, 3],
    };
    const generalPrefix = 'PREFIX';
    log((0, cleave_zen_1.formatGeneral)('AAABBBCCC', generalOptions)); // AAA-BBB-CCC
    log((0, cleave_zen_1.formatGeneral)(`${generalPrefix}AAABBBCCC`, Object.assign(Object.assign({}, generalOptions), { prefix: generalPrefix, blocks: [6, 3, 3, 3] }))); // PREFIX-AAA-BBB-CCC
    log((0, cleave_zen_1.formatGeneral)(`${generalPrefix}AAABBBCCC`, Object.assign(Object.assign({}, generalOptions), { prefix: 'PREFIX', blocks: [6, 3, 3, 3], delimiters: ['-', ' ', ' ', ' '] }))); // PREFIX-AAA-BBB-CCC
    log('Credit Card');
    log((0, cleave_zen_1.formatCreditCard)('5163000011112222')); // 5163 0000 1111 2222
    const creditCardOptions = {
        delimiter: '@',
    };
    log((0, cleave_zen_1.formatCreditCard)('51630000', creditCardOptions)); // 5163@0000@
    log('Numeral');
    log((0, cleave_zen_1.formatNumeral)('3.14')); // 3.14
    const numeralOptions = {
        prefix: '$',
    };
    const numeralValue = '670032468.45';
    log((0, cleave_zen_1.formatNumeral)(numeralValue, numeralOptions)); // $670,032,468.45
    log((0, cleave_zen_1.formatNumeral)(numeralValue, Object.assign(Object.assign({}, numeralOptions), { numeralThousandsGroupStyle: cleave_zen_1.NumeralThousandGroupStyles.LAKH }))); // $67,00,32,468.45
    log((0, cleave_zen_1.formatNumeral)(numeralValue, Object.assign(Object.assign({}, numeralOptions), { numeralThousandsGroupStyle: cleave_zen_1.NumeralThousandGroupStyles.WAN }))); // $6,7003,2468.45
    log((0, cleave_zen_1.formatNumeral)(numeralValue, Object.assign(Object.assign({}, numeralOptions), { tailPrefix: true }))); // $6,7003,2468.45
    log((0, cleave_zen_1.formatNumeral)(numeralValue, Object.assign(Object.assign({}, numeralOptions), { delimiter: '.', numeralDecimalMark: ',' }))); // $670.032.468,45
    log('Date');
    log((0, cleave_zen_1.formatDate)('11041965')); // 11/04/1965
    const dateOptions = {
        datePattern: ['m', 'y'],
        delimiter: '-',
    };
    log((0, cleave_zen_1.formatDate)('0926', dateOptions)); // 09-26
    log((0, cleave_zen_1.formatDate)('24122023', { dateMin: '2046-12-31' })); // 31/12/2046
    log('Time');
    log((0, cleave_zen_1.formatTime)('093030')); // 09:30:30
    log((0, cleave_zen_1.formatTime)('993030')); // 09:30:30
    const timeOptions = {
        timePattern: ['h', 'm'],
        delimiter: '-',
    };
    log((0, cleave_zen_1.formatTime)('2130', timeOptions)); // 21-30
    // HTML DOM input
    const generalInput = document.querySelector('.general-input');
    const generalInputDelimiter = '-';
    const generalInputPrefix = 'PREFIX';
    const generalFormatOptions = {
        prefix: generalInputPrefix,
        blocks: [generalInputPrefix.length, 3, 3, 3],
        delimiter: generalInputDelimiter,
        uppercase: true,
    };
    (0, cleave_zen_1.registerCursorTracker)({
        input: generalInput,
        delimiter: '-',
        prefix: generalInputPrefix,
    });
    generalInput.value = (0, cleave_zen_1.formatGeneral)('', generalFormatOptions);
    generalInput.addEventListener('input', e => {
        const value = (0, cleave_zen_1.formatGeneral)(e.target.value, generalFormatOptions);
        generalInput.value = value;
    });
    const creditcardInput = document.querySelector('.creditcard-input');
    (0, cleave_zen_1.registerCursorTracker)({
        input: creditcardInput,
        delimiter: cleave_zen_1.DefaultCreditCardDelimiter,
    });
    creditcardInput.addEventListener('input', e => {
        var _a;
        const value = (0, cleave_zen_1.formatCreditCard)(e.target.value);
        creditcardInput.value = value;
        const type = (0, cleave_zen_1.getCreditCardType)(e.target.value);
        const creditCardTypeElement = (_a = document.querySelector('.creditcard-type')) !== null && _a !== void 0 ? _a : null;
        if (creditCardTypeElement != null)
            creditCardTypeElement.innerHTML = type;
    });
    const numeralInput = document.querySelector('.numeral-input');
    const numeralInputPrefix = '$';
    const numeralFormatOptions = {
        prefix: numeralInputPrefix,
    };
    (0, cleave_zen_1.registerCursorTracker)({
        input: numeralInput,
        delimiter: cleave_zen_1.DefaultNumeralDelimiter,
        prefix: numeralInputPrefix,
    });
    numeralInput.value = (0, cleave_zen_1.formatNumeral)('', numeralFormatOptions);
    numeralInput.addEventListener('input', e => {
        const value = (0, cleave_zen_1.formatNumeral)(e.target.value, numeralFormatOptions);
        numeralInput.value = value;
    });
    const dateInput = document.querySelector('.date-input');
    (0, cleave_zen_1.registerCursorTracker)({ input: dateInput, delimiter: cleave_zen_1.DefaultDateDelimiter });
    dateInput.addEventListener('input', e => {
        const value = (0, cleave_zen_1.formatDate)(e.target.value, {
            dateMax: '2030-12-31',
            dateMin: '2020-01-01',
        });
        dateInput.value = value;
    });
    const timeInput = document.querySelector('.time-input');
    (0, cleave_zen_1.registerCursorTracker)({ input: timeInput, delimiter: cleave_zen_1.DefaultTimeDelimiter });
    timeInput.addEventListener('input', e => {
        const value = (0, cleave_zen_1.formatTime)(e.target.value);
        timeInput.value = value;
    });
};
main();
