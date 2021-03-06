# Generated by Django 2.0.3 on 2018-07-02 16:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dapps', '0003_contract_created_at'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='compiler_optimization',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='contract',
            name='compiler_version',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='contract',
            name='contract_name',
            field=models.CharField(default='', max_length=200),
        ),
        migrations.AddField(
            model_name='contract',
            name='deploy_price',
            field=models.DecimalField(decimal_places=18, default=0, max_digits=30),
        ),
    ]
