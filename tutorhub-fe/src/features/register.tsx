import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { authService, type RegisterData } from '../services/authservice'
import logo from '../asset/images/TutorHub_logo.png' // Đảm bảo đường dẫn đúng

export default function RegisterPage() {
  // State quản lý form
  const [formData, setFormData] = useState<RegisterData>({
    userName: '',
    email: '',
    password: '',
    role: 'student' // Mặc định là student
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate()

  // Xử lý thay đổi input text
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Xử lý submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Gọi API đăng ký
      await authService.register(formData)
      
      // Thành công -> Chuyển về trang login
      alert('Đăng ký thành công! Vui lòng đăng nhập.')
      navigate('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng ký thất bại')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-sky-200 p-3'>
      <div className='w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md'>
        {/* Header */}
        <div className='text-center'>
          <img className='mx-auto h-24 w-auto' src={logo} alt='TutorHub Logo' />
          <h1 className='text-3xl font-bold mt-6 text-blue-900'>Đăng ký tài khoản</h1>
          <p className="mt-2 text-gray-600">Tham gia cộng đồng TutorHub ngay hôm nay</p>
        </div>

        {/* Main form */}
        <form className='space-y-6' onSubmit={handleSubmit}>
          {error && <div className='bg-red-50 text-red-600 p-3 rounded-md text-sm text-center border border-red-200'>{error}</div>}
          
          {/* Tên đăng nhập */}
          <div>
            <label htmlFor='userName' className='block text-sm font-medium text-blue-900'>
              Tên đăng nhập
            </label>
            <div className='mt-1'>
              <input
                id='userName'
                name='userName'
                type='text'
                required
                value={formData.userName}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100'
                placeholder='nguyenvana'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-blue-900'>
              Email
            </label>
            <div className='mt-1'>
              <input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100'
                placeholder='student@example.com'
              />
            </div>
          </div>

          {/* Mật khẩu */}
          <div>
            <label htmlFor='password' className='block text-sm font-medium text-blue-900'>
              Mật khẩu
            </label>
            <div className='mt-1'>
              <input
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100'
                placeholder='••••••'
              />
            </div>
          </div>

          {/* Chọn Role (Dropdown) */}
          <div>
            <label htmlFor='role' className='block text-sm font-medium text-blue-900'>
              Bạn muốn đăng ký với vai trò?
            </label>
            <div className='mt-1'>
              <select
                id='role'
                name='role'
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
                className='w-full px-3 py-2 border border-blue-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer'
              >
                <option value="student">Sinh viên (Student)</option>
                <option value="tutor">Gia sư (Tutor)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-gray-500">*Mặc định là Sinh viên nếu bạn không thay đổi.</p>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-4 mt-8'>
            <button
              type='submit'
              disabled={loading}
              className='w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer disabled:bg-indigo-400 transition-colors'
            >
              {loading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
            </button>

             {/* Link quay lại Login */}
            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}