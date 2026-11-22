export default function ProductCard({ product, onAdd, disabled }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price">${product.price}</div>
      <button type="button" onClick={() => onAdd(product)} disabled={disabled}>
        Добавить в корзину
      </button>
    </div>
  );
}
