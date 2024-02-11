import sys
import torch
import torch.nn as nn
import timm
from PIL import Image
from torchvision import transforms
import torch.nn.functional as F
import json

class InceptionResNetV2(nn.Module):
    def __init__(self, num_classes=6):
        super(InceptionResNetV2, self).__init__()
        self.model = timm.create_model('inception_resnet_v2', pretrained=True)
        in_features = self.model.classif.in_features
        self.model.classif = nn.Linear(in_features, num_classes)

    def forward(self, x):
        return self.model(x)

# Load the model
model = InceptionResNetV2(num_classes=6)  # Replace with your actual model class
model.load_state_dict(torch.load('../AI Model/crossVIT_transformer_oral_disease_classifier.pth'))
model.eval()

# Define transforms (update these to match your model's requirements)
transform = transforms.Compose([
    transforms.Resize((299, 299)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

diseases = [
    "Ulcers",  # index 0
    "Hypodontia",  # index 1
    "Healthy",    # index 2
    "Gingivitis",  # index 3
    "Caries",  # index 4
    "Tooth Discoloration",  # index 5
    "Calculus"  # index 6
]

# Load and preprocess the image
image_path = sys.argv[1]  # Image path passed as an argument
image = Image.open(image_path).convert('RGB')
image = transform(image)
image = image.unsqueeze(0)  # Add batch dimension

# Perform inference
with torch.no_grad():
    outputs = model(image)
    probabilities = F.softmax(outputs, dim=1)  # Convert logits to probabilities
    max_prob, predicted = torch.max(probabilities, 1)  # Get the max probability and predicted class
    predicted_disease = diseases[predicted.item()]
    confidence = round(max_prob.item(), 2)  # Confidence level of the prediction

# Print the classification result with the disease name and confidence
print(json.dumps({'classification': predicted_disease, 'confidence_level': confidence}))