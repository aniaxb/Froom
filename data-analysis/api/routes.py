from flask import Flask, Blueprint, jsonify, request

from background.background_removal import remove_background
from category.category_detection import detect_category
from color.color_detection import detect_colors

api = Blueprint('api', __name__)


@api.route('/analyze', methods=['POST'])
def analyze_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']

    # Remove background
    processed_image = remove_background(image)

    # Detect colors
    colors = detect_colors(image)

    # Detect shape
    shape = detect_category(image)

    return jsonify({
        'message': 'Analysis completed successfully',
        'processed_image': processed_image,
        'colors': colors,
        'category': shape
    })


@api.route('/background', methods=['POST'])
def background_removal():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    result = remove_background(image)
    return jsonify(result)


@api.route('/color', methods=['POST'])
def color_detection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    result = detect_colors(image)
    return jsonify(result)


@api.route('/category', methods=['POST'])
def category_detection():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    result = detect_category(image)
    return jsonify(result)
