export default function Search({ style }) {
  return (
    <div className={`items-center border-[2px] border-[#010b13] border-opacity-20 px-6 lg:px-4 py-3 rounded-full justify-between ${style}`}>
      <input type="text" placeholder="Search" className="outline-none placeholder:text-[#010b13]" />
    </div>
  );
}
