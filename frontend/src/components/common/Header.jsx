import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          </div>

          <nav className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/tasks')}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Tasks
            </button>

            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-gray-700 font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
