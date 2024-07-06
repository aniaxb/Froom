import logging
import os

import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from datetime import datetime


MODEL_PATH = 'fashion_mnist_model.h5'
TEMP_IMAGE_PATH = 'TEMP'
logger = logging.getLogger(__name__)

try:
    model = load_model(MODEL_PATH)
except (OSError, ImportError):
    logger.debug("Model not found. Download and save the model.")
    raise Exception("Model not found. Download and save the model.")


class CategoryDetection:
    @staticmethod
    def detect_category(file):
        img_rows, img_cols = 28, 28
        image_path = TEMP_IMAGE_PATH + datetime.now().strftime("%Y%m%d-%H%M%S") + ".jpg"
        file.save(image_path)
        logger.info("Image saved to %s", image_path)

        # Load and preprocess the input image
        img = image.load_img(image_path, target_size=(img_rows, img_cols), color_mode="grayscale")
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array /= 255.0

        predictions = model.predict(img_array)
        class_index = np.argmax(predictions)
        os.remove(image_path)
        logger.info("Image removed from %s", image_path)

        # Map the class index to the corresponding label
        class_labels = [
            "TShirt", "Trouser", "Pullover", "Dress", "Coat",
            "Sandal", "Shirt", "Sneaker", "Bag", "Ankle boot"
        ]

        # Decode and print the top predicted label
        predicted_label = class_labels[class_index]
        confidence = predictions[0, class_index] * 100
        logger.info("Predicted category: %s", predicted_label)
        logger.info("Confidence: %s", confidence)

        return predicted_label, confidence
