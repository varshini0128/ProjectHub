from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from .models import Patient, Hospital, SecurityQuestion, MedicalRecord

class SecurityQuestionResetForm(forms.Form):
    """Form for resetting password using security question"""
    username = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'class': 'form-control'}))
    security_answer = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control'}))
    new_password = forms.CharField(
        label='New Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[validate_password]
    )
    confirm_password = forms.CharField(
        label='Confirm New Password',
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if new_password and confirm_password and new_password != confirm_password:
            self.add_error('confirm_password', "Passwords don't match.")
        
        return cleaned_data

class PatientRegistrationForm(forms.Form):
    """Form for patient registration"""
    username = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'class': 'form-control'}))
    password = forms.CharField(
        label='Password', 
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[validate_password]
    )
    confirm_password = forms.CharField(
        label='Confirm Password', 
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )
    full_name = forms.CharField(max_length=100, widget=forms.TextInput(attrs={'class': 'form-control'}))
    date_of_birth = forms.DateField(
        widget=forms.DateInput(attrs={'class': 'form-control', 'type': 'date'})
    )
    phone_number = forms.CharField(max_length=20, widget=forms.TextInput(attrs={'class': 'form-control'}))
    address = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    problem = forms.CharField(
        label='Medical Condition/Disease',
        widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3})
    )
    hospital = forms.ModelChoiceField(
        queryset=Hospital.objects.all(),
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Select Hospital',
        empty_label='Choose your hospital'
    )
    security_question = forms.ModelChoiceField(
        queryset=SecurityQuestion.objects.filter(user_type='patient'),
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    security_answer = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control'}))
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("This email is already in use.")
        return username
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords don't match.")
        
        return cleaned_data


class HospitalRegistrationForm(forms.Form):
    """Form for hospital registration"""
    username = forms.EmailField(label='Email', widget=forms.EmailInput(attrs={'class': 'form-control'}))
    password = forms.CharField(
        label='Password', 
        widget=forms.PasswordInput(attrs={'class': 'form-control'}),
        validators=[validate_password]
    )
    confirm_password = forms.CharField(
        label='Confirm Password', 
        widget=forms.PasswordInput(attrs={'class': 'form-control'})
    )
    hospital_name = forms.CharField(max_length=200, widget=forms.TextInput(attrs={'class': 'form-control'}))
    license_number = forms.CharField(max_length=50, widget=forms.TextInput(attrs={'class': 'form-control'}))
    address = forms.CharField(widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    website = forms.URLField(required=False, widget=forms.URLInput(attrs={'class': 'form-control'}))
    security_question = forms.ModelChoiceField(
        queryset=SecurityQuestion.objects.filter(user_type='hospital'),
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    security_answer = forms.CharField(max_length=255, widget=forms.TextInput(attrs={'class': 'form-control'}))
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("This email is already in use.")
        return username
    
    def clean_license_number(self):
        license_number = self.cleaned_data.get('license_number')
        if Hospital.objects.filter(license_number=license_number).exists():
            raise forms.ValidationError("This license number is already registered.")
        return license_number
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords don't match.")
        
        return cleaned_data


class PatientUpdateForm(forms.ModelForm):
    """Form for updating patient profile"""
    class Meta:
        model = Patient
        fields = ['full_name', 'phone_number', 'address', 'problem']
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),
            'phone_number': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'problem': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }


class HospitalUpdateForm(forms.ModelForm):
    """Form for updating hospital profile"""
    class Meta:
        model = Hospital
        fields = ['hospital_name', 'address', 'website']
        widgets = {
            'hospital_name': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'website': forms.URLInput(attrs={'class': 'form-control'}),
        }


class PatientSearchForm(forms.Form):
    """Form for searching patients"""
    patient_id = forms.CharField(
        required=False, 
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Search by ID'})
    )
    patient_name = forms.CharField(
        required=False, 
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Search by name'})
    )
    problem = forms.CharField(
        required=False, 
        widget=forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Search by medical condition'})
    )


class MedicalRecordForm(forms.ModelForm):
    """Form for creating/updating medical records"""
    class Meta:
        model = MedicalRecord
        fields = ['diagnosis', 'treatment', 'notes']
        widgets = {
            'diagnosis': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'treatment': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'notes': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
        }