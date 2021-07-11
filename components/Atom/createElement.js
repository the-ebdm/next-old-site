import Select from "../../components/Atom/select";

export default function CreateElement({ item }) {
  switch (item.type) {
    case "textarea":
      return (
        <textarea
          id="message"
          name="message"
          rows={item.rows || 2}
          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
          aria-describedby="message-max"
          defaultValue={""}
        />
      );
    case "select":
      return <Select options={item.options} button={item.button} />;
    default:
      return (
        <input
          type="text"
          name="first_name"
          id="first_name"
          autoComplete="given-name"
          className="shadow-sm focus:ring-teal-500 focus:border-teal-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      );
  }
}