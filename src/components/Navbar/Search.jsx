export default function Search({ style }) {
  return (
    <div className={`items-center border-[3px] border-[#010b13] border-opacity-60 px-6 lg:px-4 py-2 rounded-full justify-between ${style}`}>
      <input type="text" placeholder="Search" className="outline-none placeholder:text-[#010b13]" />
    </div>
  );
}
