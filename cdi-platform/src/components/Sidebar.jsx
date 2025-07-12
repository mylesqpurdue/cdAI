import { 
  Home, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  BarChart3, 
  Users, 
  Settings,
  Filter,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export function Sidebar({ activeView, setActiveView }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      count: null
    },
    {
      id: 'work-queue',
      label: 'Work Queue',
      icon: FileText,
      count: 24
    },
    {
      id: 'high-priority',
      label: 'High Priority',
      icon: AlertCircle,
      count: 8
    },
    {
      id: 'pending-review',
      label: 'Pending Review',
      icon: Clock,
      count: 12
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCircle,
      count: 156
    }
  ]

  const analyticsItems = [
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      count: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      count: null
    }
  ]

  const adminItems = [
    {
      id: 'users',
      label: 'User Management',
      icon: Users,
      count: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      count: null
    }
  ]

  const MenuItem = ({ item, isActive, onClick }) => (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`w-full justify-start ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:text-gray-900'}`}
      onClick={() => onClick(item.id)}
    >
      <item.icon className="mr-3 h-4 w-4" />
      <span className="flex-1 text-left">{item.label}</span>
      {item.count && (
        <Badge variant={isActive ? "default" : "secondary"} className="ml-auto">
          {item.count}
        </Badge>
      )}
    </Button>
  )

  return (
    <div className="w-64 bg-white border-r h-full flex flex-col">
      <div className="p-4">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </div>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              All Departments
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start">
              Last 7 Days
            </Button>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Main Navigation */}
        <nav className="space-y-1">
          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Work Management
            </h3>
            {menuItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeView === item.id}
                onClick={setActiveView}
              />
            ))}
          </div>

          <Separator className="my-4" />

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Analytics
            </h3>
            {analyticsItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeView === item.id}
                onClick={setActiveView}
              />
            ))}
          </div>

          <Separator className="my-4" />

          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Administration
            </h3>
            {adminItems.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                isActive={activeView === item.id}
                onClick={setActiveView}
              />
            ))}
          </div>
        </nav>
      </div>
    </div>
  )
}

