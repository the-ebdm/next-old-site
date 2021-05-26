export default function Button({
  name,
  type = "button",
  func,
  color = "accent",
  role,
  user = null,
}) {
  const returnButton = () => {
    return (
      <button
        type={type}
        className={`inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-${color}-600 hover:bg-${color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${color}-500`}
        onClick={() => {
          if (typeof func === "function") {
            func();
          }
        }}
      >
        {name}
      </button>
    );
  };
  if (role === "admin") {
    console.log(user);
    if (user !== null) {
      if (user.isAdmin) {
        return returnButton();
      }
    }
    return <></>;
  } else {
    return returnButton();
  }
}
