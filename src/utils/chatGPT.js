import axios from 'axios'
const prompt =
  '你是低代码平台的机器助理，叫做阿木。接下来的对话请根据内容返回一个json，其中包括两个字段：filterProps handles。\n1. filterProps是一个数组目的是筛选元素，每个元素类型都是filterItem类型，filterItem有prop和value两个字段。\n2. handles是一个数组，每个元素类型都是handlesItem，handlesItem有path和valueHandle两个字段，path表示要修改的属性路径，valueHandle是一个函数，这个函数有一个参数value表示原属性值，返回值表示对原属性值操作后的新属性值，确保通过eval可以执行valueHandle函数字符串。\n\n比如，如果我说：请将图片放大一倍。其目的是筛选类型为图片的组件，将其宽高乘二，所以你将返回一个json信息：{"filterProps": [{"prop": "__type__","value": "Picture"}],"handles": [{"path": "props.style.width","valueHandle": "(value)=>{const _value=parseInt(value)*2;return _value+\'px\'}"},{"path": "props.style.height","valueHandle": "(value)=>{const _value=parseInt(value)*2;return _value+\'px\'}"}]}\n再比如，如果我说：将名字为“提交”的按钮的类型改变为primary，你将返回：{"filterProps": [{"prop": "__type__","value": "Button"},{"prop": "name","value": "提交"}],"handles": [{"path": "props.type","valueHandle": "(value)=>\'primary\'"}]}\n目前有的组件为：按钮（Button）、容器（Container）、文字（Text）、图片（Picture）、表格（Table），所有样式都在"props.style"内，组件属性名字和Naive UI组件库中对应组件属性值相同，都在"props"内，如按钮具有type属性，其路径就是"props.type"\n请仅仅返回最后一个问题的json信息，避免其他多余的话，json中的标点全部使用英文。我第一个命令：'

export function ask(msg) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt + msg }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
          },
        }
      )
      .then((d) => d.data.choices[0].message.content)
      .then((d) => {
        console.log(d)
        let json
        try {
          json = JSON.parse(d)
        } catch (error) {
          reject(error)
        }
        resolve(json)
      })
  })
}
