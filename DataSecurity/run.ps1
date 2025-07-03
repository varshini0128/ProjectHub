# run.ps1

Write-Host "Setting up Django project..."
python manage.py makemigrations patients
python manage.py makemigrations blockchain
python manage.py migrate

Write-Host "Creating superuser..."
python manage.py shell -c "from django.contrib.auth.models import User; User.objects.filter(username='admin').exists() or User.objects.create_superuser('admin', 'admin@example.com', 'admin123')"

Write-Host "Loading initial data..."
python data.py

Write-Host "Starting development server..."
python manage.py runserver 0.0.0.0:8000
