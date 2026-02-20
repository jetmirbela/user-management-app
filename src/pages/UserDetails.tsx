import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.users.users);
  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Return to user list
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Users
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8 bg-gradient-to-r from-blue-600 to-blue-700">
          <h1 className="text-3xl font-bold text-white">{user.name}</h1>
          <p className="mt-2 text-blue-100">{user.email}</p>
        </div>

        <div className="px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`mailto:${user.email}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {user.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`tel:${user.phone}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {user.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Website</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {user.website}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Street</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.address.street}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Suite</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.address.suite}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">City</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.address.city}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Zipcode</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.address.zipcode}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company</h2>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Name</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.company.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Catchphrase</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.company.catchPhrase}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business</dt>
                  <dd className="mt-1 text-sm text-gray-900">{user.company.bs}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
