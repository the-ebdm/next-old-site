import CreateElement from "../Atom/createElement";

export default function Form({ title, schema, type, collection, onSubmit, collumns = 1 }) {
  if (type === "save") {
    onSubmit = (event) => {
      event.preventDefault();
      console.log(event.target[0].value);
    };
  }
  return (
    <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12 mb-8">
      <h3 className="text-lg font-medium text-warm-gray-900">{title}</h3>
      <form
        onSubmit={(event) => {
          onSubmit(event);
        }}
        className={`mt-6 grid sm:grid-cols-${collumns} grid-cols-${collumns} gap-y-6 sm:gap-x-8`}
      >
        {schema.fields.map((item) => {
          return (
            <div className={`mr-2 ml-2 ${item.span ? 'col-span-2' : null}`}>
              <label htmlFor="first_name" className="block text-sm font-medium text-warm-gray-900">
                {item.name}
              </label>
              <div className="mt-1">
                <CreateElement item={item}/>
              </div>
            </div>
          );
        })}
        <div>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}