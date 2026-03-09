from django.db import models


class SkillCategory(models.Model):
    name = models.CharField(max_length=80)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Skill Category'
        verbose_name_plural = 'Skill Categories'

    def __str__(self):
        return self.name
    
class Skill(models.Model):
    PROFICIENCY_CHOICE = [
        (1, 'Familiar'), (2, 'Competent'), (3, 'Proficient'),
        (4, 'Advanced'), (5, 'Expert'),
    ]
    category     = models.ForeignKey(SkillCategory, on_delete=models.CASCADE, related_name='skills')
    name = models.CharField(max_length=80)
    proficiency  = models.PositiveSmallIntegerField(choices=PROFICIENCY_CHOICE, default=3)
    icon_name    = models.CharField(max_length=50, blank=True)
    order        = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['category__order', 'order', 'name']

    def __str__(self):
        return f'{self.category.name}' - {self.name}
    