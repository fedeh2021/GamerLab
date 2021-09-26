
import '../assets/css/app.css';
import LastProductDb from "./LastProductDb";
import CategoriesDb from "./CategoriesDb"

function ContentRow2() {
  return (
    <div className="row">
      <LastProductDb />
      <CategoriesDb />
    </div>
  );
}

export default ContentRow2;