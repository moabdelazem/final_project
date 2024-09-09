pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('docker-credentials') 
        DOCKER_USER = 'moabdelazem'  
        DOCKER_PASS = credentials('docker-credentials').password 
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the code...'
                git url: 'https://github.com/moabdelazem/final_project', branch: 'main'
            }
        }

        // Verify Docker Exist
        stage('Docker Check') {
            steps {
                script {
                    echo 'Checking if Docker is installed...'
                    sh 'docker --version'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building the Docker image...'
                    // Build Docker image using the Dockerfile from the backend folder
                    sh 'docker build -t moabdelazem/fp_backend:latest ./backend'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    echo 'Pushing the Docker image to Docker Hub...'
                    // Login to Docker Hub and push the image
                    withCredentials([usernamePassword(credentialsId: DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push moabdelazem/fp_backend:latest'
                    }
                }
            }
        }
    }
}
