import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

type Product = { id: string; title?: string; visibility?: string; activeUsers?: number };
type Membership = { id: string; user?: string; email?: string };

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`http://localhost:1001/api/products/${productId}`);
        if (data.error) throw new Error(data.error);
        setProduct(data.product || null);
        setMemberships(data.memberships || []);
      } catch (e: any) {
        setError(e.message);
      }
    })();
  }, [productId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/products" className="text-gray-600 hover:text-gray-900">← Back to Products</Link>
        <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Product Details</h2>
        <div />
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{error}</div>
      )}
      {product && (
        <div className="bg-white rounded-lg border border-gray-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Product ID:</span> <span className="font-mono text-xs text-gray-800">{product.id}</span></div>
            <div><span className="text-gray-500">Title:</span> <span className="font-medium text-gray-900">{product.title || ''}</span></div>
            <div><span className="text-gray-500">Visibility:</span> <span className="inline-flex items-center rounded-md bg-gray-50 border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-700">{product.visibility || 'N/A'}</span></div>
            <div><span className="text-gray-500">Active Users:</span> <span className="inline-flex items-center rounded-md bg-gray-50 border border-gray-200 px-2 py-0.5 text-[11px] font-medium text-gray-800">{product.activeUsers ?? 0}</span></div>
          </div>
          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="mb-2 text-sm font-medium text-gray-800">Send direct message</div>
            {result && (
              <div className="mb-3 text-sm text-gray-600">{result}</div>
            )}
            <div className="flex items-start gap-3">
              <textarea
                className="w-full border border-gray-200 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                rows={3}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={sending}
              />
              <button
                className="shrink-0 inline-flex items-center justify-center h-9 px-4 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={async () => {
                  setError(null);
                  setResult(null);
                  if (!productId) return;
                  const trimmed = message.trim();
                  if (!trimmed) {
                    setError('Message cannot be empty');
                    return;
                  }
                  try {
                    setSending(true);
                    const { data } = await axios.post(`http://localhost:1001/api/products/${productId}/message`, { message: trimmed });
                    if (data.error) throw new Error(data.error);
                    const { successCount = 0, errorCount = 0 } = data;
                    setResult(`Sent to ${successCount} member(s), ${errorCount} failed`);
                    setMessage('');
                  } catch (e: any) {
                    setError(e.message || 'Failed to send message');
                  } finally {
                    setSending(false);
                  }
                }}
                disabled={sending}
              >
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg border border-gray-100">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-800">Memberships ({memberships.length})</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white text-gray-500 text-xs uppercase tracking-wide border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3">Membership ID</th>
                <th className="text-left px-5 py-3">User ID</th>
                <th className="text-left px-5 py-3">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {memberships.length > 0 ? (
                memberships.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3 font-mono text-xs text-gray-800">{m.id}</td>
                    <td className="px-5 py-3 text-gray-800">{m.user || ''}</td>
                    <td className="px-5 py-3 text-gray-800">{m.email || ''}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-8 text-center text-gray-500" colSpan={3}>No memberships found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


