import asyncio
import base64
import logging
import os

from flask import Blueprint, jsonify, request

from background.background_removal import remove_background
from category.category_detection import detect_category
from color.color_detection import detect_colors

api = Blueprint('api', __name__)
logger = logging.getLogger(__name__)


@api.route('/extractColor', methods=['POST'])
async def background_and_color():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']

    # Create remove background and predict category tasks
    remove_background_task = asyncio.create_task(remove_background(image))

    processed_image_info = await remove_background_task

    if 'error' in processed_image_info:
        return jsonify(processed_image_info), 500

    # Call detect_colors function for image with removed background
    colors = detect_colors(processed_image_info['output_image'])

    # Read the processed image data
    with open(processed_image_info['output_image'], 'rb') as f:
        image_data = f.read()

    # Encode the image data as base64
    encoded_image_data = base64.b64encode(image_data).decode('utf-8')

    # Remove the output image file
    os.remove(processed_image_info['output_image'])

    return jsonify({
        'colors': colors,
        'image': encoded_image_data
    })


@api.route('/predictCategory', methods=['POST'])
def predict():
    if 'image' not in request.files:
        logger.error('No image part')
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']

    predicted_label, confidence = detect_category(image_file)

    # Check if prediction is successful
    if predicted_label is not None and confidence is not None:
        return jsonify({
            'category': predicted_label,
            'confidence': confidence
        })
    else:
        return jsonify({'error': 'Error predicting category'}), 500
