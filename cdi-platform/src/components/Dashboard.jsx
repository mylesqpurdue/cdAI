import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock,
  AlertTriangle,
  Users
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

export function Dashboard() {
  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, suggestions: 120 },
    { month: 'Feb', revenue: 52000, suggestions: 145 },
    { month: 'Mar', revenue: 48000, suggestions: 132 },
    { month: 'Apr', revenue: 61000, suggestions: 168 },
    { month: 'May', revenue: 55000, suggestions: 152 },
    { month: 'Jun', revenue: 67000, suggestions: 185 }
  ]

  const suggestionTypes = [
    { name: 'Specificity', value: 45, color: '#3b82f6' },
    { name: 'Missing Diagnoses', value: 30, color: '#ef4444' },
    { name: 'Procedure Codes', value: 15, color: '#10b981' },
    { name: 'Modifiers', value: 10, color: '#f59e0b' }
  ]

  const departmentData = [
    { department: 'Cardiology', completed: 85, pending: 12 },
    { department: 'Orthopedics', completed: 92, pending: 8 },
    { department: 'Emergency', completed: 78, pending: 18 },
    { department: 'Surgery', completed: 88, pending: 15 },
    { department: 'Internal Med', completed: 82, pending: 14 }
  ]

  const MetricCard = ({ title, value, change, icon: Icon, trend }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your clinical documentation improvement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue Impact"
          value="$324,000"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
        />
        <MetricCard
          title="Suggestions Generated"
          value="1,247"
          change="+8.2%"
          icon={FileText}
          trend="up"
        />
        <MetricCard
          title="Acceptance Rate"
          value="78.5%"
          change="+3.1%"
          icon={CheckCircle}
          trend="up"
        />
        <MetricCard
          title="Avg. Review Time"
          value="4.2 min"
          change="-15.3%"
          icon={Clock}
          trend="up"
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Impact Trend</CardTitle>
            <CardDescription>
              Monthly revenue impact from CDI suggestions
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue Impact' : 'Suggestions'
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Suggestion Types */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Suggestion Categories</CardTitle>
            <CardDescription>
              Distribution of suggestion types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={suggestionTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {suggestionTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance and Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Completion rates by department
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {departmentData.map((dept, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{dept.department}</span>
                  <span className="text-sm text-muted-foreground">
                    {dept.completed}% complete
                  </span>
                </div>
                <Progress value={dept.completed} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dept.completed} completed</span>
                  <span>{dept.pending} pending</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest CDI actions and updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500 mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Suggestion accepted for Patient #12847
                </p>
                <p className="text-xs text-muted-foreground">
                  Added specificity to diabetes diagnosis • 2 minutes ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-4 w-4 text-yellow-500 mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  High-priority case assigned
                </p>
                <p className="text-xs text-muted-foreground">
                  Complex cardiac procedure needs review • 5 minutes ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Users className="h-4 w-4 text-blue-500 mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  New CDI specialist onboarded
                </p>
                <p className="text-xs text-muted-foreground">
                  Dr. Michael Chen joined the team • 1 hour ago
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <FileText className="h-4 w-4 text-purple-500 mt-1" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Weekly report generated
                </p>
                <p className="text-xs text-muted-foreground">
                  Performance metrics for June 2024 • 2 hours ago
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

