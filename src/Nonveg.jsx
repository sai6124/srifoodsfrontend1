import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNonvegProducts, addToCart } from "./store";
import "./Nonveg.css";
import "./Home.css";

function Nonveg() {
  const dispatch = useDispatch();
  const { nonvegItems, loading, error } = useSelector((state) => state.nonveg);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("User NOT logged in → Nonveg items NOT loaded");
      return;
    }

    dispatch(fetchNonvegProducts());
  }, [dispatch]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  if (loading) return <h2>Loading Nonveg Items...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  const totalPages = Math.ceil(nonvegItems.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const currentItems = nonvegItems.slice(start, start + itemsPerPage);

  return (
    <main className="veg-container">
      <h1 className="veg-title">Non Veg Items</h1>

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
                onClick={() => dispatch(addToCart(item))}
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

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active-page" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
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

export default Nonveg;
