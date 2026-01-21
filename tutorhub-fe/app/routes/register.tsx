import type { MetaFunction } from 'react-router'
import RegisterPage from '../../src/features/register'

export const meta: MetaFunction = () => {
  return [{ title: 'Đăng ký' }, { name: 'description', content: 'Đăng ký tài khoản TutorHub' }]
}

export default RegisterPage