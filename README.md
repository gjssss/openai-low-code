# 低代码平台
使用Vue3和Sortable.js实现的拖拽组件低代码平台
## 安装
* clone仓库
  ```bash
  git clone https://github.com/gjssss/openai-low-code
  ```
* 安装依赖
  ```bash
  pnpm i
  ```
  > 注意：如果没有安装pnpm可以使用`npm install -g pnpm`安装
* 运行
  ```bash
  pnpm dev
  ```
  运行后，在浏览器中输入`http://localhost:8081`访问

## 🤖连接GPT
在项目根目录下建立`.env`文件
```
VITE_TOKEN=sk-your-sk-token
```
添加VITE_TOKEN字段，填写openAI的token即可使用

## 🎇Feature

- [x] 拖拽组件
- [x] 继承式组件
- [x] 基础属性表单
- [x] 插件式可扩展组件属性表单
- [x] 保存和加载页面
- [x] 组件菜单
- [x] 按钮组件
- [x] 文字组件
- [x] 容器组件
- [x] 图片组件
- [x] 表格组件
- [x] 复制粘贴组件
- [x] 帮助
- [x] 嵌套组件目录
- [x] 连接GPT
- [x] 多页面系统
- [x] 事件系统
- [ ] 集合式组件
- [ ] 动画系统
- [ ] 更多组件···