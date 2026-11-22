export default function ProductCard({ product, onAdd }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button type="button" onClick={() => onAdd(product)}>
        Добавить в корзину
      </button>
    </div>
  );
}
