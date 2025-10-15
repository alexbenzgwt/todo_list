import { HelpCircle, MessageSquare, Mail, Phone } from 'lucide-react';

const HelpPage = () => {
  const helpSections = [
    {
      title: 'Getting Started',
      items: [
        'How to create your first task',
        'Setting up client information',
        'Understanding task priorities',
        'Managing your dashboard',
      ],
    },
    {
      title: 'Task Management',
      items: [
        'Creating and editing tasks',
        'Setting due dates and reminders',
        'Tracking task progress',
        'Managing overdue tasks',
      ],
    },
    {
      title: 'Client Management',
      items: [
        'Adding new clients',
        'Updating client information',
        'Viewing client task history',
        'Generating client reports',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          {helpSections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h2>
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-sm text-gray-600">
                    <HelpCircle className="h-4 w-4 text-gray-400 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email Support</p>
                  <p className="text-sm text-gray-500">support@todolist.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone Support</p>
                  <p className="text-sm text-gray-500">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <MessageSquare className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Live Chat</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Report a Bug</p>
                <p className="text-xs text-gray-500">Help us improve the platform</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">Request Feature</p>
                <p className="text-xs text-gray-500">Suggest new functionality</p>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <p className="text-sm font-medium text-gray-900">View Documentation</p>
                <p className="text-xs text-gray-500">Comprehensive user guide</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
