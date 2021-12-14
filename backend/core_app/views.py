from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .serializers import UserSerializer,UserSerializerWithToken
from rest_framework.response import Response
from rest_framework import permissions, status


# the api_view decorator takes a list of HTTP methods that the view should respond to
@api_view(['GET'])
def current_user(request):
    # determine user by token and return their data
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserList(APIView):
    # create a new user. 

    perimission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)