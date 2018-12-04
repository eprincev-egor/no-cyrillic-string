# Disable cyrillic string literals (no-cyrillic-string)

If you develop multi language system, you constantly forget using lang dictionaries.  
For stop it, use it rule for detect hardcoded cyrillic text


## Rule Details

Examples of **incorrect** code for this rule:

```js

// cyrillic text inside double quotes
let buttonText = "Кнопка";

// cyrillic text inside single quotes
let someLabel = 'Кнопка';

// cyrillic text inside backtick
let someTemplate = `По заказу ${ orderNumber } выставлен счет`;

```

Examples of **correct** code for this rule:

```js

// Using dictionary
let buttonText = dictionary.buttonText;
let someLabel = dictionary.label;

// cyrillic text inside backtick
let someTemplate = dictionary.template({
    orderNumber: "#123"
});

// cyrillic text inside comments
// комментарий

```

## When Not To Use It

Inside dictionaries.js you need ignore it rule.
