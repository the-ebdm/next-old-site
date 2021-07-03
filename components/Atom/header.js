export default function Header({ title }) {
  return (
    <div className="my-4">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">{title}</span>
        </h1>
      </div>
    </div>
  );
}