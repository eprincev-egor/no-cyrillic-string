/**
 * @fileoverview Disable cyrillic string literals
 * @author Eprincev Egor
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require("../../../lib/rules/no-cyrillic-string");
let RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

let ruleTester = new RuleTester();
let cyrillicAlphabet = "йцукенгшщзхъфывапролджэячсмитьбюёЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮЁ".split("");

const errorText = "Strings must be without cyrillic text";

let cyrillicAlphabetTests = cyrillicAlphabet.map(symbol => ({
    code: `'${symbol}'`,
    errors: [{
        message: errorText,
        type: "Literal"
    }]
}));

ruleTester.run("no-cyrillic-string", rule, {

    invalid: [
        {
            code: "\"Кнопка\"",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "'Кнопка'",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "\"ё\"",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "'ё'",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "\"some Ё!\"",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "'just Ё'",
            errors: [{
                message: errorText,
                type: "Literal"
            }]
        },
        {
            code: "`Шаблон`",
            parserOptions: {
                ecmaVersion: 6
            },
            errors: [{
                message: errorText,
                type: "TemplateElement"
            }]
        }
    ]
    // just all alphabet
        .concat(cyrillicAlphabetTests),

    valid: [
        "\"button\"",
        "'button'",
        "1",
        {
            code: "`template`",
            parserOptions: {
                ecmaVersion: 6
            }
        }
    ]
});
