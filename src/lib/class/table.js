import { set } from 'lodash-es'
import { h } from 'vue'
import myTable from '../widgets/my-table.vue'
import tableProps from '../widgets/table-props.vue'
import { Base } from './base'

export class Table extends Base {
  constructor(props = {}) {
    super(props)
    this.__type__ = 'Table'
    if (!this.props.value) {
      this.props.value = [
        {
          label: '你好',
          cols: ['世界'],
        },
      ]
    }

    this.register()
  }

  _render() {
    return h(myTable, this.props)
  }

  static get preview() {
    return h(myTable, {
      class: 'select-wrapper',
      value: [
        {
          label: '你好',
          cols: ['世界'],
        },
      ],
      size: 'small',
    })
  }

  register() {
    super.register
    this.extraProps['表格属性'] = [
      this.registerPropGroup({ name: '表格属性' }, [
        this.registerSwitch(
          { path: 'props.bordered', icon: '边框', size: 12, isClear: true },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
        this.registerSelect(
          { path: 'props.size', icon: '大小', size: 12, isClear: true },
          {
            default: 'small',
            options: ['small', 'medium', 'large'],
          }
        ),
        this.registerSwitch(
          { path: 'props.striped', icon: '斑马纹', size: 12, isClear: true },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
        this.registerSwitch(
          {
            path: 'props.bottomBordered',
            icon: '底部边框',
            size: 12,
            isClear: true,
          },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
        this.registerSwitch(
          {
            path: 'props.singleColumn',
            icon: '单列',
            size: 12,
            isClear: true,
          },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
        this.registerSwitch(
          {
            path: 'props.single-line',
            icon: '单行',
            size: 12,
            isClear: true,
          },
          {
            default: false,
            on: true,
            off: false,
          }
        ),
      ]),
      this.registerPropGroup(
        { name: '表格值', custom: true },
        [],
        [
          () =>
            h(tableProps, {
              value: this.props.value,
              onUpdate: (path, value) => {
                set(this.props, path, value)
              },
              onAddRow: () => {
                this.props.value.forEach((i) => {
                  i.cols.push('')
                })
              },
              onAddCol: () => {
                this.props.value.push({
                  lable: '标题',
                  cols: Array(this.props.value[0].cols.length).fill(''),
                })
              },
              onRmRow: () => {
                this.props.value.forEach((i) => {
                  i.cols.pop()
                })
              },
              onRmCol: () => {
                this.props.value.pop()
              },
            }),
        ]
      ),
    ]
  }
}
