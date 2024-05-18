import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Add_clint() {
  const history = useNavigate();
  const [message, setMessage] = useState("");
  const [clint_name, setClint_name] = useState("");
  const [Clint_contact_no, setClint_contact_no] = useState("");
  const [Clint_email_id, setClint_email_id] = useState("");
  const [Clint_domain, setClint_domain] = useState("");
  const [clint_logo, setClint_logo] = useState("");
  const tocken = localStorage.getItem("login_tocken");

  const handleAddClient = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("clint_name", clint_name);
    formData.append("clint_contact_no", Clint_contact_no);
    formData.append("clint_email_id", Clint_email_id);
    formData.append("clint_domain", Clint_domain);
    formData.append("clint_logo", clint_logo);
    try {
      const response = await axios.post(
        "http://localhost:4000/admin/api/add_clint",
        formData,
        {
          headers: {
            Authorization: tocken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        setMessage("Data saved scussfull");
        history("/admin_clint");
      } else {
        setMessage("Data saved failed");
      }
    } catch (error) {
      console.log(error);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded shadow-md p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Client</h2>
        <label className="block">Client Name:</label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          name="clint_name"
          value={clint_name}
          onChange={(e) => setClint_name(e.target.value)}
        />
        <label className="block mt-2">Contact Number:</label>
        <input
          type="text"
          className="input input-bordered input-info w-full max-w-xs"
          name="clint_contact_no"
          value={Clint_contact_no}
          onChange={(e) => setClint_contact_no(e.target.value)}
        />
        <label className="block mt-2">Email ID:</label>
        <input
          type="email"
          className="input input-bordered input-info w-full max-w-xs"
          name="clint_email_id"
          value={Clint_email_id}
          onChange={(e) => setClint_email_id(e.target.value)}
        />
        <label className="block mt-2">Domain:</label>
        <select
          className="select select-info w-full max-w-xs"
          value={Clint_domain}
          onChange={(e) => setClint_domain(e.target.value)}
        >
          <option>Select Domain</option>
          <option>Information Teconolody</option>
          <option>Markiting</option>
          <option>Degitial Markiting</option>
          <option>Influsor</option>
        </select>
        <label className="block mt-2">Logo URL:</label>
        <input
          type="file"
          className="file-input file-input-bordered file-input-info w-full max-w-xs"
          accept="image/*"
          onChange={(e) => setClint_logo(e.target.files[0])}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
          onClick={handleAddClient}
        >
          Add Client
        </button>
        <p className="mt-2 text-red-500">{message}</p>
      </div>
    </div>
  );
}

export default Add_clint;
