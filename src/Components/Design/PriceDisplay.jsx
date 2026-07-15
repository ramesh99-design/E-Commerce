
export default function PriceDisplay({price, quantity = 1, currency = "$"}) {

    const total = price * quantity;
  return (
    <span className="price-display">
      {currency}{total.toLocaleString("en-IN")}
    </span>
  )
}
