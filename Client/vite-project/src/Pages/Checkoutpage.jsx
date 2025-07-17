import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { API_URL } from "../base_URL";

export default function CheckoutPage() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchDesign = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/checkout/${id}`);
    setDesign(response.data);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_id: id,
    });
  } catch (error) {
    console.error("Error fetching design:", error);
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("Error setting up request:", error.message);
    }
  } finally {
    setLoading(false);
  }
};
    fetchDesign();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Track form submission
    window.dataLayer.push({
      event: "form_submission",
      page_id: id,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!design) return <div>Design not found</div>;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundColor: design.secondaryColor,
        fontFamily: design.fontStyle,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: design.primaryColor }}
        >
          {design.pageTitle}
        </h1>
        {design.productImage && (
          <img
            src={design.productImage}
            alt="Product"
            className="w-full h-48 object-cover mb-4 rounded"
          />
        )}
        <h2 className="text-xl font-semibold mb-2">{design.productName}</h2>
        <p className="text-lg mb-4">${design.productPrice}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          {design.formFields.name && (
            <input
              type="text"
              placeholder="Name"
              className="p-2 w-full border rounded-md"
              style={{ borderColor: design.primaryColor }}
            />
          )}
          {design.formFields.email && (
            <input
              type="email"
              placeholder="Email"
              className="p-2 w-full border rounded-md"
              style={{ borderColor: design.primaryColor }}
            />
          )}
          {design.formFields.phone && (
            <input
              type="tel"
              placeholder="Phone"
              className="p-2 w-full border rounded-md"
              style={{ borderColor: design.primaryColor }}
            />
          )}
          <button
            type="submit"
            className="w-full p-2 rounded-md text-white"
            style={{ backgroundColor: design.primaryColor }}
          >
            {design.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
