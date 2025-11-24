const API_BASE = "http://localhost:5000/api";

export async function getAllProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function searchProducts(q) {
  const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error("Search request failed");
  return res.json();
}

export default {
  getAllProducts,
  searchProducts,
};
