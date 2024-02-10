import os
import json
json_file = "training-images.json"
images_data = []
def add_data(folder_name):
    image_directory = os.getcwd()+"\mouth-images" + "\\" + folder_name
    for file_name in os.listdir(image_directory):
        full_path = os.path.join(image_directory, file_name)
        description = folder_name.title()
        images_data.append({'path': full_path, 'description': description})
add_data("calculus")
add_data("Gingivitis")
add_data("Data caries")
add_data("Tooth Discoloration")
add_data("hypodontia")
with open(json_file, 'w') as json_file:
    json.dump(images_data, json_file, indent=4)