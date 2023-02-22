import { presetUno, presetAttributify, presetIcons, defineConfig } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
  ],
  rules: [
    ['w-full', { width: '100%' }],
    ['fs-6sm', { 'font-size': '0.1em' }],
    ['fs-5sm', { 'font-size': '0.25em' }],
    ['fs-4sm', { 'font-size': '0.5em' }],
    ['fs-3sm', { 'font-size': '0.75em' }],
    ['fs-ssm', { 'font-size': '0.75em' }],
    ['fs-sm', { 'font-size': '1rem' }],
    ['fs-m', { 'font-size': '1.25rem' }],
    ['fs-l', { 'font-size': '1.5rem' }],
    ['fs-xl', { 'font-size': '1.75rem' }],
    ['fs-xxl', { 'font-size': '2.25rem' }],
    ['fs-3xl', { 'font-size': '2.5rem' }],
    ['fs-4xl', { 'font-size': '2.75rem' }],
    ['fs-5xl', { 'font-size': '3rem' }],
    ['fs-6xl', { 'font-size': '3.25rem' }],
    ['trans-all', { transition: 'all 0.225s ease-in-out' }],
  ],
  shortcuts: [{ 'title-icon': 'fs-l hover:c-orange trans-all' }],
})
