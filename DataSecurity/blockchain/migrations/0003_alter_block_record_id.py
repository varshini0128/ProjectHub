# Generated by Django 5.2 on 2025-05-02 04:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blockchain', '0002_alter_block_record_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='block',
            name='record_id',
            field=models.UUIDField(blank=True),
        ),
    ]
