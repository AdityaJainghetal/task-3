import { useSelector } from 'react-redux';

export default function PreviewPane() {
  const { design } = useSelector((state) => state.checkout);

  const generateUtmUrl = () => {
    const params = new URLSearchParams();
    Object.entries(design.utmParams).forEach(([key, value]) => {
      if (value) params.append(`utm_${key}`, value);
    });
    return `${window.location.origin}/checkout/preview?${params.toString()}`;
  };

  return (
    <div className="w-1/2 p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Preview</h2>
      <div
        className="border rounded-lg p-6 bg-white"
        style={{
          backgroundColor: design.secondaryColor,
          fontFamily: design.fontStyle,
        }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: design.primaryColor }}>
          {design.pageTitle || 'Checkout Page'}
        </h1>
        {design.productImage && (
          <img src={design.productImage} alt="Product" className="w-full h-48 object-cover mb-4 rounded" />
        )}
        <h2 className="text-xl font-semibold mb-2">{design.productName || 'Product Name'}</h2>
        <p className="text-lg mb-4">${design.productPrice || '0.00'}</p>
        <div className="space-y-4">
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
            className="w-full p-2 rounded-md text-white"
            style={{ backgroundColor: design.primaryColor }}
          >
            {design.buttonText}
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm">Preview URL: <a href={generateUtmUrl()} className="text-blue-500">{generateUtmUrl()}</a></p>
    </div>
  );
}