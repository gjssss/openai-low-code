import { savePage, loadPage } from '../lib/utils/save'
export default [
  {
    label: '页面选项',
    key: 'page',
    children: [
      {
        label: '保存页面',
        key: 'savePage',
        callBack: savePage,
      },
      {
        label: '加载页面',
        key: 'loadPage',
        callBack: loadPage,
      },
    ],
  },
]
