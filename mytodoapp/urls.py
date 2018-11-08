from django.conf.urls import url, include
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from . import views
from tastypie.api import Api
from mytodoapp.api import TaskResource, FilteredResource, SubTaskResource, DeletedTaskResource

v1_api = Api(api_name='v1')
v1_api.register(TaskResource())
v1_api.register(FilteredResource())
v1_api.register(SubTaskResource())
v1_api.register(DeletedTaskResource())
# v1_api.register(AlertTaskResource())

urlpatterns = [
	url(r'^api/', include(v1_api.urls)),
	url('index', views.index, name='index')	
]

urlpatterns += staticfiles_urlpatterns()