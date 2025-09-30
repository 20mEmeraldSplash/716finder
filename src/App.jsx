import Header from './components/Header'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* 测试 Tailwind CSS 和样式变量 */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* 颜色测试 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              颜色系统测试
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-500 text-white p-4 rounded-lg text-center">
                Primary
              </div>
              <div className="bg-secondary-500 text-white p-4 rounded-lg text-center">
                Secondary
              </div>
              <div className="bg-success-500 text-white p-4 rounded-lg text-center">
                Success
              </div>
              <div className="bg-warning-500 text-white p-4 rounded-lg text-center">
                Warning
              </div>
            </div>
          </div>

          {/* 按钮测试 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              按钮组件测试
            </h2>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">主要按钮</button>
              <button className="btn btn-secondary">次要按钮</button>
              <button className="btn btn-success">成功按钮</button>
              <button className="btn btn-warning">警告按钮</button>
              <button className="btn btn-error">错误按钮</button>
            </div>
          </div>

          {/* 表单测试 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              表单组件测试
            </h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="输入框测试" 
                className="input"
              />
              <textarea 
                placeholder="文本域测试" 
                className="input h-24 resize-none"
              />
            </div>
          </div>

          {/* 字体测试 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              字体系统测试
            </h2>
            <div className="space-y-2">
              <p className="text-xs">超小字体 (xs)</p>
              <p className="text-sm">小字体 (sm)</p>
              <p className="text-base">基础字体 (base)</p>
              <p className="text-lg">大字体 (lg)</p>
              <p className="text-xl">超大字体 (xl)</p>
              <p className="text-2xl">标题字体 (2xl)</p>
              <p className="text-3xl">大标题字体 (3xl)</p>
            </div>
          </div>

          {/* 响应式测试 */}
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              响应式布局测试
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-primary-100 dark:bg-primary-900 p-4 rounded-lg">
                <h3 className="font-semibold text-primary-900 dark:text-primary-100">卡片 1</h3>
                <p className="text-primary-700 dark:text-primary-300">响应式网格布局</p>
              </div>
              <div className="bg-secondary-100 dark:bg-secondary-900 p-4 rounded-lg">
                <h3 className="font-semibold text-secondary-900 dark:text-secondary-100">卡片 2</h3>
                <p className="text-secondary-700 dark:text-secondary-300">自适应列数</p>
              </div>
              <div className="bg-success-100 dark:bg-success-900 p-4 rounded-lg">
                <h3 className="font-semibold text-success-900 dark:text-success-100">卡片 3</h3>
                <p className="text-success-700 dark:text-success-300">移动端友好</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
