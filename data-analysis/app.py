from flask import Flask, request, jsonify
from flask_cors import CORS

from api.routes import api
from background.background_removal import remove_background
from exceptions.exception_handlers import handle_500_error, handle_bad_request

app = Flask(__name__)
app.debug = True
CORS(app)

app.register_blueprint(api)
app.register_error_handler(500, handle_500_error)
app.register_error_handler(Exception, handle_bad_request)

if __name__ == '__main__':
    app.run(debug=True)
