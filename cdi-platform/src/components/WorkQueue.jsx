import { useState } from 'react'
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  User,
  Calendar,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function WorkQueue({ onSelectNote }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  // Sample data for work queue
  const notes = [
    {
      id: 'N001',
      patientId: 'P12847',
      patientName: 'Sarah Johnson',
      noteType: 'Discharge Summary',
      department: 'Cardiology',
      admissionDate: '2024-06-15',
      dischargeDate: '2024-06-18',
      priority: 'high',
      status: 'pending',
      suggestionsCount: 3,
      potentialRevenue: 2400,
      assignedTo: 'Dr. Smith',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'N002',
      patientId: 'P12848',
      patientName: 'Michael Chen',
      noteType: 'Operative Report',
      department: 'Orthopedics',
      admissionDate: '2024-06-16',
      dischargeDate: '2024-06-17',
      priority: 'medium',
      status: 'in-review',
      suggestionsCount: 2,
      potentialRevenue: 1800,
      assignedTo: 'Dr. Johnson',
      lastUpdated: '4 hours ago'
    },
    {
      id: 'N003',
      patientId: 'P12849',
      patientName: 'Emily Davis',
      noteType: 'Progress Note',
      department: 'Internal Medicine',
      admissionDate: '2024-06-14',
      dischargeDate: '2024-06-19',
      priority: 'low',
      status: 'completed',
      suggestionsCount: 1,
      potentialRevenue: 600,
      assignedTo: 'Dr. Wilson',
      lastUpdated: '1 day ago'
    },
    {
      id: 'N004',
      patientId: 'P12850',
      patientName: 'Robert Brown',
      noteType: 'Consultation Note',
      department: 'Emergency',
      admissionDate: '2024-06-17',
      dischargeDate: '2024-06-17',
      priority: 'high',
      status: 'pending',
      suggestionsCount: 4,
      potentialRevenue: 3200,
      assignedTo: 'Dr. Anderson',
      lastUpdated: '30 minutes ago'
    },
    {
      id: 'N005',
      patientId: 'P12851',
      patientName: 'Lisa Wilson',
      noteType: 'Discharge Summary',
      department: 'Surgery',
      admissionDate: '2024-06-13',
      dischargeDate: '2024-06-16',
      priority: 'medium',
      status: 'pending',
      suggestionsCount: 2,
      potentialRevenue: 1500,
      assignedTo: 'Dr. Taylor',
      lastUpdated: '1 hour ago'
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'in-review': return <Eye className="h-4 w-4 text-blue-500" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-review': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.noteType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || note.status === filterStatus
    const matchesPriority = filterPriority === 'all' || note.priority === filterPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Work Queue</h2>
        <p className="text-muted-foreground">
          Manage and review clinical documentation suggestions
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notes.length}</div>
            <p className="text-xs text-muted-foreground">
              Active in queue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notes.filter(n => n.priority === 'high').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Require immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {notes.filter(n => n.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting CDI review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
            <div className="text-green-600">$</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${notes.reduce((sum, note) => sum + note.potentialRevenue, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total opportunity
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by patient name, ID, or note type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-review">In Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Work Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Clinical Notes Queue</CardTitle>
          <CardDescription>
            {filteredNotes.length} of {notes.length} notes shown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Note Type</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Suggestions</TableHead>
                <TableHead>Revenue Impact</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNotes.map((note) => (
                <TableRow key={note.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{note.patientName}</div>
                      <div className="text-sm text-muted-foreground">{note.patientId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{note.noteType}</div>
                      <div className="text-sm text-muted-foreground">
                        {note.admissionDate} - {note.dischargeDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{note.department}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(note.priority)}>
                      {note.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(note.status)}
                      <Badge variant="outline" className={getStatusColor(note.status)}>
                        {note.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {note.suggestionsCount} suggestions
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    ${note.potentialRevenue.toLocaleString()}
                  </TableCell>
                  <TableCell>{note.assignedTo}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {note.lastUpdated}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => onSelectNote(note)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Review Note
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          Reassign
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Complete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

