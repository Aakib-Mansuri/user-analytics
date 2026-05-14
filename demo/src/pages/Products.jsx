import { Link } from 'react-router-dom';

export default function Products() {
  return (
    <>
      <div className="hero">
        <h1>Our <span>Products</span></h1>
        <p>Click on anything — every interaction is tracked and visible in the analytics dashboard.</p>
      </div>

      <section>
        <h2>Electronics</h2>
        <div className="product-grid">
          {[
            { icon: '🎧', name: 'Wireless Headphones', price: '$89.99' },
            { icon: '⌚', name: 'Smart Watch',          price: '$199.99' },
            { icon: '📷', name: 'Mirrorless Camera',    price: '$749.00' },
            { icon: '💻', name: 'Ultrabook Laptop',     price: '$1,199.00' },
          ].map(({ icon, name, price }) => (
            <div className="product-card" key={name}>
              <div className="product-img">{icon}</div>
              <div className="product-info">
                <h3>{name}</h3>
                <div className="price">{price}</div>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Clothing</h2>
        <div className="product-grid">
          {[
            { icon: '👟', name: 'Running Shoes', price: '$69.99' },
            { icon: '🧢', name: 'Classic Cap',   price: '$24.99' },
            { icon: '🧥', name: 'Winter Jacket', price: '$149.00' },
            { icon: '👜', name: 'Leather Bag',   price: '$119.00' },
          ].map(({ icon, name, price }) => (
            <div className="product-card" key={name}>
              <div className="product-img">{icon}</div>
              <div className="product-info">
                <h3>{name}</h3>
                <div className="price">{price}</div>
                <button className="btn btn-secondary">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="btn-row">
          <button className="btn btn-primary">Load More Products</button>
          <Link to="/" className="btn btn-outline">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
