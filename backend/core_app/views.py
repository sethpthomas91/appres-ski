from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ProfileSerializer, UserSerializer,UserSerializerWithToken, LocationSerializer, BoatSerializer, TripSerializer, ForecastSerializer
from rest_framework import viewsets
from .models import Location, Profile, Boat, Trip, Forecast


# the api_view decorator takes a list of HTTP methods that the view should respond to
@api_view(['GET'])
def current_user(request):
    # determine user by token and return their data
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    # create a new user. 

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# REST router viewsets

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

class BoatViewSet(viewsets.ModelViewSet):
    queryset = Boat.objects.all()
    serializer_class = BoatSerializer

class TripViewSet(viewsets.ModelViewSet):

    # This should filter the requests back based on who is logged in.
    def get_queryset(self):
        user = self.request.user.id
        profile = Profile.objects.get(user_id=user)
        return Trip.objects.filter(profile=profile)
    # queryset = Trip.objects.all()

    serializer_class = TripSerializer

class ForecastViewSet(viewsets.ModelViewSet):
    queryset = Forecast.objects.all()
    serializer_class = ForecastSerializer