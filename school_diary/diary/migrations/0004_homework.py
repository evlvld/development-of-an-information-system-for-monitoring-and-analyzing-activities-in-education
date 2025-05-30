# Generated by Django 5.2 on 2025-05-14 12:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diary', '0003_alter_attendance_unique_together_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Homework',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('due_date', models.DateField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('class_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.class')),
                ('lesson', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.lesson')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='diary.teacher')),
            ],
        ),
    ]
