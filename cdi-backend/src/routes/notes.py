from flask import Blueprint, request, jsonify
from src.models.note import db, Note, Suggestion
from datetime import datetime, date
import uuid

notes_bp = Blueprint('notes', __name__)

@notes_bp.route('/notes', methods=['GET'])
def get_notes():
    """Get all notes with optional filtering"""
    try:
        # Get query parameters
        status = request.args.get('status')
        priority = request.args.get('priority')
        department = request.args.get('department')
        search = request.args.get('search')
        
        # Build query
        query = Note.query
        
        if status and status != 'all':
            query = query.filter(Note.status == status)
        if priority and priority != 'all':
            query = query.filter(Note.priority == priority)
        if department and department != 'all':
            query = query.filter(Note.department == department)
        if search:
            query = query.filter(
                db.or_(
                    Note.patient_name.contains(search),
                    Note.patient_id.contains(search),
                    Note.note_type.contains(search)
                )
            )
        
        notes = query.order_by(Note.updated_at.desc()).all()
        return jsonify([note.to_dict() for note in notes])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/notes/<note_id>', methods=['GET'])
def get_note(note_id):
    """Get a specific note with its suggestions"""
    try:
        note = Note.query.get_or_404(note_id)
        note_data = note.to_dict()
        
        # Get suggestions for this note
        suggestions = Suggestion.query.filter_by(note_id=note_id).all()
        note_data['suggestions'] = [suggestion.to_dict() for suggestion in suggestions]
        
        return jsonify(note_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/notes', methods=['POST'])
def create_note():
    """Create a new clinical note"""
    try:
        data = request.get_json()
        
        note = Note(
            id=str(uuid.uuid4()),
            patient_id=data['patientId'],
            patient_name=data['patientName'],
            note_type=data['noteType'],
            department=data['department'],
            admission_date=datetime.strptime(data['admissionDate'], '%Y-%m-%d').date(),
            discharge_date=datetime.strptime(data['dischargeDate'], '%Y-%m-%d').date(),
            priority=data.get('priority', 'medium'),
            status=data.get('status', 'pending'),
            content=data['content'],
            assigned_to=data.get('assignedTo')
        )
        
        db.session.add(note)
        db.session.commit()
        
        return jsonify(note.to_dict()), 201
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/notes/<note_id>/suggestions', methods=['GET'])
def get_suggestions(note_id):
    """Get all suggestions for a specific note"""
    try:
        suggestions = Suggestion.query.filter_by(note_id=note_id).all()
        return jsonify([suggestion.to_dict() for suggestion in suggestions])
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/suggestions/<suggestion_id>/accept', methods=['POST'])
def accept_suggestion(suggestion_id):
    """Accept a suggestion"""
    try:
        suggestion = Suggestion.query.get_or_404(suggestion_id)
        suggestion.status = 'accepted'
        suggestion.updated_at = datetime.utcnow()
        
        # Add feedback if provided
        data = request.get_json()
        if data and 'feedback' in data:
            suggestion.feedback = data['feedback']
        
        db.session.commit()
        return jsonify(suggestion.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/suggestions/<suggestion_id>/reject', methods=['POST'])
def reject_suggestion(suggestion_id):
    """Reject a suggestion"""
    try:
        suggestion = Suggestion.query.get_or_404(suggestion_id)
        suggestion.status = 'rejected'
        suggestion.updated_at = datetime.utcnow()
        
        # Add feedback if provided
        data = request.get_json()
        if data and 'feedback' in data:
            suggestion.feedback = data['feedback']
        
        db.session.commit()
        return jsonify(suggestion.to_dict())
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/dashboard/metrics', methods=['GET'])
def get_dashboard_metrics():
    """Get dashboard metrics"""
    try:
        # Calculate key metrics
        total_notes = Note.query.count()
        pending_notes = Note.query.filter_by(status='pending').count()
        high_priority_notes = Note.query.filter_by(priority='high').count()
        
        # Calculate total potential revenue
        total_revenue = db.session.query(db.func.sum(Note.potential_revenue)).scalar() or 0
        
        # Calculate suggestion metrics
        total_suggestions = Suggestion.query.count()
        accepted_suggestions = Suggestion.query.filter_by(status='accepted').count()
        acceptance_rate = (accepted_suggestions / total_suggestions * 100) if total_suggestions > 0 else 0
        
        metrics = {
            'totalNotes': total_notes,
            'pendingNotes': pending_notes,
            'highPriorityNotes': high_priority_notes,
            'totalRevenue': total_revenue,
            'totalSuggestions': total_suggestions,
            'acceptedSuggestions': accepted_suggestions,
            'acceptanceRate': round(acceptance_rate, 1)
        }
        
        return jsonify(metrics)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/analytics/revenue-trend', methods=['GET'])
def get_revenue_trend():
    """Get revenue trend data for analytics"""
    try:
        # This would typically query actual data from the database
        # For demo purposes, returning sample data
        trend_data = [
            {'month': 'Jan', 'revenue': 45000, 'suggestions': 120},
            {'month': 'Feb', 'revenue': 52000, 'suggestions': 145},
            {'month': 'Mar', 'revenue': 48000, 'suggestions': 132},
            {'month': 'Apr', 'revenue': 61000, 'suggestions': 168},
            {'month': 'May', 'revenue': 55000, 'suggestions': 152},
            {'month': 'Jun', 'revenue': 67000, 'suggestions': 185}
        ]
        
        return jsonify(trend_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@notes_bp.route('/analytics/department-performance', methods=['GET'])
def get_department_performance():
    """Get department performance data"""
    try:
        # Sample data for demo
        performance_data = [
            {'department': 'Cardiology', 'revenue': 85000, 'suggestions': 245, 'acceptance': 82},
            {'department': 'Orthopedics', 'revenue': 72000, 'suggestions': 198, 'acceptance': 88},
            {'department': 'Emergency', 'revenue': 45000, 'suggestions': 156, 'acceptance': 75},
            {'department': 'Surgery', 'revenue': 98000, 'suggestions': 287, 'acceptance': 85},
            {'department': 'Internal Med', 'revenue': 56000, 'suggestions': 167, 'acceptance': 79}
        ]
        
        return jsonify(performance_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

