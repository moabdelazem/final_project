# Python 3.7 slim image with FastAPI and Uvicorn
FROM python:3.7-slim

# Set the working directory in the container
WORKDIR /app

# Copy the dependencies file to the working directory
COPY requirements.txt requirements.txt

# Update Pip
RUN pip install --upgrade pip

# Install any needed packages specified in requirements.txt
RUN pip install -r  requirements.txt

# Copy the content of the local src directory to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8000

# Run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]