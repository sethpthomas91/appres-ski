from django.urls.conf import path
from rest_framework import routers
from .views import ProfileViewSet, TripViewSet, current_user, UserList, LocationViewSet, BoatViewSet, ForecastViewSet
from rest_framework.routers import DefaultRouter


# create router for the views
router = DefaultRouter()
router.register(r'locations', LocationViewSet, basename='locations' )
router.register(r'profiles', ProfileViewSet, basename='profiles' )
router.register(r'boats', BoatViewSet, basename='boats' )
router.register(r'trips', TripViewSet, basename='trips' )
router.register(r'forecasts', ForecastViewSet, basename='forecasts' )


urlpatterns = [
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]

# adds all of our urls together/custom and rest framework
urlpatterns += router.urls