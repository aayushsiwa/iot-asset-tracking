import "@/app/globals.css";

const Rows = () => {
  const rows = [];

  for (let i = 0; i < 15; i++) {
    rows.push(
      <tr key={i} className="blink blur-md">
        <td className="p-2 border border-gray-600">10</td>
        <td className="p-2 border border-gray-600">30/5/2024, 8:42:55 pm</td>
        <td className="p-2 border border-gray-600">
          Raspberry Pi Compute Module 4
        </td>
        <td className="p-2 border border-gray-600">Embedded System Module</td>
        <td className="p-2 border border-gray-600">
          Raspberry Pi Compute Module 4
        </td>
        <td className="p-2 border border-gray-600">Active</td>
        <td className="p-2 border border-gray-600">Development Lab</td>
      </tr>,
    );
  }

  return <>{rows}</>;
};

export default Rows;

export const Rows2 = () => {
  const rows = [];

  for (let i = 0; i < 10; i++) {
    rows.push(
      <tr className="flex justify-center items-center p-2 border-b-2 border-slate-700">
        <td className="w-1/2 flex justify-center items-center border border-gray-600  blink blur-md">
          10
        </td>
        <td className="w-1/2 flex justify-center items-center border border-gray-600  blink blur-md">
          Development Lab
        </td>
      </tr>,
    );
  }

  return <>{rows}</>;
};
