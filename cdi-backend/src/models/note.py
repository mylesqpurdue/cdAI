from src.models.user import db
from datetime import datetime
import json

class Note(db.Model):
    __tablename__ = 'notes'
    
    id = db.Column(db.String(50), primary_key=True)
    patient_id = db.Column(db.String(50), nullable=False)
    patient_name = db.Column(db.String(100), nullable=False)
    note_type = db.Column(db.String(50), nullable=False)
    department = db.Column(db.String(50), nullable=False)
    admission_date = db.Column(db.Date, nullable=False)
    discharge_date = db.Column(db.Date, nullable=False)
    priority = db.Column(db.String(20), nullable=False, default='medium')
    status = db.Column(db.String(20), nullable=False, default='pending')
    content = db.Column(db.Text, nullable=False)
    suggestions_count = db.Column(db.Integer, default=0)
    potential_revenue = db.Column(db.Float, default=0.0)
    assigned_to = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with suggestions
    suggestions = db.relationship('Suggestion', backref='note', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        return {
            'id': self.id,
            'patientId': self.patient_id,
            'patientName': self.patient_name,
            'noteType': self.note_type,
            'department': self.department,
            'admissionDate': self.admission_date.isoformat() if self.admission_date else None,
            'dischargeDate': self.discharge_date.isoformat() if self.discharge_date else None,
            'priority': self.priority,
            'status': self.status,
            'content': self.content,
            'suggestionsCount': self.suggestions_count,
            'potentialRevenue': self.potential_revenue,
            'assignedTo': self.assigned_to,
            'lastUpdated': self.updated_at.strftime('%H:%M:%S') if self.updated_at else None
        }

class Suggestion(db.Model):
    __tablename__ = 'suggestions'
    
    id = db.Column(db.String(50), primary_key=True)
    note_id = db.Column(db.String(50), db.ForeignKey('notes.id'), nullable=False)
    type = db.Column(db.String(50), nullable=False)
    priority = db.Column(db.String(20), nullable=False, default='medium')
    category = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    original_text = db.Column(db.Text, nullable=False)
    suggested_text = db.Column(db.Text, nullable=False)
    reasoning = db.Column(db.Text, nullable=False)
    revenue_impact = db.Column(db.Float, default=0.0)
    confidence = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(20), nullable=False, default='pending')
    line_number = db.Column(db.Integer)
    feedback = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'noteId': self.note_id,
            'type': self.type,
            'priority': self.priority,
            'category': self.category,
            'description': self.description,
            'originalText': self.original_text,
            'suggestedText': self.suggested_text,
            'reasoning': self.reasoning,
            'revenueImpact': self.revenue_impact,
            'confidence': self.confidence,
            'status': self.status,
            'lineNumber': self.line_number,
            'feedback': self.feedback
        }

class Analytics(db.Model):
    __tablename__ = 'analytics'
    
    id = db.Column(db.Integer, primary_key=True)
    metric_name = db.Column(db.String(100), nullable=False)
    metric_value = db.Column(db.Float, nullable=False)
    metric_date = db.Column(db.Date, nullable=False)
    department = db.Column(db.String(50))
    user_id = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'metricName': self.metric_name,
            'metricValue': self.metric_value,
            'metricDate': self.metric_date.isoformat() if self.metric_date else None,
            'department': self.department,
            'userId': self.user_id
        }

