from django.utils.deconstruct import deconstructible

import os



@deconstructible
class VideoPathAndRename(object):
    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]  # Extract the file extension
        # Define the filename using the instance attributes and the extracted extension
        filename = f'{instance.template_name}_{instance.patient_name}_{instance.patient_UHID_No}_{str(instance.created).split()[0]}.{ext}'
        # Return the whole path to the file
        return os.path.join(self.sub_path, filename)
    