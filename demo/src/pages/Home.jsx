import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div className="hero">
        <h1>Welcome to <span>ShopDemo</span></h1>
        <p>A demo store to test user analytics tracking. Click around — every interaction is being tracked!</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/products" className="btn btn-primary">Browse Products</Link>
          <Link to="/about"    className="btn btn-outline">Learn More</Link>
        </div>
      </div>

      <section>
        <h2>Why ShopDemo?</h2>
        <div className="features">
          <div className="card">
            <div className="icon">⚡</div>
            <h3>Fast Delivery</h3>
            <p>Same-day shipping on all orders placed before 3pm. We get it to you fast.</p>
          </div>
          <div className="card">
            <div className="icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>All transactions are encrypted and protected with industry-standard security.</p>
          </div>
          <div className="card">
            <div className="icon">↩️</div>
            <h3>Easy Returns</h3>
            <p>Not happy? Return anything within 30 days, no questions asked.</p>
          </div>
          <div className="card">
            <div className="icon">🎁</div>
            <h3>Loyalty Rewards</h3>
            <p>Earn points on every purchase and redeem them for exclusive discounts.</p>
          </div>
        </div>
      </section>

      <section>
        <h2>Popular Right Now</h2>
        <div className="btn-row">
          <button className="btn btn-primary">Shop Electronics</button>
          <button className="btn btn-secondary">Shop Clothing</button>
          <button className="btn btn-outline">View All Categories</button>
        </div>
      </section>
    </>
  );
}
