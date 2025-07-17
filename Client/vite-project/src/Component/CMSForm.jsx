import { useDispatch, useSelector } from 'react-redux';
import { updateDesign, resetDesign, saveDesign } from '../Redux/checkoutSlice';

export default function CMSForm() {
  const dispatch = useDispatch();
  const { design, loading, error } = useSelector((state) => state.checkout);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDesign({ [name]: value }));
  };

  const handleFormFieldToggle = (field) => {
    dispatch(updateDesign({
      formFields: { ...design.formFields, [field]: !design.formFields[field] },
    }));
  };

  const handleUtmChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDesign({
      utmParams: { ...design.utmParams, [name]: value },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(updateDesign({ productImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(saveDesign(design));
  };
console.log(design,"Dataaaaaaaaaaa")
  return (
    <div className="w-1/2 p-6 bg-white shadow-lg overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Checkout Page Builder</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Page Title</label>
          <input
            type="text"
            name="pageTitle"
            value={design.pageTitle}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="productName"
            value={design.productName}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Price</label>
          <input
            type="number"
            name="productPrice"
            value={design.productPrice}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Button Text</label>
          <input
            type="text"
            name="buttonText"
            value={design.buttonText}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Primary Color</label>
          <input
            type="color"
            name="primaryColor"
            value={design.primaryColor}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Secondary Color</label>
          <input
            type="color"
            name="secondaryColor"
            value={design.secondaryColor}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Font Style</label>
          <select
            name="fontStyle"
            value={design.fontStyle}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="Arial">Arial</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Form Fields</label>
          <div className="space-y-2">
            {['name', 'email', 'phone'].map((field) => (
              <label key={field} className="flex items-center">
                <input
                  type="checkbox"
                  checked={design.formFields[field]}
                  onChange={() => handleFormFieldToggle(field)}
                  className="mr-2"
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium">UTM Parameters</label>
          {['source', 'medium', 'campaign', 'term', 'content'].map((param) => (
            <input
              key={param}
              type="text"
              name={param}
              placeholder={`UTM ${param}`}
              value={design.utmParams[param]}
              onChange={handleUtmChange}
              className="mt-1 p-2 w-full border rounded-md"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex space-x-4">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading ? 'Saving...' : 'Save Design'}
          </button>
          <button
            onClick={() => dispatch(resetDesign())}
            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
