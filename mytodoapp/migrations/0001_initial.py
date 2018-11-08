# Generated by Django 2.1.2 on 2018-10-29 21:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.TextField()),
                ('due_date', models.DateField()),
                ('status', models.CharField(max_length=10)),
                ('deleted', models.BooleanField(default=False)),
                ('deletion_date', models.DateField(null=True)),
                ('parent', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='subtasks', to='mytodoapp.Task')),
            ],
        ),
    ]