
import '../assets/css/app.css';
import LastProductDb from "./LastProductDb";
import CategoriesDb from "./CategoriesDb"
import ProductsTotal from "./ProductsTotal";

function ContentRow2() {
  return (
    <div className="row">
      <LastProductDb />
      <CategoriesDb />
      <ProductsTotal />
    </div>
  );
}

export default ContentRow2;