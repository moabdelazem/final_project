pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out the code...'
                git url: 'https://github.com/moabdelazem/final_project', branch: 'main'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building the Docker image...'
                    // Build Docker image using the Dockerfile from the backend folder
                    sh 'docker build -t moabdelazem/fp_backend ./backend'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    echo 'Pushing the Docker image to Docker Hub...'
                    // Login to Docker Hub and push the image
                    withCredentials([usernamePassword(credentialsId: 'docker-credentials', usernameVariable: 'moabdelazem', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                        sh 'docker push your-dockerhub-username/backend:latest'
                    }
                }
            }
        }
    }

    post {
        always {
            stage('Perform Post-Build Actions') {
                steps {
                    node {
                        echo 'Performing post-build actions...'
                        // Archive any build artifacts (optional)
                        archiveArtifacts artifacts: '**/target/*.jar', allowEmptyArchive: true
                        cleanWs() // Clean workspace after build
                    }
                }
            }
        }
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed.'
        }
    }
}
