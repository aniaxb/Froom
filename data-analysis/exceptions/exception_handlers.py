from flask import jsonify


def handle_500_error(e):
    return jsonify({'message': str(e)}), 500


def handle_bad_request(e):
    return jsonify({'message': str(e)}), 400
