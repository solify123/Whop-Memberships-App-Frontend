import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
type Product = {
  id: string;
  title?: string;
  visibility?: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeByProduct, setActiveByProduct] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const getProducts = async () => {
    try {
      console.log("baseUrl", baseUrl);
      const res = await axios.get(`${baseUrl}/api/products`);
      const data = res.data
      if (data.error) throw new Error(data.error);
      setProducts(data.products || []);
      setActiveByProduct(data.activeByProduct || {});
      toast.success(`Loaded ${data.products?.length || 0} products successfully`);
    } catch (e: any) {
      setError(e.message);
      toast.error(`Failed to load products: ${e.message}`);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Products</h2>
        <div className="text-sm text-gray-500">Total: {products.length}</div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="overflow-x-auto rounded-xl">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase sticky top-0 z-10">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">Title</th>
                <th className="text-left px-5 py-3 font-semibold">Product ID</th>
                <th className="text-left px-5 py-3 font-semibold">Visibility</th>
                <th className="text-left px-5 py-3 font-semibold">Active Users</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-medium text-gray-900 truncate max-w-[20rem]">{p.title || ''}</td>
                    <td className="px-5 py-3 font-mono text-xs text-gray-600 truncate max-w-[16rem]">{p.id}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800">
                        {p.visibility || '—'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                        {activeByProduct[p.id] || 0}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <Link className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow hover:bg-blue-700" to={`/products/${p.id}`}>
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-8 text-center text-gray-500" colSpan={5}>No products</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


