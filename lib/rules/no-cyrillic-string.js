/**
 * @fileoverview Disable cyrillic string literals
 * @author Eprincev Egor
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Disable cyrillic string literals",
            category: "Stylistic Issues",
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create(context) {

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * returns true if string has some symbol of cyrillic alphabet
         * @param {string} text 
         * @returns {boolean}
         */
        function hasCyrillicText(text) {
            return /[а-яё]/i.test(text);
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            Literal(node) {
                let isStringLiteral = (typeof node.value == "string");
                if ( !isStringLiteral ) {
                    return;
                }

                let stringContent = node.value;

                if ( hasCyrillicText(stringContent) ) {
                    context.report({
                        node,
                        message: "Strings must be without cyrillic text"
                    });
                }
            },

            TemplateElement(node) {
                let templateContent = node.value.raw;

                if ( hasCyrillicText(templateContent) ) {
                    context.report({
                        node,
                        message: "Strings must be without cyrillic text"
                    });
                }
            },

            JSXText(node) {
                if ( hasCyrillicText(node.value) ) {
                    context.report({
                        node,
                        message: "Strings must be without cyrillic text"
                    });
                }
            }
        };
    }
};
