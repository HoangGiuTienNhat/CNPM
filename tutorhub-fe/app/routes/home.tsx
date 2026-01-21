// import { redirect } from 'react-router'
// import type { LoaderFunctionArgs } from 'react-router'

// export const loader = async ({}: LoaderFunctionArgs) => {
//   return redirect('/login')
// }

// export default function Home() {
//   return null
// }

import type { MetaFunction } from 'react-router'
import { Link } from 'react-router'

export const meta: MetaFunction = () => {
  return [
    { title: 'TutorHub - Nền tảng kết nối gia sư' },
    { name: 'description', content: 'Tìm kiếm gia sư và kết nối tri thức tại TutorHub' }
  ]
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* --- Navigation Bar --- */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            {/* Bạn có thể thay bằng thẻ <img /> logo của bạn ở đây */}
            <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">T</div>
            <span className="text-xl font-bold text-gray-900">TutorHub</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-blue-700 text-sm font-medium">
            🚀 Nền tảng hỗ trợ học tập hàng đầu
          </div>
          
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Kết nối tri thức <br />
            <span className="text-blue-600">Kiến tạo tương lai</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-gray-500 mb-10">
            TutorHub giúp sinh viên và giảng viên kết nối dễ dàng. Tìm kiếm người hướng dẫn, 
            tham gia nhóm học tập và phát triển kỹ năng của bạn ngay hôm nay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-blue-500 hover:-translate-y-1 transition-all"
            >
              Bắt đầu miễn phí
            </Link>
            <Link 
              to="/login" 
              className="rounded-xl bg-white px-8 py-4 text-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-blue-600 transition-all"
            >
              Đã có tài khoản?
            </Link>
          </div>

          {/* --- Features Grid (Demo) --- */}
          <div className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-5xl">
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-default">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="font-bold text-gray-900 mb-2">Tìm kiếm thông minh</h3>
              <p className="text-gray-500 text-sm">Dễ dàng tìm thấy gia sư hoặc nhóm học tập phù hợp với nhu cầu của bạn.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-default">
              <div className="text-3xl mb-4">📅</div>
              <h3 className="font-bold text-gray-900 mb-2">Quản lý lịch học</h3>
              <p className="text-gray-500 text-sm">Sắp xếp và theo dõi lịch học, lịch dạy một cách trực quan và hiệu quả.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-default">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-bold text-gray-900 mb-2">Tương tác trực tiếp</h3>
              <p className="text-gray-500 text-sm">Trao đổi, thảo luận và nhận phản hồi nhanh chóng từ giảng viên.</p>
            </div>
          </div>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TutorHub. All rights reserved.
        </div>
      </footer>
    </div>
  )
}