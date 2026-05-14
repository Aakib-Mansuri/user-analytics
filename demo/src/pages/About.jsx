import { Link } from 'react-router-dom';

export default function About() {
  return (
    <>
      <div className="hero">
        <h1>About <span>Us</span></h1>
        <p>We are a team passionate about great products and even better customer experience.</p>
      </div>

      <section>
        <h2>Our Story</h2>
        <div className="about-content">
          <div>
            <p>
              ShopDemo was founded in 2018 with a simple goal: make online shopping
              feel personal again. We hand-pick every product in our catalog and
              stand behind each one with our 30-day guarantee.
            </p>
            <p>
              Today we serve over 50,000 happy customers across the country.
              Our team of 120 people works tirelessly to make sure your experience
              is seamless from browsing to delivery.
            </p>
            <div className="btn-row">
              <Link to="/products" className="btn btn-primary">Shop Now</Link>
              <button className="btn btn-outline">Contact Us</button>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat"><h3>50K+</h3><p>Happy Customers</p></div>
            <div className="stat"><h3>1200+</h3><p>Products</p></div>
            <div className="stat"><h3>30</h3><p>Day Returns</p></div>
            <div className="stat"><h3>4.9★</h3><p>Avg Rating</p></div>
          </div>
        </div>
      </section>

      <section>
        <h2>Our Values</h2>
        <div className="features">
          <div className="card">
            <div className="icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We offset 100% of our carbon footprint and use recycled packaging.</p>
          </div>
          <div className="card">
            <div className="icon">🤝</div>
            <h3>Community</h3>
            <p>5% of every sale goes to local charities chosen by our customers.</p>
          </div>
          <div className="card">
            <div className="icon">💡</div>
            <h3>Innovation</h3>
            <p>We constantly improve our platform based on real customer feedback.</p>
          </div>
        </div>
      </section>
    </>
  );
}
