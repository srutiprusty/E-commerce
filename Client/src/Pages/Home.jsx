import React, { useState, useEffect, useRef } from "react";
import Faq from "./Faq";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slideImages = [
    // Slide 1
    [
      {
        id: 1,
        imgSrc:
          "https://www.anantexports.in/cdn/shop/files/IMG-20240531-WA0010_cdfb2191-e429-4d32-92dd-b2ff7f6c9336.jpg?v=1717168053&width=1946",
        altText: "Action Figures",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://empress-clothing.com/cdn/shop/files/AW5354.jpg?v=1704369868",
        altText: "Superhero ",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://cdn0.weddingwire.in/article/0852/original/1280/png/122580-screenshot-2024-05-03-at-1-58-03-pm.jpeg",
        altText: "Robot ",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://assets.sheinindia.in/medias/shein_sys_master/root/20250524/2jtz/6831bf967a6cd4182f4c6023/-473Wx593H-443317773-bluewhite-MODEL.jpg",
        altText: "Collectible Figures",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyoNiHaxqINrjsCMqLNYzQFsLQLrYGkTCdxikh9kY1KufsM7kH9qaK2FYzvUqA8vjOhm4&usqp=CAU",
        altText: "Character ",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://thevishnu.in/cdn/shop/articles/Vishnu04thmarch2022_4121.jpg?v=1718008355",
        altText: " Collection",
        height: "h-[450px]",
      },
    ],
    // Slide 2
    [
      {
        id: 1,
        imgSrc: "https://surhi.in/cdn/shop/files/328A1129.jpg?v=1721992215",
        altText: "LEGO Bricks",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://www.iconicindia.com/cdn/shop/files/8907361842268_7.jpg?v=1756116631&width=1920",
        altText: "Building Blocks",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://surhi.in/cdn/shop/files/DSC00240_643de708-5085-4fb9-94eb-aa1037cf1501.jpg?v=1720431410",
        altText: "Construction ",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28040008/2025/3/3/d0cfe774-c11f-468c-a04d-86ae2d5737041741012201945-Ramraj-Standard-Opaque-Pure-Cotton-Formal-Shirt-544174101220-1.jpg",
        altText: "Creative ",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://www.nextdirect.com/cms/resource/blob/998114/c087b788cdabef39d18a6bb72c8bf4b1/date-hero-mens-mb-data.jpg",
        altText: "Block ",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://palkhifashion.com/cdn/shop/collections/36.jpg?v=1745519465&width=3000",
        altText: "STEM Toys",
        height: "h-[450px]",
      },
    ],
    // Slide 3
    [
      {
        id: 1,
        imgSrc:
          "https://peekaabookids.com/cdn/shop/files/JBL00487.png?v=1739291832&width=533",
        altText: "Teddy Bears",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://assets0.mirraw.com/images/11701926/image_long_webp.webp?1695977915",
        altText: "Plush Toys",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://www.peonykidscouture.com/cdn/shop/files/AKI_0062-Edit.jpg?v=1700044297",
        altText: "Dolls",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://themomstore.in/cdn/shop/files/rust-giraffe-printed-kids-casual-co-ord-set-1367530.jpg?v=1755515858",
        altText: "Stuffed Animals",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://berrytree.in/cdn/shop/files/ngp18121-68db755899dea_400x.webp?v=1759296922",
        altText: "Soft Toys",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/2025/JULY/8/Z7Ss0xtg_8aaedb287ba84eeea321586fd42b50cb.jpg",
        altText: "Cuddly Toys",
        height: "h-[450px]",
      },
    ],
  ];
  const promoCards = [
    {
      id: 1,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Men",
      highlight: "Formals & More",
      subtitle: "",
      image:
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28040008/2025/3/3/d0cfe774-c11f-468c-a04d-86ae2d5737041741012201945-Ramraj-Standard-Opaque-Pure-Cotton-Formal-Shirt-544174101220-1.jpg",
      imageAlt: "Action Figures",
      badge: null,
    },
    {
      id: 2,
      bgGradient: "from-orange-500 to-yellow-400",
      title: "Women",
      highlight: "Ethnic & Western",
      subtitle: "",
      image:
        "https://empress-clothing.com/cdn/shop/files/AW5354.jpg?v=1704369868",
      imageAlt: "Building Blocks",
      badge: null,
    },
    {
      id: 3,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Kids",
      highlight: "Casual & cottons",
      subtitle: "",
      image:
        "https://peekaabookids.com/cdn/shop/files/JBL00487.png?v=1739291832&width=533",
      imageAlt: "Dolls and Plush Toys",
      badge: null,
    },

    {
      id: 4,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Spectacles",
      highlight: "Goggles  Time",
      subtitle: "",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop",
      imageAlt: "Board Games",
      badge: null,
    },
    {
      id: 1,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Men",
      highlight: "Formals & More",
      subtitle: "",
      image:
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28040008/2025/3/3/d0cfe774-c11f-468c-a04d-86ae2d5737041741012201945-Ramraj-Standard-Opaque-Pure-Cotton-Formal-Shirt-544174101220-1.jpg",
      imageAlt: "Action Figures",
      badge: null,
    },
    {
      id: 2,
      bgGradient: "from-orange-500 to-yellow-400",
      title: "Women",
      highlight: "Ethnic & Western",
      subtitle: "",
      image:
        "https://empress-clothing.com/cdn/shop/files/AW5354.jpg?v=1704369868",
      imageAlt: "Building Blocks",
      badge: null,
    },
    {
      id: 3,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Kids",
      highlight: "Casual & cottons",
      subtitle: "",
      image:
        "https://peekaabookids.com/cdn/shop/files/JBL00487.png?v=1739291832&width=533",
      imageAlt: "Dolls and Plush Toys",
      badge: null,
    },

    {
      id: 4,
      bgGradient: "from-orange-400 to-amber-400",
      title: "Spectacles",
      highlight: "Goggles  Time",
      subtitle: "",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop",
      imageAlt: "Board Games",
      badge: null,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const snacks = slideImages[currentSlide];

  const products = [
    {
      id: 1,
      image:
        "https://www.anantexports.in/cdn/shop/files/IMG-20240531-WA0010_cdfb2191-e429-4d32-92dd-b2ff7f6c9336.jpg?v=1717168053&width=1946",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },

    {
      id: 2,
      image:
        "https://cdn0.weddingwire.in/article/0852/original/1280/png/122580-screenshot-2024-05-03-at-1-58-03-pm.jpeg",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 3,
      image:
        "https://assets.sheinindia.in/medias/shein_sys_master/root/20250524/2jtz/6831bf967a6cd4182f4c6023/-473Wx593H-443317773-bluewhite-MODEL.jpg",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },

    {
      id: 4,
      image:
        "https://thevishnu.in/cdn/shop/articles/Vishnu04thmarch2022_4121.jpg?v=1718008355",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 5,
      image: "https://surhi.in/cdn/shop/files/328A1129.jpg?v=1721992215",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 6,
      image:
        "https://www.iconicindia.com/cdn/shop/files/8907361842268_7.jpg?v=1756116631&width=1920",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 7,
      image:
        "https://surhi.in/cdn/shop/files/DSC00240_643de708-5085-4fb9-94eb-aa1037cf1501.jpg?v=1720431410",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },

    {
      id: 8,
      image:
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/28040008/2025/3/3/d0cfe774-c11f-468c-a04d-86ae2d5737041741012201945-Ramraj-Standard-Opaque-Pure-Cotton-Formal-Shirt-544174101220-1.jpg",
      title: "Dresses Collection",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
  ];

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=1400&h=600&fit=crop",
      alt: "Winter Kids Fashion",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop",
      alt: "Fashion Collection",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea3c7eb4?w=1400&h=600&fit=crop",
      alt: "Winter Style",
    },
  ];

  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center py-2">
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Explore Our Collections
          </h2>
          <h2 className="text-5xl md:text-7xl font-bold leading-tight text-orange-500">
            Find Ur Best
          </h2>
        </div>

        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-3 h-3 bg-blue-600 ring-2 ring-blue-400 ring-offset-2"
                  : "w-2 h-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex items-end justify-center gap-4 md:gap-6 mb-8 max-w-7xl pb-4 ">
          {snacks.map((snack, index) => (
            <div
              key={`${currentSlide}-${snack.id}`}
              className={`flex shrink-0 w-32 md:w-48 lg:w-56 ${snack.height} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <img
                src={snack.imgSrc}
                alt={snack.altText}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* banner slider */}
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl md:h-[500px] h-[200px] group">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* category card */}
      <div className="w-full p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {promoCards.map((card, idx) => (
            <div
              key={card.id}
              role="button"
              onClick={() => navigate("/productlist")}
              className={`relative overflow-hidden rounded-xl transition-transform duration-300 transform hover:scale-[1.02] cursor-pointer md:h-72 h-52 p-0 bg-white flex flex-col`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-95`}
              />

              <div className="relative z-10 flex h-full">
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <span className="inline-block bg-white/90 text-xs text-gray-800 px-3 py-1 rounded-full font-semibold shadow-sm">
                      {card.title}
                    </span>

                    <h3 className="mt-3 text-2xl font-extrabold text-black drop-shadow-sm">
                      {card.highlight}
                    </h3>
                    {card.subtitle && (
                      <p className="mt-1 text-sm text-gray-800 font-medium">
                        {card.subtitle}
                      </p>
                    )}
                  </div>

                  {card.badge && (
                    <div className="mt-4 inline-flex items-center gap-2 self-start bg-white/90 px-3 py-2 rounded-md shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">
                          B
                        </div>
                        <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          H
                        </div>
                      </div>
                      <div className="text-xs">
                        <p className="font-bold text-gray-900">
                          {card.badge.text}
                        </p>
                        <p className="text-gray-700">{card.badge.subtext}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-44 md:w-52 p-4 flex items-end justify-center">
                  <div className="bg-white rounded-3xl shadow-2xl p-2 -mb-6">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      className="w-36 md:w-44 h-28 md:h-40 object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-4 flex justify-center">
          <button
            onClick={() => navigate("/categories")}
            className="px-6 py-3 bg-orange-500 text-white rounded-full shadow-md hover:bg-orange-600 transition-colors"
          >
            More Categories
          </button>
        </div>
      </div>
      {/* Product List */}

      <div className="w-full py-6">
        <h2 className="md:px-10 px-5 mb-6 text-2xl font-semibold text-gray-800">
          Continue your shopping
        </h2>

        <div className="relative px-0 md:px-10">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide justify-center"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-36 sm:w-44 md:w-48 lg:w-52 flex flex-col border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate("/product")}
              >
                {/* Product Image */}
                <div className="relative w-full md:h-50 h-35  bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover p-3"
                    loading="lazy"
                  />
                </div>

                {/* Product Details */}
                <div className="px-3 py-2">
                  <h3 className="text-sm font-medium text-gray-800 truncate mb-1">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-gray-900">
                      ₹{product.currentPrice}
                    </p>
                    {product.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Faq />
    </div>
  );
};

export default Home;
