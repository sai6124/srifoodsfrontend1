import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./store";
import "./Veg.css";
import "./Home.css";
import { toast } from "react-toastify";

function Veg() {
  const dispatch = useDispatch();
  const { vegItems, loading, error } = useSelector((state) => state.veg);

  // Load veg only if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User NOT logged in → Veg items NOT loaded");
      return;
    }

    dispatch(fetchVegProducts());
  }, [dispatch]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = vegItems.slice(start, start + itemsPerPage);

  if (loading) return <h2>Loading Veg Items...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <main className="veg-container">
      <h1 className="veg-title">Veg Items</h1>

      <section className="veg-list">
        {currentItems.map((item) => (
          <article className="veg-item" key={item._id}>
            <img className="veg-image" src={item.image} alt={item.name} />

            <div className="veg-details">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>₹{item.price}</p>

              <button
                className="add-btn"
                onClick={() => {
                  dispatch(addToCart(item));
                  toast.success(`${item.name} added to cart!`);
                }}
              >
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </main>
  );
}

export default Veg;
