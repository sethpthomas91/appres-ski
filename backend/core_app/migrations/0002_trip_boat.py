# Generated by Django 3.2.9 on 2021-12-15 17:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core_app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='boat',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='trips', to='core_app.boat'),
            preserve_default=False,
        ),
    ]
