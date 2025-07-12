from flask import Blueprint
from src.models.note import db, Note, Suggestion
from datetime import datetime, date
import uuid

seed_bp = Blueprint('seed', __name__)

@seed_bp.route('/seed-data', methods=['POST'])
def seed_data():
    """Seed the database with sample data for demo purposes"""
    try:
        # Clear existing data
        Suggestion.query.delete()
        Note.query.delete()
        
        # Sample notes data
        notes_data = [
            {
                'id': 'N001',
                'patient_id': 'P12847',
                'patient_name': 'Sarah Johnson',
                'note_type': 'Discharge Summary',
                'department': 'Cardiology',
                'admission_date': date(2024, 6, 15),
                'discharge_date': date(2024, 6, 18),
                'priority': 'high',
                'status': 'pending',
                'content': '''DISCHARGE SUMMARY

Patient: Sarah Johnson
MRN: P12847
Admission Date: 2024-06-15
Discharge Date: 2024-06-18
Department: Cardiology

CHIEF COMPLAINT:
Chest pain and shortness of breath

HISTORY OF PRESENT ILLNESS:
The patient is a 65-year-old female with a history of hypertension and diabetes who presented to the emergency department with acute onset chest pain and dyspnea. The pain was described as crushing, substernal, radiating to the left arm.

PAST MEDICAL HISTORY:
- Hypertension
- Diabetes mellitus
- Hyperlipidemia

PHYSICAL EXAMINATION:
Vital signs stable. Cardiovascular examination revealed regular rate and rhythm with no murmurs.

DIAGNOSTIC STUDIES:
- ECG: ST elevation in leads II, III, aVF
- Troponin I: elevated at 15.2 ng/mL
- Chest X-ray: mild pulmonary edema

HOSPITAL COURSE:
Patient was diagnosed with acute myocardial infarction and underwent emergent cardiac catheterization with percutaneous coronary intervention.

DISCHARGE DIAGNOSES:
1. Acute myocardial infarction
2. Diabetes mellitus
3. Hypertension

DISCHARGE MEDICATIONS:
- Aspirin 81mg daily
- Clopidogrel 75mg daily
- Metoprolol 25mg twice daily''',
                'suggestions_count': 3,
                'potential_revenue': 2400,
                'assigned_to': 'Dr. Smith'
            },
            {
                'id': 'N002',
                'patient_id': 'P12848',
                'patient_name': 'Michael Chen',
                'note_type': 'Operative Report',
                'department': 'Orthopedics',
                'admission_date': date(2024, 6, 16),
                'discharge_date': date(2024, 6, 17),
                'priority': 'medium',
                'status': 'in-review',
                'content': '''OPERATIVE REPORT

Patient: Michael Chen
MRN: P12848
Date of Surgery: 2024-06-16
Department: Orthopedics

PREOPERATIVE DIAGNOSIS:
Fracture of the right femur

POSTOPERATIVE DIAGNOSIS:
Fracture of the right femur, status post open reduction and internal fixation

PROCEDURE PERFORMED:
Open reduction and internal fixation of right femur fracture

OPERATIVE FINDINGS:
Comminuted fracture of the mid-shaft right femur with significant displacement.

PROCEDURE:
The patient was positioned supine on the operating table. A lateral approach was used to expose the fracture site. The fracture was reduced and stabilized with an intramedullary nail.

COMPLICATIONS:
None

ESTIMATED BLOOD LOSS:
200 mL''',
                'suggestions_count': 2,
                'potential_revenue': 1800,
                'assigned_to': 'Dr. Johnson'
            },
            {
                'id': 'N003',
                'patient_id': 'P12849',
                'patient_name': 'Emily Davis',
                'note_type': 'Progress Note',
                'department': 'Internal Medicine',
                'admission_date': date(2024, 6, 14),
                'discharge_date': date(2024, 6, 19),
                'priority': 'low',
                'status': 'completed',
                'content': '''PROGRESS NOTE

Patient: Emily Davis
MRN: P12849
Date: 2024-06-17
Department: Internal Medicine

SUBJECTIVE:
Patient reports feeling better today. Decreased shortness of breath and improved appetite.

OBJECTIVE:
Vital signs stable. Temperature 98.6°F, BP 120/80, HR 72, RR 16, O2 sat 98% on room air.

ASSESSMENT AND PLAN:
1. Pneumonia - improving on antibiotic therapy
2. Continue current medications
3. Plan for discharge tomorrow if continues to improve''',
                'suggestions_count': 1,
                'potential_revenue': 600,
                'assigned_to': 'Dr. Wilson'
            },
            {
                'id': 'N004',
                'patient_id': 'P12850',
                'patient_name': 'Robert Brown',
                'note_type': 'Consultation Note',
                'department': 'Emergency',
                'admission_date': date(2024, 6, 17),
                'discharge_date': date(2024, 6, 17),
                'priority': 'high',
                'status': 'pending',
                'content': '''EMERGENCY CONSULTATION

Patient: Robert Brown
MRN: P12850
Date: 2024-06-17
Department: Emergency

CHIEF COMPLAINT:
Severe abdominal pain

HISTORY OF PRESENT ILLNESS:
72-year-old male presents with sudden onset severe abdominal pain, nausea, and vomiting.

PHYSICAL EXAMINATION:
Abdomen tender with guarding and rebound tenderness.

DIAGNOSTIC STUDIES:
CT scan shows signs of bowel obstruction.

ASSESSMENT:
Small bowel obstruction, likely adhesive

PLAN:
Surgical consultation, NPO, IV fluids''',
                'suggestions_count': 4,
                'potential_revenue': 3200,
                'assigned_to': 'Dr. Anderson'
            },
            {
                'id': 'N005',
                'patient_id': 'P12851',
                'patient_name': 'Lisa Wilson',
                'note_type': 'Discharge Summary',
                'department': 'Surgery',
                'admission_date': date(2024, 6, 13),
                'discharge_date': date(2024, 6, 16),
                'priority': 'medium',
                'status': 'pending',
                'content': '''DISCHARGE SUMMARY

Patient: Lisa Wilson
MRN: P12851
Admission Date: 2024-06-13
Discharge Date: 2024-06-16
Department: Surgery

CHIEF COMPLAINT:
Acute appendicitis

HOSPITAL COURSE:
Patient underwent laparoscopic appendectomy without complications.

DISCHARGE DIAGNOSES:
1. Acute appendicitis, status post laparoscopic appendectomy
2. Post-operative pain

DISCHARGE MEDICATIONS:
- Ibuprofen 600mg every 6 hours as needed for pain
- Follow up with surgery in 2 weeks''',
                'suggestions_count': 2,
                'potential_revenue': 1500,
                'assigned_to': 'Dr. Taylor'
            }
        ]
        
        # Create notes
        for note_data in notes_data:
            note = Note(**note_data)
            db.session.add(note)
        
        # Sample suggestions data
        suggestions_data = [
            {
                'id': 'S001',
                'note_id': 'N001',
                'type': 'Specificity',
                'priority': 'high',
                'category': 'Diagnosis Specificity',
                'description': 'Specify the type and location of myocardial infarction',
                'original_text': 'Acute myocardial infarction',
                'suggested_text': 'Acute ST-elevation myocardial infarction (STEMI), inferior wall',
                'reasoning': 'The ECG shows ST elevation in leads II, III, aVF indicating inferior wall involvement.',
                'revenue_impact': 1200,
                'confidence': 0.92,
                'status': 'pending',
                'line_number': 45
            },
            {
                'id': 'S002',
                'note_id': 'N001',
                'type': 'Missing Diagnosis',
                'priority': 'medium',
                'category': 'Comorbidity Documentation',
                'description': 'Document diabetes type and control status',
                'original_text': 'Diabetes mellitus',
                'suggested_text': 'Type 2 diabetes mellitus with diabetic complications, uncontrolled',
                'reasoning': 'Specifying type and control status affects severity calculations.',
                'revenue_impact': 800,
                'confidence': 0.85,
                'status': 'pending',
                'line_number': 52
            },
            {
                'id': 'S003',
                'note_id': 'N001',
                'type': 'Procedure Code',
                'priority': 'high',
                'category': 'Procedure Documentation',
                'description': 'Add specific procedure details for PCI',
                'original_text': 'percutaneous coronary intervention',
                'suggested_text': 'percutaneous coronary intervention with drug-eluting stent placement',
                'reasoning': 'Specific documentation required for accurate procedure coding.',
                'revenue_impact': 400,
                'confidence': 0.95,
                'status': 'pending',
                'line_number': 38
            },
            {
                'id': 'S004',
                'note_id': 'N002',
                'type': 'Specificity',
                'priority': 'medium',
                'category': 'Fracture Classification',
                'description': 'Specify fracture type and classification',
                'original_text': 'Fracture of the right femur',
                'suggested_text': 'Closed comminuted fracture of right femur shaft (AO/OTA 32-A3)',
                'reasoning': 'Detailed fracture classification improves coding accuracy.',
                'revenue_impact': 900,
                'confidence': 0.88,
                'status': 'pending',
                'line_number': 12
            },
            {
                'id': 'S005',
                'note_id': 'N002',
                'type': 'Procedure Code',
                'priority': 'high',
                'category': 'Surgical Procedure',
                'description': 'Specify surgical approach and hardware used',
                'original_text': 'Open reduction and internal fixation',
                'suggested_text': 'Open reduction and internal fixation with intramedullary nail insertion',
                'reasoning': 'Hardware specification affects procedure coding and reimbursement.',
                'revenue_impact': 900,
                'confidence': 0.93,
                'status': 'pending',
                'line_number': 25
            }
        ]
        
        # Create suggestions
        for suggestion_data in suggestions_data:
            suggestion = Suggestion(**suggestion_data)
            db.session.add(suggestion)
        
        db.session.commit()
        
        return {'message': 'Sample data created successfully'}, 201
    
    except Exception as e:
        db.session.rollback()
        return {'error': str(e)}, 500

