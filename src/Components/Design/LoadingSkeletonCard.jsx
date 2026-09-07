import React from "react";
import SkeletonCard from "./SkeletonCard";

export default function LoadingSkeletonCard({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </>
  );
}
