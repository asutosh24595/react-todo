export default function Button({ children, className }) {
  let classes = className;
  return (
    <button
      className={`border rounded-lg py-2 px-4 m-2 text-white  focus:outline-none focus:ring-2 focus:ring-opacity-50 ${classes}`}
    >
      {children}
    </button>
  );
}
