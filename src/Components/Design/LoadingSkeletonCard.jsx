import SkeletonCard from "./SkeletonCard";

export default function LoadingSkeletonCard({ count = 6 }) {
  return (
    <div className="card-grid" alignItems="center">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
