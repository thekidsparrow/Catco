import { Link } from "react-router-dom";
import useCatcoContext from "../CatcoContext";

function Products() {
  const { products } = useCatcoContext();

  function handleAddToCart(productId) {
    const product = products.find((x) => x.id === productId);

    if (product) {
      const cartItem = cartItems.find((x) => x.id == productId);

      if (cartItem) {
        cartItem.quantity++;
      } else {
        product.quantity = 1;
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }

  return (
    <div>
      <h1>Products</h1>
      <div className="products-container">
        {products.map((product) => {
          return (
            <div key={product.id} className="product">
              <img src={noImage} />
              <Link
                to={`/products/${product.id}`}
                state={product}
                className="title"
              >
                {product.name}
              </Link>
              <div className="price">${product.price}</div>
              <div>{product.description}</div>
              <br />
              <button onClick={() => handleAddToCart(product.id)}>
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
