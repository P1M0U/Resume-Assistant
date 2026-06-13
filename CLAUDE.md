# 语言要求

请始终使用简体中文回答我的所有问题和请求。

## 规则
- 所有回答都使用简体中文
- 技术术语可以保留英文，但要提供中文解释
- 代码注释使用中文
- 错误信息和提示使用中文

## 例外
- 代码本身（变量名、函数名等）可以使用英文
- 命令行指令保持原样

# 代码要求

整体项目前端主要是Vue3 + TypeScript，后端主要是Python + Langchain + FastAPI + MySQL

## 规则
- 整体软件应用系统设计需要采用高内聚、低耦合，以提升系统的可维护性和可复用性。
- 全栈的API必须符合RESTful API风格
- 前后端必须分别符合模块化设计
- 添加简要的函数级的注释

### 禁止使用 emoji 表情

- 前端和后端所有代码文件中绝对禁止使用任何 emoji 表情字符
- 这包括但不限于：模板中的装饰性 emoji、字符串中的 emoji、错误信息中的 emoji、按钮文字中的 emoji
- 替代方案：使用纯文本（如 `[错误]` 替代 `⚠️`）、CSS 样式（如用背景色/边框表示状态）、HTML 实体字符（如 `&rarr;` 替代 `→`）
- 常见的需要避免的 emoji 示例：`🤖` `👋` `⏳` `🗑` `⚠️` 等

### 禁止使用紫色

- 前端css样式当中禁止使用任何紫色


# TypeScript 严格模式与类型安全

项目在 `tsconfig.app.json` 中启用了 `noUncheckedIndexedAccess: true`，数组索引访问总是包含 `| undefined`。
编写前端代码时必须遵守以下规则以避免类型错误。

## 规则

### 1. 数组索引访问后做空值守卫
- 数组索引访问（如 `arr[0]`、`parts[1]`）的返回值类型为 `T | undefined`，使用前必须先做空值检查
- 推荐做法（按优先级）：
  1. 用 `??` 提供默认值：`const v = arr[0] ?? defaultValue`
  2. 用可选链访问：`arr[0]?.toUpperCase()`
  3. 先提取到变量再做 `if (v !== undefined)` 守卫
  4. 对于已验证长度的场景（如 `if (parts.length === 5)` 之后），仍需要用上述方法之一处理，TypeScript 不会因为 length 检查而窄化索引访问类型
- **禁止**：直接使用 `arr[0].xxx` 而不做空值处理（会导致 TS2532 错误）

### 2. 正则匹配结果先守卫再使用
- `str.match(regex)` 返回 `RegExpMatchArray | null`
- 捕获组 `match[1]` 的类型为 `string | undefined`
- 安全模式：
  ```typescript
  const match = str.match(/\d{4}-(\d{2}-\d{2})/)
  if (match?.[1]) {
    // 此处 match[1] 类型已窄化为 string
    return match[1].replace('T', ' ')
  }
  ```
- **禁止**：不检查直接使用 `match[1].xxx`（会导致 TS2532 错误）

### 3. 传递给组件的值必须使用精确的字面量联合类型
- 当组件 prop 定义了联合类型（如 `variant?: 'blue' | 'green' | 'red'`），传入的值必须匹配该联合类型
- 不要在辅助函数中返回宽泛的 `string` 类型，应定义类型别名并用于函数返回值：
  ```typescript
  type TagVariant = 'blue' | 'green' | 'red'
  function getStatus(): { variant: TagVariant } { ... }
  ```
- **禁止**：返回 `string` 类型的值直接传给需要字面量联合类型的 prop（会导致 TS2322 错误）

### 4. 接口定义必须与模板中使用的属性对齐
- 模板中通过 `item.xxx` 访问的属性，必须在对应的 TypeScript 接口中声明
- 如果后端可能返回某字段但不确定，添加为可选属性：`field?: type`
- **禁止**：模板中使用了接口中不存在的属性（会导致 TS2339 错误）


