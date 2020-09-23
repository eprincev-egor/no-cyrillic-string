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
        },
        // https://github.com/eprincev-egor/no-cyrillic-string/issues/1
        {
            code: "<div>русский текст</div>",
            parserOptions: {
                ecmaVersion: 6,
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            errors: [{
                message: errorText,
                type: "JSXText"
            }]
        },
        {
            code: "<div>русский<b>text</b></div>",
            parserOptions: {
                ecmaVersion: 6,
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            errors: [{
                message: errorText,
                type: "JSXText"
            }]
        },
        {
            code: "<div><b>текст</b></div>",
            parserOptions: {
                ecmaVersion: 6,
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            errors: [{
                message: errorText,
                type: "JSXText"
            }]
        },
        {
            code: "<input placeholder='текст'/>",
            parserOptions: {
                ecmaVersion: 6,
                "ecmaFeatures": {
                    "jsx": true
                }
            },
            errors: [{
                message: errorText,
                type: "Literal"
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
