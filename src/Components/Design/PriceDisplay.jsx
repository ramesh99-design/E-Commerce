import React from "react";

export default function PriceDisplay({ price = 0, quantity = 1, currency = "$" }) {
  const total = Number(price || 0) * quantity;
  const formatted = total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <span className="inline-flex items-baseline font-bold tracking-tight">
      <span className="text-violet-400 font-semibold text-[0.85em] mr-0.5">{currency}</span>
      <span>{formatted}</span>
    </span>
  );
}
