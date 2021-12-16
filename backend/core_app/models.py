from django.db import models
from django.db.models.deletion import CASCADE
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=CASCADE)

    def __str__(self):
        return f'ID: {self.id} User: {self.user}'

class Location(models.Model):
    location_name = models.CharField(max_length=255)
    longitude = models.CharField(max_length=8)
    latitude = models.CharField(max_length=8)

    def __str__(self):
        return f'Location ID: {self.id} Name: {self.location_name}'

class Boat(models.Model):
    boat_name = models.CharField(max_length=255)
    owner = models.ForeignKey(Profile, on_delete=CASCADE, related_name='boats')

    def __str__(self):
        return f'Boat ID: {self.id} Name: {self.boat_name} Owner: {self.owner}'

class Trip(models.Model):
    trip_name = models.CharField(max_length=255)
    boat = models.ForeignKey(Boat, on_delete=CASCADE, related_name='trips')
    trip_date = models.DateField()
    profile = models.ForeignKey(Profile, on_delete=CASCADE, related_name='trips')
    location = models.ForeignKey(Location, on_delete=CASCADE, related_name='trips')
    description = models.TextField()

    def __str__(self):
        return f'Trip ID: {self.id} Date: {self.trip_date} Name: {self.trip_name}'


class Forecast(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='forecast')
    sunrise = models.CharField(max_length=100)
    sunset = models.CharField(max_length=100)
    maxwind = models.CharField(max_length=10)
    minwind = models.CharField(max_length=10)
    avgtemp = models.CharField(max_length=10)

    def __str__(self):
        return f'Forecast ID: {self.id} Trip: {self.trip.trip_name}'
    


