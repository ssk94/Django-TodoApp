from tastypie.resources import ModelResource, ALL, ALL_WITH_RELATIONS
from tastypie import fields
from mytodoapp.custom_filter import ModelResourceCustom, duedate_range_filter
from tastypie.authorization import Authorization, DjangoAuthorization
from mytodoapp.models import Task
from datetime import datetime

class TaskResource(ModelResource):
	parent = fields.ForeignKey('mytodoapp.api.TaskResource', attribute = 'parent', null=True, full=True)
	class Meta:
		queryset = Task.objects.exclude(deleted=True).order_by('due_date')
		allowed_methods = ['get', 'post', 'put']
		resource_name = 'task'
		authorization = Authorization()
		filtering = {
			'due_date': ['exact', 'lt', 'lte', 'gte', 'gt'],
			'title': ALL
		}
		ordering = ['due_date']

class FilteredResource(ModelResourceCustom):
	class Meta:
		queryset = Task.objects.exclude(deleted=True)
		allowed_methods = ['get']
		resource_name = 'filter'
		filtering = {
			"during": ALL,
		}
		custom_filters = duedate_range_filter
		ordering = ['due_date']

class SubTaskResource(ModelResource):
	subtasks = fields.ToManyField('mytodoapp.api.TaskResource', attribute=lambda bundle: Task.objects.filter(parent=bundle.obj, deleted=False), null=True, blank=True, full=True)
	class Meta:
		queryset = Task.objects.exclude(deleted=True)
		allowed_methods = ['get']
		resource_name = 'subtasks'
		filtering = {
			"subtasks": ALL_WITH_RELATIONS
		}
		ordering = ['due_date']

class DeletedTaskResource(ModelResource):
	class Meta:
		queryset = Task.objects.exclude(deleted=False)
		allowed_methods = ['get', 'delete']
		resource_name = 'deleted'
		authorization = Authorization()
		filtering = {
			"deletion_date": ['exact', 'lt', 'lte', 'gte', 'gt'],
		}
		ordering = ['due_date']


# class AlertTaskResource(ModelResource):
# 	class Meta:
# 		queryset = Task.objects.all()
# 		allowed_methods = ['get', 'delete']
# 		resource_name = 'alert'

# 	def get_object_list(self, request):
# 		due_task = []
# 		current_datetime = datetime.now()
# 		qs = super().get_object_list(request)
# 		for task in qs:
# 			new_date = datetime.strptime(datetime.strftime(task.due_date, "%Y-%m-%d %H-%M-%S"), "%Y-%m-%d %H-%M-%S")

# 			diff = new_date-current_datetime
# 			if diff.total_seconds()/3600 <= 1.0:
# 				due_task.append(task.id)
# 		return qs.filter(id__in=due_task)