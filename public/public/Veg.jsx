import { useState } from "react";
import "./Veg.css";

function Veg() {
  const vegItems = [
    { id: 1, name: "Paneer Butter Masala", price: 180, image: "download1.jpeg", description: "Creamy tomato gravy with soft paneer cubes." },
    { id: 2, name: "Veg Biryani", price: 150, image: "veg-biryani-recipe2.jpg", description: "Aromatic basmati rice with mixed vegetables." },
    { id: 3, name: "Gobi Manchurian", price: 120, image: "download5.jpeg", description: "Crispy cauliflower tossed in spicy sauce." },
    { id: 4, name: "Palak Paneer", price: 160, image: "palakpanner.jpeg", description: "Healthy spinach gravy with paneer." },
    { id: 5, name: "Aloo Fry", price: 90, image: "allo fry.jpeg", description: "Crispy fried potato masala." },
    { id: 6, name: "Dal Tadka", price: 110, image: "dal tadak.jpeg", description: "Yellow dal with ghee tadka." },
    { id: 7, name: "Veg Fried Rice", price: 140, image: "veg friedrice.jpeg", description: "Indian-Chinese style mixed veg fried rice." },
    { id: 8, name: "Paneer Tikka", price: 200, image: "panner thikaka.jpeg", description: "Smoky and spicy paneer grilled cubes." },
    { id: 9, name: "Chole Masala", price: 130, image: "choley masala.jpeg", description: "North Indian chickpea curry." },
    { id: 10, name: "Veg Noodles", price: 120, image: "", description: "Stir-fried noodles with vegetables." },
    { id: 11, name: "Kaju Curry", price: 220, image: "download (1).jpeg", description: "Rich creamy curry with cashews." },
    { id: 12, name: "Aloo Gobi", price: 100, image: "allo gobi.jpeg", description: "Potato cauliflower dry curry." },
    { id: 13, name: "Mixed Veg Curry", price: 140, image: "dal tadak.jpeg", description: "Seasonal vegetables in masala gravy." },
    { id: 14, name: "Mushroom Curry", price: 160, image: "musroom curry.jpeg", description: "Delicious mushroom in spicy gravy." },
    { id: 15, name: "Roti (2 pcs)", price: 30, image: "roti.jpeg", description: "Soft and fresh tawa rotis." }
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentItems = vegItems.slice(start, end);

  return (
    <>
      <main className="veg-container">
        <h1 className="veg-title">Veg Items</h1>

        <section className="veg-list">
          {currentItems.map(item => (
            <article className="veg-item" key={item.id} id={`veg-${item.id}`}>
              <img
                className="veg-image"
                src={item.image ? item.image : "noimage.png"}
                alt={item.name}
              />

              <div className="veg-details">
                <h2 className="veg-name">{item.name}</h2>
                <p className="veg-desc">{item.description}</p>
                <p className="veg-price">Price: ₹{item.price}</p>
                <button className="add-btn">Add to Cart</button>
              </div>
            </article>
          ))}
        </section>

        {/* Pagination Buttons Bottom */}
        <footer>
          <div className="pagination">

            <button
              className="prev-next"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ◀ Prev
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active-page" : ""}
              >
                {index + 1}
              </button>
            ))}

            <button
              className="prev-next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next ▶
            </button>

          </div>
        </footer>

      </main>
    </>
  );
}

export default Veg;
