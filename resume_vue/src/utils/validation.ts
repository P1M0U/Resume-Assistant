/**
 * 验证邮箱格式
 * @param email - 邮箱地址
 * @returns 是否有效
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证密码长度
 * @param password - 密码
 * @param minLength - 最小长度，默认4
 * @returns 是否有效
 */
export function validatePassword(password: string, minLength: number = 4): boolean {
  return password.length >= minLength
}
