from django import template

register = template.Library()

@register.filter
def filter_schedule(schedules, day):
    return schedules.filter(day_of_week=day)

@register.filter
def filter_lesson(schedules, lesson):
    return schedules.filter(lesson_number=lesson).first()

@register.filter
def get_item(dictionary, key):
    return dictionary.get(int(key)) 