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
    ['fs-3sm', { 'font-size': '16px' }],
    ['fs-ssm', { 'font-size': '18px' }],
    ['fs-sm', { 'font-size': '20px' }],
    ['fs-m', { 'font-size': '22px' }],
    ['fs-l', { 'font-size': '24px' }],
    ['fs-xl', { 'font-size': '26px' }],
    ['fs-xxl', { 'font-size': '28px' }],
    ['trans-all', { transition: 'all 0.225s ease-in-out' }],
  ],
  shortcuts: [{ 'title-icon': 'fs-l hover:c-orange trans-all' }],
})
