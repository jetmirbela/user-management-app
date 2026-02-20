import { useState, FormEvent } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addUser } from '../store/slices/usersSlice';
import { UserFormData } from '../types/user';
import { formatPhoneNumber, formatZipcode, onlyAlphanumericAndSpaces, onlyAddressChars } from '../utils/formatting';

interface AddUserFormProps {
  onClose: () => void;
}

const AddUserForm = ({ onClose }: AddUserFormProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    phone: '',
    website: '',
    address: {
      street: '',
      city: '',
      zipcode: '',
    },
    company: {
      name: '',
    },
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string; email?: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      dispatch(addUser(formData));
      onClose();
    }
  };

  const handleChange = (field: keyof UserFormData, value: string) => {
    let formattedValue = value;
    
    // Apply formatting based on field type
    if (field === 'phone') {
      // Only format if user is typing (not empty)
      formattedValue = value ? formatPhoneNumber(value) : value;
    } else if (field === 'name') {
      formattedValue = onlyAlphanumericAndSpaces(value);
    }
    
    setFormData((prev) => ({ ...prev, [field]: formattedValue }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAddressChange = (field: string, value: string) => {
    let formattedValue = value;
    
    // Format zipcode - only format if user is typing (not empty)
    if (field === 'zipcode') {
      formattedValue = value ? formatZipcode(value) : value;
    } else if (field === 'street') {
      formattedValue = onlyAddressChars(value);
    } else if (field === 'city') {
      formattedValue = onlyAlphanumericAndSpaces(value);
    }
    
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address!, [field]: formattedValue },
    }));
  };

  const handleCompanyChange = (value: string) => {
    const formattedValue = onlyAlphanumericAndSpaces(value);
    setFormData((prev) => ({
      ...prev,
      company: { ...prev.company!, name: formattedValue },
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(XXX) XXX-XXXX"
              maxLength={14}
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="text"
              id="website"
              value={formData.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter website URL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                id="street"
                value={formData.address?.street || ''}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street address"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                value={formData.address?.city || ''}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="City"
              />
            </div>
            <div>
              <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                Zipcode
              </label>
              <input
                type="text"
                id="zipcode"
                value={formData.address?.zipcode || ''}
                onChange={(e) => handleAddressChange('zipcode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="XXXXX or XXXXX-XXXX"
                maxLength={10}
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              id="company"
              value={formData.company?.name || ''}
              onChange={(e) => handleCompanyChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter company name"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserForm;
