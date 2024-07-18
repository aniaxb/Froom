FROM python:3.9.7-slim-bullseye

# Set the working directory
WORKDIR /category-module

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install dependencies
RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# Install Flask with the 'async' extra
RUN pip install --no-cache-dir Flask[async]

# Copy the entire project into the container
COPY . .

# Copy the .env file (if needed)
COPY .env .

# Set environment variables
ENV CONTAINER_NAME=froom-data-analysis
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_RUN_PORT=5000

# Run the training script (comment out if fashion_mnist_model.h5 already exists)
#RUN python run.py

# Expose the port on which the app will run
EXPOSE 5000

# Command to run the application
CMD ["flask", "run"]
