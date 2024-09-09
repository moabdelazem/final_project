pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials') 
        IMAGE_NAME = 'moabdelazem/fp_backend'
        GITHUB_CREDENTIALS = credentials('github-token') 
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the repository containing the backend code
                git 'https://github.com/moabdelazem/final_project.git', credentialsId: GITHUB_CREDENTIALS
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Change directory to backend
                    dir('backend') {
                        // Build the Docker image
                        sh 'docker build -t $IMAGE_NAME:latest .'
                    }
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    // Login to Docker Hub using credentials from Jenkins
                    sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker push $IMAGE_NAME:latest'
                }
            }
        }
    }

    post {
        always {
            // Clean up the workspace
            cleanWs()
        }
        success {
            echo 'Docker image successfully built and pushed!'
        }
        failure {
            echo 'The build failed.'
        }
    }
}