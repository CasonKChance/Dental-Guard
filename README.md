# Dental-Guard
Hacklytics 2024

Dental Guard aims to make oral healthcare more available worldwide by using image classification to detect mouth diseases from pictures.

Overview:
Dental Guard is a pioneering platform designed to revolutionize oral health assessment, particularly in regions with limited access to healthcare resources. Leveraging an advanced machine learning model, Dental Guard enables users to conduct real-time oral health assessments by simply taking live photos of their mouth using a smartphone or other mobile devices.
By empowering individuals to perform self-assessments and receive instant feedback on their oral health status, Dental Guard aims to democratize access to preventive dental care. This innovative platform not only promotes early detection and intervention but also educates users about proper oral hygiene practices, ultimately contributing to improved overall oral health outcomes in underserved communities.

Problem:
In many regions worldwide, access to oral healthcare resources is severely limited, with the World Health Organization (WHO) estimating that approximately 50% of the human population suffer from untreated oral diseases. The scarcity of dental care facilities means that large segments of the population lack regular access to dental check-ups and screenings. Consequently, many individuals remain unaware of developing oral health issues until they reach an advanced stage, leading to more severe complications. This lack of timely intervention exacerbates the burden of oral diseases and contributes to overall public health challenges, particularly in underserved communities where healthcare resources are scarce.

Solution:
Addressing this pressing issue, our project, Dental Guard, presents an innovative solution to democratize access to oral health assessments. By harnessing the power of advanced technology, Dental Guard empowers individuals to conduct real-time oral health assessments using nothing more than a smartphone or mobile device. These algorithms are programmed to detect potential signs of oral diseases, including calculus, hypodontia, gingivitis, caries, ulcers and tooth discoloration. Furthermore, Dental Guard serves as an educational tool, promoting awareness of proper oral hygiene practices and empowering users to prioritize their oral health. In doing so, Dental Guard contributes to long-term improvements in overall oral health outcomes, particularly in underserved communities.

Workflow:
At the heart of the Dental Guard solution is our advanced image classification machine learning model. To develop and train the machine learning image classification model for our platform, we followed a systematic approach:
Data Collection: We collected a diverse dataset of oral health images from various online databases, including images of healthy mouths and the oral diseases. 
Data Preprocessing: Before training the model, we preprocessed the collected images to ensure consistency and enhance the quality of the dataset.
Model Selection: We experimented with different machine learning models suitable for image classification tasks, such as Convolutional Neural Networks (CNNs). Considering the complexity of the task and the need for high accuracy, we selected a CNN architecture known for its effectiveness in image recognition tasks.
Model Architecture: We designed the architecture of our CNN model, which comprised multiple convolutional layers for feature extraction, followed by pooling layers for spatial downsampling and fully connected layers for classification.
Training Process: We divided our preprocessed dataset into training, validation, and test sets. We then trained the CNN model on the training data, using techniques such as backpropagation and gradient descent to minimize the loss function and update the model parameters iteratively. During training, we monitored the model's performance on the validation set to prevent overfitting and ensure generalization to unseen data.
Hyperparameter Tuning: We fine-tuned the hyperparameters of the model, such as learning rate, batch size, and dropout rate, through experimentation and validation to optimize performance and convergence speed.
Evaluation and Validation: Once training was complete, we evaluated the trained model's performance on the test set to assess its accuracy, precision, recall, and other relevant metrics. We also conducted cross-validation and assessed the model's robustness to variations in input data.
Iterative Refinement: Based on the evaluation results, we iteratively refined the model by adjusting parameters, augmenting the dataset, or modifying the architecture as needed to improve performance and address any identified shortcomings.


Through this rigorous process of data collection, preprocessing, model selection, training, and evaluation, we developed a robust machine learning image classification model that accomplished our goal.


Technologies:
In our project, we utilized a convolutional neural network (CNN) for image classification, enabling accurate diagnosis of various oral health conditions from live photos using Python. For the frontend, we developed an interactive full-stack website using the React framework, providing users with a seamless and intuitive interface for capturing and uploading images. On the backend, we employed Express.js and Node.js to handle server-side logic and API requests, ensuring efficient communication between the frontend and machine learning model for real-time analysis and feedback delivery. 

Challenges Faced:
The largest problem that we encountered during this project was the availability of data. When working with medical data, HIPA will always be an issue, this specifically makes it difficult for the creation of large data sets involving dental imagery. Additionally, since none of us are licensed dentists, we do not have the ability to make diagnostics or any inferences regarding un categorized images. This was especially difficult for finding our control group of healthy teeth. All of the data that we found online, specifically labeled image datasets, revolved around the labeling of oral conditions. This caused us to eventually have to scrape together our own control group of images which was significantly smaller than what we would have liked. We feel that this ultimately is not a massive issue as it might just lead to more false positives, which is what we would prefer over false negatives. 

Another problem that we faced was in the time spent training our model. Due to the time consuming process of harvesting our data to train our model on, we were not able to actually start training until later. Our first attempt led to 3 hours of training which ended in a file path error stopping the process. Eventually we decided to call in the big guns and use Google Collab’s advanced GPU package to get more computing power. This allowed us to train our model in the time span and still be able to keep the accuracy due to the number of epochs that we ran.

Future Improvements:
In future iterations of our project, focus will be directed towards enhancing diagnostic capabilities by refining and expanding the machine learning model to accurately diagnose a broader range of oral health conditions with higher precision. This involves continuous optimization of the model's parameters and exploration of advanced deep learning techniques. Additionally, the implementation of multi-language support will cater to diverse user populations, ensuring accessibility for individuals from different linguistic backgrounds through language detection algorithms and interfaces available in multiple languages, thereby fostering inclusivity and widening the reach of our platform.

Conclusion:
In conclusion, Dental Guard represents a significant stride towards democratizing access to oral health assessments and promoting preventive care, particularly in underserved communities. Through the collaborative efforts of our team, we've developed an innovative platform powered by advanced machine learning algorithms, providing users with the ability to conduct real-time oral health assessments using their smartphones. We extend our sincere gratitude to Data Science @ GT and MLH for organizing this hackathon and providing us with the opportunity to showcase our solution. Additionally, we would like to express our appreciation to all the sponsors whose support has been instrumental in making this event possible.
