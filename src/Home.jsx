import "./Home.css";


function Home() {
  return (
    <div className="center-wrapper">   {/* ⭐ ADDED THIS */}

      <div className="home-container">

        {/* Welcome Section */}
        <h1 className="home-title">Welcome to Sri Foods 🍽️</h1>
        <p className="home-subtitle">
          Fresh, Delicious & Homemade Food — Delivered with Love ❤️
        </p>

        {/* About Section */}
        <section className="home-section">
          <h2>About Us</h2>
          <p>
            Sri Foods brings you homemade, hygienic and delicious meals prepared with
            fresh ingredients and authentic traditional flavors. Whether you love
            Veg or Non-Veg, we have something special for you every day!
          </p>
        </section>

        {/* Specials */}
        <section className="home-section">
          <h2>Our Special Dishes</h2>
          <ul>
            <li>🍗 Chicken Biryani</li>
            <li>🍗 Mutton Curry</li>
            <li>🐟 Fish Fry</li>
            <li>🥦 Veg Biryani</li>
            <li>🧀 Paneer Butter Masala</li>
            <li>🥘 Andhra Meals</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="home-section">
          <h2>Why Choose Sri Foods?</h2>
          <ul>
            <li>✔ Homemade Taste</li>
            <li>✔ Fresh Ingredients</li>
            <li>✔ Fast Delivery</li>
            <li>✔ Affordable Prices</li>
            <li>✔ UPI Payments Accepted</li>
          </ul>
        </section>

      </div>

    </div>
  );
}
export default Home;

