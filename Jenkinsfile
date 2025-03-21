pipeline {
    agent any  // Runs on any available Jenkins agent

    environment {
        NODE_VERSION = "16"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master', url: 'https://github.com/harisahmar7/jwt_login_page.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    echo 'Running tests...'
                    sh 'npm test'
                }
            }
        }

        stage('Build Application') {
            steps {
                script {
                    echo 'Building application...'
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Local Server') {
            steps {
                script {
                    echo 'Deploying application...'
                    sh 'pm2 restart my-app || pm2 start app.js --name my-app'
                }
            }
        }
    }
}
