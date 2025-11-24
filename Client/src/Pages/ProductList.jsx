import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import FilterBar from "../Components/FilterBar";
import { Search } from "lucide-react";
import api from "../Utils/api";

function ProductList({ fixed = true }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    sortOrder: "featured",
    categories: [],
    colors: [],
    gender: [],
  });

  const filterOptions = {
    categories: [
      "Soft Toys",
      "Electronics",
      "Stationery",
      "Educational Games",
      "Fashion",
      "Kitchen",
    ],
    colors: ["Gray", "Beige", "Black", "Green", "Charcoal", "Dark Gray"],
    gender: ["Boys", "Girls", "Gender-Neutral"],
  };

  const paramsInit = new URLSearchParams(location.search);
  const [searchQuery, setSearchQuery] = useState(paramsInit.get("q") || "");
  const [suggestions, setSuggestions] = useState([]);

  const renderStars = (rating) => {
    const r = Number(rating) || 0;
    const full = Math.floor(r);
    const half = r - full >= 0.5;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else if (i === full && half) {
        stars.push(
          <span key={i} className="text-yellow-400">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-gray-300">
            ☆
          </span>
        );
      }
    }
    return (
      <div className="flex items-center justify-center gap-1 text-sm">
        {stars}
      </div>
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") || "");
  }, [location.search]);

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
      showNotification("Removed from favourites");
    } else {
      setFavorites([...favorites, product]);
      showNotification("Added to favourites ❤️");
    }
  };

  const isFavorited = (productId) =>
    favorites.some((fav) => fav.id === productId);

  const addToCart = (e, product) => {
    e.stopPropagation();
    showNotification(`${product.name.substring(0, 30)}... added to cart! 🛒`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "priceRange") {
        return { ...prev, priceRange: value };
      }
      if (Array.isArray(prev[filterType])) {
        const exists = prev[filterType].includes(value);
        return {
          ...prev,
          [filterType]: exists
            ? prev[filterType].filter((item) => item !== value)
            : [...prev[filterType], value],
        };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      sortOrder: "featured",
      categories: [],
      colors: [],

      gender: [],
    });
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    const q = (searchQuery || "").trim().toLowerCase();
    if (q) {
      filtered = filtered.filter((p) =>
        (p.name || "").toLowerCase().includes(q)
      );
    }

    filtered = filtered.filter((p) => {
      const price = Number(p.price);
      const min = Number(filters.priceRange[0]) || 0;
      const max = Number(filters.priceRange[1]) || Infinity;
      return !isNaN(price) && price >= min && price <= max;
    });

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) => filters.colors.includes(p.color));
    }

    if (filters.gender.length > 0) {
      filtered = filtered.filter((p) => filters.gender.includes(p.gender));
    }

    switch (filters.sortOrder) {
      case "priceLowHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const activeFilterCount =
    filters.categories.length + filters.colors.length + filters.gender.length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = (searchQuery || "").trim();
    if (trimmed) {
      navigate(`/productlist?q=${encodeURIComponent(trimmed)}`);
    } else {
      // clear search
      navigate(`/productlist`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    navigate(`/productlist`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const results = await api.getAllProducts();

        const normalized = results.map((p) => ({ id: p._id || p.id, ...p }));

        const sampleProducts = [
          {
            id: "s1",
            name: "Cute Teddy Bear",
            price: 19.99,
            rating: 4.5,
            reviews: "120 reviews",
            image: "/",
            category: "Soft Toys",
            inStock: true,
          },
          {
            id: "s2",
            name: "Colorful Building Blocks",
            price: 24.5,
            rating: 4.2,
            reviews: "78 reviews",
            image: "/",
            category: "Educational Games",
            inStock: true,
          },
          {
            id: "s3",
            name: "Wireless Headphones",
            price: 49.99,
            rating: 4.7,
            reviews: "210 reviews",
            image: "/",
            category: "Electronics",
            inStock: true,
          },
          {
            id: "s4",
            name: "Art Marker Set",
            price: 9.99,
            rating: 4.0,
            reviews: "54 reviews",
            image: "/",
            category: "Stationery",
            inStock: true,
          },
          {
            id: "s5",
            name: "Educational Puzzle",
            price: 14.99,
            rating: 4.3,
            reviews: "33 reviews",
            image: "/",
            category: "Educational Games",
            inStock: true,
          },
          {
            id: "s6",
            name: "Plush Dinosaur",
            price: 17.5,
            rating: 4.6,
            reviews: "89 reviews",
            image: "/",
            category: "Soft Toys",
            inStock: true,
          },
          {
            id: "s7",
            name: "Kids Smartwatch",
            price: 39.99,
            rating: 3.9,
            reviews: "41 reviews",
            image: "/",
            category: "Electronics",
            inStock: true,
          },
          {
            id: "s8",
            name: "Wooden Train Set",
            price: 29.99,
            rating: 4.4,
            reviews: "66 reviews",
            image: "/",
            category: "Educational Games",
            inStock: true,
          },
          {
            id: "s9",
            name: "Sticker Activity Book",
            price: 6.99,
            rating: 4.1,
            reviews: "22 reviews",
            image: "/",
            category: "Stationery",
            inStock: true,
          },
          {
            id: "s10",
            name: "Mini Drone",
            price: 59.99,
            rating: 4.0,
            reviews: "17 reviews",
            image: "/",
            category: "Electronics",
            inStock: true,
          },
        ];

        let merged = normalized || [];
        // If API returned too few products, merge sample ones (avoid duplicate names)
        if (merged.length < 12) {
          const existingNames = new Set(
            merged.map((p) => (p.name || "").toLowerCase())
          );
          const needed = sampleProducts.filter(
            (s) => !existingNames.has((s.name || "").toLowerCase())
          );
          merged = [...merged, ...needed].slice(0, 16);
        }

        setProducts(merged);
      } catch (err) {
        console.error("Error fetching products:", err);
        // If API fails, fall back to sample products so the UI remains functional
        setProducts([
          {
            id: "s1",
            name: "Cute Teddy Bear",
            price: 19.99,
            rating: 4.5,
            reviews: "120 reviews",
            image: "/",
            category: "Soft Toys",
            inStock: true,
          },
          {
            id: "s2",
            name: "Colorful Building Blocks",
            price: 24.5,
            rating: 4.2,
            reviews: "78 reviews",
            image: "/",
            category: "Educational Games",
            inStock: true,
          },
          {
            id: "s3",
            name: "Wireless Headphones",
            price: 49.99,
            rating: 4.7,
            reviews: "210 reviews",
            image: "/",
            category: "Electronics",
            inStock: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div className="min-h-screen overflow-visible">
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Filter Bar - Now with horizontal dropdowns on desktop */}
      <FilterBar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        filteredProductsCount={filteredProducts.length}
        totalProductsCount={products.length}
        activeFilterCount={activeFilterCount}
        filterOptions={filterOptions}
        className="z-1000"
      />

      <div className="max-w-7xl mx-auto px-4">
        <form onSubmit={handleSearchSubmit} className="py-3">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="flex items-center gap-2">
                <Search
                  style={{
                    background:
                      "linear-gradient(180deg, #FFF5E6 0%, #F97316 100%)",
                    color: "#1a202c",
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9  text-sm bg-orange-500 text-white p-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchQuery(v);

                    if (v.trim() === "") {
                      setSuggestions([]);
                    } else {
                      const q = v.trim().toLowerCase();
                      const matched = products
                        .map((p) => p.name || "")
                        .filter((n) => n.toLowerCase().includes(q))
                        .slice(0, 5);
                      setSuggestions(matched);
                    }
                  }}
                  placeholder="Search products..."
                  className="w-full px-5 pr-10 py-2 border-2 border-orange-500 rounded-full focus:outline-none"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    handleClearSearch();
                    setSuggestions([]);
                  }}
                  style={{
                    background:
                      "linear-gradient(180deg, #FFF5E6 0%, #F97316 100%)",
                    color: "#1a202c",
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-9 h-9 rounded-full text-sm text-gray-700 bg-white shadow-md hover:bg-gray-50 font-bold"
                >
                  ✕
                </button>
              )}

              {/* Autosuggest dropdown */}
              {suggestions && suggestions.length > 0 && (
                <ul className="absolute z-40 left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg max-h-56 overflow-auto">
                  {suggestions.map((s, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSearchQuery(s);
                        setSuggestions([]);
                      }}
                      className="px-4 py-2 hover:bg-orange-50 cursor-pointer text-sm"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Horizontal Bar */}
      <div className="border-t border-gray-300 h-1 mt-2 bg-gray-100"></div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 pt-10 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">
              No products found matching your filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer relative"
              >
                <button
                  onClick={(e) => toggleFavorite(e, product)}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isFavorited(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <div className="relative w-full aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-xs text-orange-600 font-medium mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-1">
                    {product.name}
                  </h3>

                  <div className="mt-auto space-y-2">
                    <p className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>

                    <button
                      onClick={(e) => addToCart(e, product)}
                      disabled={!product.inStock}
                      className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        product.inStock
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <div className="text-xs text-center text-gray-600 space-y-1">
                      <div className="flex items-center justify-center gap-2">
                        {renderStars(product.rating)}
                        <span className="text-xs text-gray-500">
                          {product.rating ? product.rating.toFixed(1) : "0.0"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.reviews}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
