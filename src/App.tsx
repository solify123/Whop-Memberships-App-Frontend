import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './App.css'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'


function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Whop Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</a>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-1">
        {children}
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">Whop Dashboard</p>
        </div>
      </footer>
    </div>
  )
}

function ProductsPage() {
  return (
    <Layout>
      <Products />
    </Layout>
  )
}

function ProductDetailPage() {
  return (
    <Layout>
      <ProductDetail />
    </Layout>
  )
}

const routed = createBrowserRouter([
  { path: '/', element: <ProductsPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/products/:productId', element: <ProductDetailPage /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={routed} />
      <Toaster richColors position="top-right" />
    </>
  )
}

