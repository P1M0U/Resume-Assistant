// d:\Study_or_work\CQIE_Python\resume_assistant\resume_vue\src\assets\ts\AiChatView.ts

export interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface QuickQuestion {
  id: string
  question: string
  category: 'resume' | 'interview' | 'salary' | 'career'
}

export const QUICK_QUESTIONS: QuickQuestion[] = [
  {
    id: '1',
    question: '如何优化简历？',
    category: 'resume',
  },
  {
    id: '2',
    question: '面试技巧有哪些？',
    category: 'interview',
  },
  {
    id: '3',
    question: '如何谈薪资？',
    category: 'salary',
  },
  {
    id: '4',
    question: '职业规划建议',
    category: 'career',
  },
]

export const AI_RESPONSES: Record<string, string> = {
  '如何优化简历？':
    '简历优化建议：\n1. 突出核心技能和成就\n2. 使用量化数据展示成果\n3. 简洁明了，控制在一页纸内\n4. 针对岗位调整关键词\n5. 检查语法和格式错误',
  '面试技巧有哪些？':
    '面试技巧：\n1. 提前了解公司和岗位\n2. 准备STAR法则回答问题\n3. 保持自信和积极态度\n4. 准备有针对性的问题\n5. 注意着装和礼仪',
  '如何谈薪资？':
    '薪资谈判技巧：\n1. 提前调研市场薪资水平\n2. 了解自己的价值\n3. 不要急于报价\n4. 考虑整体福利待遇\n5. 保持专业和礼貌',
  职业规划建议:
    '职业规划建议：\n1. 明确职业目标\n2. 评估现有技能\n3. 制定学习计划\n4. 积累项目经验\n5. 建立职业网络',
}

export function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

export function generateAIResponse(question: string): string {
  return (
    AI_RESPONSES[question] ||
    '感谢您的提问！我会尽力为您提供帮助。请上传您的简历，我可以为您提供更具体的建议。'
  )
}
