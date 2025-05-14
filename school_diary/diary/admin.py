from django.contrib import admin
from .models import Teacher, Student, Class, Homework

# Register your models here.
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Class)
admin.site.register(Homework)
