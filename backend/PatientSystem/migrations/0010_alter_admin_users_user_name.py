# Generated by Django 5.0.6 on 2024-07-27 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PatientSystem', '0009_admin_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='admin_users',
            name='user_name',
            field=models.CharField(max_length=100),
        ),
    ]
