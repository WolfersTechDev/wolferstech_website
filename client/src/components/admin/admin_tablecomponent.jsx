/* eslint-disable react/prop-types */
import { RiMailSendLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";

function Admin_Tablecomponent({ item }) {
  return (
    <tr className="border-t border-gray-300">
      <td className="px-4 py-2">{item.name}</td>
      <td className="px-4 py-2">{item.mobile_no}</td>
      <td className="px-4 py-2">{item.email_id}</td>
      <td className="px-4 py-2">{item.contant}</td>
      <td className="px-4 py-2 padd">
        <div className="tooltip" data-tip="Send email">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <RiMailSendLine />
          </button>
        </div>
        <div className="tooltip" data-tip="Delete email">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">
            <MdDeleteForever />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Admin_Tablecomponent;
