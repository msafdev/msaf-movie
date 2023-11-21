export default function Vote({ vote }) {
  let roundedVote = parseFloat(vote).toFixed(1);

  let color;

  if (roundedVote >= 8) {
    color = "bg-emerald-500";
  } else if (roundedVote >= 6) {
    color = "bg-yellow-500";
  } else if (roundedVote >= 4) {
    color = "bg-amber-500";
  } else if (roundedVote >= 2) {
    color = "bg-red-400";
  } else if (roundedVote >= 0) {
    color = "bg-red-500";
  } else {
    color = "bg-gray-500";
    roundedVote = "";
  }

  return (
    <div
      className={`cursor-default flex z-20 items-center justify-center w-12 h-12 rounded-full ${color}`}
    >
      <p className="text-lg font-semibold text-[#fdfeff]">{roundedVote}</p>
    </div>
  );
}
