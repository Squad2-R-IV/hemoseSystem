// eslint.config.js
import react from 'eslint-plugin-react'
import { parse } from 'path'

export default tseslint.config({
  // Defina uma versão do React.JS
  settings: { react: { version: '18.3' } },
  plugins: {
    // Adicione o plugin do React
    react,
  },
  rules: {
    // Outras regras...
    // Habilite as regras recomendadas
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
  parserOptions: {
    project: ['./tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: import.meta.dirname,
  },
})