# ESLint & Prettier 配置指南

本项目已配置完整的 ESLint 和 Prettier 代码质量工具链。

## 🛠️ 已安装的工具

### 核心工具

- **ESLint** - JavaScript/JSX 代码检查
- **Prettier** - 代码格式化
- **eslint-config-prettier** - 禁用与 Prettier 冲突的 ESLint 规则
- **eslint-plugin-prettier** - 将 Prettier 作为 ESLint 规则运行

### React 相关

- **eslint-plugin-react-hooks** - React Hooks 规则
- **eslint-plugin-react-refresh** - React Refresh 规则

## 📋 可用脚本

```bash
# 代码检查
npm run lint              # 检查代码问题
npm run lint:fix          # 自动修复可修复的问题

# 代码格式化
npm run format            # 格式化所有文件
npm run format:check      # 检查格式是否正确
npm run format:staged     # 格式化暂存的文件

# 组合命令
npm run check             # 同时运行 lint 和 format:check
npm run fix               # 同时运行 lint:fix 和 format
```

## ⚙️ 配置详情

### ESLint 配置 (eslint.config.js)

#### 规则设置

- **代码质量**: 禁用 `var`，推荐 `const`，检查未使用变量
- **React**: 强制使用 React Hooks 规则
- **格式化**: 集成 Prettier 规则
- **控制台**: 允许 `console.warn` 和 `console.error`

#### 文件覆盖

- **配置文件**: 允许 `console.log` (如 vite.config.js)
- **忽略文件**: dist/, node_modules/, 构建输出等

### Prettier 配置 (.prettierrc)

```json
{
  "semi": true, // 使用分号
  "trailingComma": "es5", // ES5 兼容的尾随逗号
  "singleQuote": true, // 使用单引号
  "printWidth": 80, // 行宽 80 字符
  "tabWidth": 2, // 缩进 2 个空格
  "useTabs": false, // 使用空格而非制表符
  "bracketSpacing": true, // 对象括号内空格
  "bracketSameLine": false, // JSX 标签换行
  "arrowParens": "avoid", // 箭头函数单参数省略括号
  "endOfLine": "lf", // Unix 换行符
  "jsxSingleQuote": true // JSX 使用单引号
}
```

### VS Code 集成

#### 自动格式化

- **保存时格式化**: 启用
- **粘贴时格式化**: 启用
- **保存时修复**: 自动修复 ESLint 问题

#### 推荐扩展

- Prettier - Code formatter
- ESLint
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Path Intellisense

## 🎯 使用指南

### 开发工作流

1. **编写代码** - 正常编写代码
2. **保存文件** - VS Code 自动格式化
3. **提交前检查** - 运行 `npm run check`
4. **自动修复** - 运行 `npm run fix`

### 常见问题解决

#### 未使用变量警告

```javascript
// 如果确实需要导入但未使用，添加下划线前缀
import { _unusedFunction } from './utils';

// 或者使用 ESLint 注释
// eslint-disable-next-line no-unused-vars
import { unusedFunction } from './utils';
```

#### 格式化冲突

```javascript
// 使用 ESLint 注释禁用特定规则
// eslint-disable-next-line prettier/prettier
const longString = '这是一个很长的字符串，需要保持原格式';
```

#### 自定义规则

在 `eslint.config.js` 中添加项目特定规则：

```javascript
rules: {
  'custom-rule': 'error',
  'another-rule': ['warn', { option: 'value' }],
}
```

## 🔧 高级配置

### Git Hooks (可选)

可以配置 pre-commit hook 自动运行检查：

```bash
# 安装 husky
npm install -D husky lint-staged

# 配置 package.json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,md,json}": ["prettier --write"]
  }
}
```

### 团队协作

- 所有团队成员应安装推荐的 VS Code 扩展
- 提交前运行 `npm run check` 确保代码质量
- 使用 `npm run fix` 自动修复常见问题

## 📝 最佳实践

1. **保持配置同步** - 不要修改 .prettierrc 和 eslint.config.js
2. **使用自动格式化** - 依赖工具而非手动格式化
3. **定期更新** - 保持 ESLint 和 Prettier 版本最新
4. **团队一致** - 所有成员使用相同的配置

## 🚨 故障排除

### 常见错误

- **模块未找到**: 确保所有依赖已安装
- **格式化不生效**: 检查 VS Code 扩展和设置
- **规则冲突**: 确保 eslint-config-prettier 在最后

### 重置配置

```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新格式化所有文件
npm run format
```

## 📚 相关文档

- [ESLint 官方文档](https://eslint.org/)
- [Prettier 官方文档](https://prettier.io/)
- [React Hooks ESLint 插件](https://www.npmjs.com/package/eslint-plugin-react-hooks)
- [VS Code ESLint 扩展](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
