import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mockProducts } from "../data/mockProducts";
import {
  addToCart,
  selectIsCheckingOut,
  selectLoading,
  selectProducts,
  setLoading,
  setProducts,
} from "../store/store";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const isCheckingOut = useSelector(selectIsCheckingOut);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setProducts(mockProducts));
      dispatch(setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  const searchQuery = searchTerm.toLowerCase();
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery);
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) =>
      sortBy === "price" ? a.price - b.price : a.name.localeCompare(b.name),
    );

  const handleAddProduct = (product) => dispatch(addToCart(product));

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input
            type="text"
            aria-label="Поиск товаров"
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="filter-controls">
          <button
            type="button"
            aria-expanded={showFilters}
            onClick={() => setShowFilters((isOpen) => !isOpen)}
          >
            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
          </button>

          <select
            aria-label="Категория"
            hidden={!showFilters}
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="all">Все категории</option>
            <option value="phones">Телефоны</option>
            <option value="laptops">Ноутбуки</option>
            <option value="tablets">Планшеты</option>
          </select>

          <select
            aria-label="Сортировка"
            hidden={!showFilters}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="name">По названию</option>
            <option value="price">По цене</option>
          </select>
        </div>
      </div>

      <div className="products">
        {filteredProducts.length === 0 ? (
          <p>Товары не найдены</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddProduct}
              disabled={isCheckingOut}
            />
          ))
        )}
      </div>
    </div>
  );
}
