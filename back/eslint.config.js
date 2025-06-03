const unusedImports = require("eslint-plugin-unused-imports");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");

module.exports = [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json",
            },
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
            "unused-imports": unusedImports,
        }, rules: {
            // Desabilitar regras básicas em favor das regras TypeScript
            "no-unused-vars": "off",
            "no-undef": "off",

            // Regras TypeScript
            "@typescript-eslint/no-unused-vars": "off", // Será controlado pelo unused-imports
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-non-null-assertion": "warn",

            // Regras para imports não utilizados
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                },
            ],

            // Regras gerais de qualidade
            "prefer-const": "error",
            "no-var": "error",
            "no-console": "off", // Permito console em desenvolvimento
            "eqeqeq": ["error", "always"],
            "curly": ["error", "all"],
        },
    },
    {
        // Configuração específica para arquivos JavaScript (se houver)
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            "unused-imports": unusedImports,
        },
        rules: {
            "no-unused-vars": "off",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    "vars": "all",
                    "varsIgnorePattern": "^_",
                    "args": "after-used",
                    "argsIgnorePattern": "^_",
                },
            ],
        },
    },
    {
        // Ignorar certos arquivos
        ignores: [
            "node_modules/**",
            "dist/**",
            "build/**",
            "coverage/**",
            "prisma/migrations/**",
            "*.config.js",
            "logs/**",
        ],
    },
];