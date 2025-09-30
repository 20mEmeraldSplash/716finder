# 样式系统指南

本项目使用 Tailwind CSS 和自定义 CSS 变量构建了一个完整的样式系统。

## 🎨 颜色系统

### 主色调 (Primary)

- `primary-50` 到 `primary-950`: 蓝色系主色调
- 使用方式: `bg-primary-500`, `text-primary-600`, `border-primary-400`

### 辅助色 (Secondary)

- `secondary-50` 到 `secondary-950`: 灰色系辅助色
- 使用方式: `bg-secondary-200`, `text-secondary-700`

### 功能色

- `success-500`: 成功色 (绿色)
- `warning-500`: 警告色 (黄色)
- `error-500`: 错误色 (红色)

## 🔤 字体系统

### 字体族

- `font-sans`: 无衬线字体 (Inter, system-ui 等)
- `font-mono`: 等宽字体 (JetBrains Mono, Fira Code 等)

### 字体大小

- `text-xs` (0.75rem)
- `text-sm` (0.875rem)
- `text-base` (1rem)
- `text-lg` (1.125rem)
- `text-xl` (1.25rem)
- `text-2xl` (1.5rem)
- `text-3xl` (1.875rem)
- `text-4xl` (2.25rem)
- `text-5xl` (3rem)

## 🎯 预定义组件类

### 按钮

```html
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-secondary">次要按钮</button>
<button class="btn btn-success">成功按钮</button>
<button class="btn btn-warning">警告按钮</button>
<button class="btn btn-error">错误按钮</button>
```

### 卡片

```html
<div class="card p-6">
  <h3 class="text-xl font-semibold mb-2">卡片标题</h3>
  <p class="text-gray-600 dark:text-gray-300">卡片内容</p>
</div>
```

### 输入框

```html
<input type="text" class="input" placeholder="输入内容" />
<textarea class="input h-24 resize-none" placeholder="多行文本"></textarea>
```

## 🌙 深色模式

### 自动切换

系统会根据用户的系统偏好自动切换深色模式。

### 手动切换

使用 Header 组件中的主题切换按钮。

### 深色模式类

- `dark:bg-gray-800`: 深色背景
- `dark:text-white`: 深色模式下的白色文字
- `dark:border-gray-700`: 深色模式下的边框

## 📱 响应式设计

### 断点

- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- `2xl`: 1536px+

### 使用示例

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- 移动端1列，平板2列，桌面3列 -->
</div>
```

## 🛠️ JavaScript 工具函数

### 导入样式变量

```javascript
import {
  colors,
  fonts,
  spacing,
  toggleTheme,
  getCurrentTheme,
} from './styles/variables';
```

### 主题切换

```javascript
import { toggleTheme, getCurrentTheme } from './styles/variables';

// 切换主题
toggleTheme();

// 获取当前主题
const currentTheme = getCurrentTheme(); // 'light' 或 'dark'
```

### 获取 CSS 变量值

```javascript
import { getCSSVariable } from './styles/variables';

const primaryColor = getCSSVariable('--color-primary-500');
```

## 🎨 自定义 CSS 变量

所有颜色、字体、间距等都可以通过 CSS 变量进行自定义：

```css
:root {
  --color-primary-500: #your-color;
  --font-size-lg: 1.2rem;
  --spacing-md: 1.2rem;
}
```

## 📝 最佳实践

1. **优先使用 Tailwind 类**: 对于常见样式，优先使用 Tailwind CSS 类
2. **使用预定义组件类**: 对于按钮、卡片等组件，使用预定义的 `.btn`、`.card` 类
3. **响应式优先**: 设计时优先考虑移动端，然后逐步增强
4. **深色模式友好**: 确保所有组件都支持深色模式
5. **语义化命名**: 使用有意义的类名和变量名

## 🔧 开发工具

- **Tailwind CSS IntelliSense**: VS Code 扩展，提供自动补全
- **PostCSS**: 处理 CSS 转换
- **Autoprefixer**: 自动添加浏览器前缀
