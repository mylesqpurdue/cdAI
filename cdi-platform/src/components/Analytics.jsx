import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock,
  Users,
  BarChart3,
  Download,
  Calendar,
  Filter
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
  Cell,
  AreaChart,
  Area
} from 'recharts'

export function Analytics() {
  const [timeRange, setTimeRange] = useState('6months')
  const [department, setDepartment] = useState('all')

  // Sample data for analytics
  const monthlyMetrics = [
    { month: 'Jan', revenue: 45000, suggestions: 120, accepted: 94, rejected: 26, avgTime: 4.5 },
    { month: 'Feb', revenue: 52000, suggestions: 145, accepted: 116, rejected: 29, avgTime: 4.2 },
    { month: 'Mar', revenue: 48000, suggestions: 132, accepted: 105, rejected: 27, avgTime: 4.8 },
    { month: 'Apr', revenue: 61000, suggestions: 168, accepted: 134, rejected: 34, avgTime: 4.1 },
    { month: 'May', revenue: 55000, suggestions: 152, accepted: 121, rejected: 31, avgTime: 4.3 },
    { month: 'Jun', revenue: 67000, suggestions: 185, accepted: 148, rejected: 37, avgTime: 3.9 }
  ]

  const departmentPerformance = [
    { department: 'Cardiology', revenue: 85000, suggestions: 245, acceptance: 82, avgTime: 3.8 },
    { department: 'Orthopedics', revenue: 72000, suggestions: 198, acceptance: 88, avgTime: 4.2 },
    { department: 'Emergency', revenue: 45000, suggestions: 156, acceptance: 75, avgTime: 5.1 },
    { department: 'Surgery', revenue: 98000, suggestions: 287, acceptance: 85, avgTime: 4.0 },
    { department: 'Internal Med', revenue: 56000, suggestions: 167, acceptance: 79, avgTime: 4.5 },
    { department: 'Neurology', revenue: 41000, suggestions: 134, acceptance: 81, avgTime: 4.3 }
  ]

  const suggestionTypes = [
    { name: 'Diagnosis Specificity', value: 45, revenue: 125000, color: '#3b82f6' },
    { name: 'Missing Diagnoses', value: 30, revenue: 89000, color: '#ef4444' },
    { name: 'Procedure Codes', value: 15, revenue: 45000, color: '#10b981' },
    { name: 'Modifiers', value: 10, revenue: 28000, color: '#f59e0b' }
  ]

  const userPerformance = [
    { name: 'Dr. Sarah Johnson', cases: 156, acceptance: 85, avgTime: 3.2, revenue: 45000 },
    { name: 'Dr. Michael Chen', cases: 142, acceptance: 78, avgTime: 4.1, revenue: 38000 },
    { name: 'Dr. Emily Davis', cases: 134, acceptance: 82, avgTime: 3.8, revenue: 41000 },
    { name: 'Dr. Robert Brown', cases: 128, acceptance: 76, avgTime: 4.5, revenue: 35000 },
    { name: 'Dr. Lisa Wilson', cases: 119, acceptance: 88, avgTime: 3.5, revenue: 42000 }
  ]

  const weeklyTrend = [
    { week: 'Week 1', suggestions: 45, accepted: 36, rejected: 9 },
    { week: 'Week 2', suggestions: 52, accepted: 42, rejected: 10 },
    { week: 'Week 3', suggestions: 48, accepted: 39, rejected: 9 },
    { week: 'Week 4', suggestions: 61, accepted: 49, rejected: 12 }
  ]

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle }) => (
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
          <span>{subtitle}</span>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Performance metrics and insights for CDI operations
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="orthopedics">Orthopedics</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Revenue Impact"
          value="$328,000"
          change="+12.5%"
          icon={DollarSign}
          trend="up"
          subtitle="vs last period"
        />
        <MetricCard
          title="Suggestions Generated"
          value="1,247"
          change="+8.2%"
          icon={FileText}
          trend="up"
          subtitle="this period"
        />
        <MetricCard
          title="Acceptance Rate"
          value="78.5%"
          change="+3.1%"
          icon={CheckCircle}
          trend="up"
          subtitle="improvement"
        />
        <MetricCard
          title="Avg. Review Time"
          value="4.2 min"
          change="-15.3%"
          icon={Clock}
          trend="up"
          subtitle="faster"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Trend */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Impact Trend</CardTitle>
            <CardDescription>
              Monthly revenue impact and suggestion volume
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={monthlyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : value,
                    name === 'revenue' ? 'Revenue Impact' : 'Suggestions'
                  ]}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="suggestions" 
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Suggestion Types */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Suggestion Categories</CardTitle>
            <CardDescription>
              Distribution by type and revenue impact
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
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`,
                    'Percentage'
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance</CardTitle>
            <CardDescription>
              Revenue impact and acceptance rates by department
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="department" type="category" width={80} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'revenue' ? `$${value.toLocaleString()}` : `${value}%`,
                    name === 'revenue' ? 'Revenue' : 'Acceptance Rate'
                  ]}
                />
                <Bar dataKey="revenue" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Acceptance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Acceptance Trend</CardTitle>
            <CardDescription>
              Suggestion acceptance vs rejection over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="accepted" 
                  stackId="1"
                  stroke="#10b981" 
                  fill="#10b981"
                />
                <Area 
                  type="monotone" 
                  dataKey="rejected" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#ef4444"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* User Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>CDI Specialist Performance</CardTitle>
          <CardDescription>
            Individual performance metrics for CDI team members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {userPerformance.map((user, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.cases} cases reviewed
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm font-medium">{user.acceptance}%</div>
                    <div className="text-xs text-muted-foreground">Acceptance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{user.avgTime} min</div>
                    <div className="text-xs text-muted-foreground">Avg Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-green-600">
                      ${user.revenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-muted-foreground">Revenue Impact</div>
                  </div>
                  <Badge variant="secondary">
                    {index < 2 ? 'Top Performer' : 'Good'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

