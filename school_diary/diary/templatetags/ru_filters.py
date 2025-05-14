from django import template

register = template.Library()

WEEKDAYS_RU = {
    'Monday': 'Понедельник',
    'Tuesday': 'Вторник',
    'Wednesday': 'Среда',
    'Thursday': 'Четверг',
    'Friday': 'Пятница',
    'Saturday': 'Суббота',
    'Sunday': 'Воскресенье',
}

@register.filter
def ru_weekday(value):
    return WEEKDAYS_RU.get(value, value) 