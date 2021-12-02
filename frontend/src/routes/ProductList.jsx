import ProductResults from "../components/productResults";
import Search from "../components/Search";

const ProductList = () => {
  return (
    <div className="productList">
      <Search />
      <ProductResults />
    </div>
  );
};

export default ProductList;
