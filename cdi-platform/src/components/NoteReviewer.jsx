import { useState } from 'react'
import { 
  ArrowLeft, 
  CheckCircle, 
  X, 
  AlertCircle, 
  DollarSign, 
  Clock, 
  User,
  FileText,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Save
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

export function NoteReviewer({ note, onBack }) {
  const [selectedSuggestion, setSelectedSuggestion] = useState(null)
  const [feedback, setFeedback] = useState('')

  // Sample clinical note content
  const noteContent = `DISCHARGE SUMMARY

Patient: ${note.patientName}
MRN: ${note.patientId}
Admission Date: ${note.admissionDate}
Discharge Date: ${note.dischargeDate}
Department: ${note.department}

CHIEF COMPLAINT:
Chest pain and shortness of breath

HISTORY OF PRESENT ILLNESS:
The patient is a 65-year-old male with a history of hypertension and diabetes who presented to the emergency department with acute onset chest pain and dyspnea. The pain was described as crushing, substernal, radiating to the left arm. Associated symptoms included diaphoresis and nausea.

PAST MEDICAL HISTORY:
- Hypertension
- Diabetes mellitus
- Hyperlipidemia

PHYSICAL EXAMINATION:
Vital signs stable. Cardiovascular examination revealed regular rate and rhythm with no murmurs. Pulmonary examination showed bilateral crackles at the bases.

DIAGNOSTIC STUDIES:
- ECG: ST elevation in leads II, III, aVF
- Troponin I: elevated at 15.2 ng/mL
- Chest X-ray: mild pulmonary edema
- Echocardiogram: reduced ejection fraction at 35%

HOSPITAL COURSE:
Patient was diagnosed with acute myocardial infarction and underwent emergent cardiac catheterization with percutaneous coronary intervention. A drug-eluting stent was placed in the right coronary artery.

DISCHARGE DIAGNOSES:
1. Acute myocardial infarction
2. Diabetes mellitus
3. Hypertension

DISCHARGE MEDICATIONS:
- Aspirin 81mg daily
- Clopidogrel 75mg daily
- Metoprolol 25mg twice daily
- Lisinopril 10mg daily
- Atorvastatin 80mg daily

DISCHARGE INSTRUCTIONS:
Follow up with cardiology in 1 week. Continue medications as prescribed. Return to ED if experiencing chest pain or shortness of breath.`

  // Sample suggestions with highlighted text
  const suggestions = [
    {
      id: 'S001',
      type: 'Specificity',
      priority: 'high',
      category: 'Diagnosis Specificity',
      description: 'Specify the type and location of myocardial infarction',
      originalText: 'Acute myocardial infarction',
      suggestedText: 'Acute ST-elevation myocardial infarction (STEMI), inferior wall',
      reasoning: 'The ECG shows ST elevation in leads II, III, aVF indicating inferior wall involvement. This specificity is important for proper ICD-10 coding and risk stratification.',
      revenueImpact: 1200,
      confidence: 0.92,
      status: 'pending',
      lineNumber: 45
    },
    {
      id: 'S002',
      type: 'Missing Diagnosis',
      priority: 'medium',
      category: 'Comorbidity Documentation',
      description: 'Document diabetes type and control status',
      originalText: 'Diabetes mellitus',
      suggestedText: 'Type 2 diabetes mellitus with diabetic complications, uncontrolled',
      reasoning: 'Patient has diabetes as comorbidity. Specifying type and control status affects severity of illness and risk of mortality calculations.',
      revenueImpact: 800,
      confidence: 0.85,
      status: 'pending',
      lineNumber: 52
    },
    {
      id: 'S003',
      type: 'Procedure Code',
      priority: 'high',
      category: 'Procedure Documentation',
      description: 'Add specific procedure details for PCI',
      originalText: 'percutaneous coronary intervention',
      suggestedText: 'percutaneous coronary intervention with drug-eluting stent placement, single vessel (right coronary artery)',
      reasoning: 'Specific documentation of stent type and vessel treated is required for accurate procedure coding and reimbursement.',
      revenueImpact: 400,
      confidence: 0.95,
      status: 'pending',
      lineNumber: 38
    }
  ]

  const handleAcceptSuggestion = (suggestionId) => {
    console.log('Accepting suggestion:', suggestionId)
    // Here you would typically update the suggestion status and send to backend
  }

  const handleRejectSuggestion = (suggestionId) => {
    console.log('Rejecting suggestion:', suggestionId)
    // Here you would typically update the suggestion status and send to backend
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const highlightText = (text, suggestions) => {
    let highlightedText = text
    suggestions.forEach((suggestion, index) => {
      const regex = new RegExp(`(${suggestion.originalText})`, 'gi')
      highlightedText = highlightedText.replace(
        regex,
        `<mark class="bg-yellow-200 cursor-pointer hover:bg-yellow-300" data-suggestion="${index}">$1</mark>`
      )
    })
    return highlightedText
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Queue
            </Button>
            <div>
              <h2 className="text-xl font-semibold">{note.noteType} Review</h2>
              <p className="text-sm text-muted-foreground">
                Patient: {note.patientName} ({note.patientId})
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getPriorityColor(note.priority)}>
              {note.priority} priority
            </Badge>
            <Badge variant="outline">
              {suggestions.length} suggestions
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Note Content */}
        <div className="flex-1 p-6">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Clinical Note</span>
              </CardTitle>
              <CardDescription>
                {note.department} • {note.admissionDate} to {note.dischargeDate}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div 
                  className="whitespace-pre-wrap font-mono text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: highlightText(noteContent, suggestions) 
                  }}
                />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Suggestions Panel */}
        <div className="w-96 border-l bg-gray-50 p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">CDI Suggestions</h3>
              <p className="text-sm text-muted-foreground">
                Review and act on AI-generated documentation improvements
              </p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <div>
                      <div className="text-sm font-medium">Total Impact</div>
                      <div className="text-lg font-bold text-green-600">
                        ${suggestions.reduce((sum, s) => sum + s.revenueImpact, 0)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <div>
                      <div className="text-sm font-medium">High Priority</div>
                      <div className="text-lg font-bold">
                        {suggestions.filter(s => s.priority === 'high').length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Suggestions List */}
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <Card 
                  key={suggestion.id} 
                  className={`cursor-pointer transition-all ${
                    selectedSuggestion === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedSuggestion(index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-sm">{suggestion.category}</CardTitle>
                        <CardDescription className="text-xs">
                          {suggestion.description}
                        </CardDescription>
                      </div>
                      <Badge className={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Original:</div>
                        <div className="text-sm bg-red-50 p-2 rounded border">
                          {suggestion.originalText}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-500 mb-1">Suggested:</div>
                        <div className="text-sm bg-green-50 p-2 rounded border">
                          {suggestion.suggestedText}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Revenue: +${suggestion.revenueImpact}</span>
                        <span>Confidence: {(suggestion.confidence * 100).toFixed(0)}%</span>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2 pt-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAcceptSuggestion(suggestion.id)
                          }}
                        >
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRejectSuggestion(suggestion.id)
                          }}
                        >
                          <ThumbsDown className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feedback Section */}
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Additional Comments</h4>
              <Textarea
                placeholder="Add any additional notes or feedback about this case..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-[80px]"
              />
              <Button className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Review
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

