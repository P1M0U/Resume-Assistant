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

export function getCurrentTime(): string {
  const now = new Date()
  return now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}
