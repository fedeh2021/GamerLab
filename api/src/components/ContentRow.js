
import '../assets/css/app.css';
import AmountProductsDb from "./AmountProductsDb";
import TotalPriceProductsDb from "./TotalPriceProductsDb"
import AmountUsersDb from "./AmountUsersDb"

function ContentRow() {
  return (
    <div className="row">
      <AmountProductsDb />
      <TotalPriceProductsDb />
      <AmountUsersDb />
    </div>
  );
}

export default ContentRow