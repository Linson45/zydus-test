module.exports = {
    'extends': 'airbnb',
    'parser': 'babel-eslint',
    'env': {
        'jest': true,
        'browser': true,
    },
    'rules': {
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/no-unused-state': 'off',
        'react/jsx-no-bind': 'off',
        'react/no-string-refs': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/no-access-state-in-setstate': 'off',
        'react/prefer-stateless-function': 'off',
        'react/sort-comp': 'off',
        'react/no-array-index-key': 'off',

        'no-use-before-define': 'off',
        'no-restricted-syntax': 'off',
        'no-param-reassign': 'off',
        'no-case-declarations': 'off',
        'no-underscore-dangle': 'off',
        'no-alert': 'off',
        'no-mixed-operators': 'off',
        'no-nested-ternary': 'off',
        'no-console': 'off',
        'no-restricted-globals': 'off',
        'no-await-in-loop': 'off',
        'no-shadow': 'off',
        'no-continue': 'off',
        'no-empty': 'off',
        'no-new': 'off',
        'no-plusplus': 'off',
        'no-return-assign': 'off',
        'no-multi-assign': 'off',
        'no-prototype-builtins': 'off',

        'import/prefer-default-export': 'off',
        'import/no-cycle': 'off',

        'comma-dangle': 'off',
        'camelcase': 'off',
        'prefer-destructuring': 'off',
        'global-require': 'off',
        'new-cap': 'off',
        'max-len': 'off',
        'class-methods-use-this': 'off',
        'radix': 'off',
        'guard-for-in': 'off',
        'func-names': 'off',
    },
    'globals': {
        'fetch': false
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx', '.json', '.native.js']
            }
        }
    }
};
