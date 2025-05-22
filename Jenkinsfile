pipeline {
    agent any

    environment {
        PATH = "/var/lib/jenkins/.nvm/versions/node/v16.20.2/bin:${env.PATH}"
    }

    tools {
        nodejs "NodeJS 16"
    }

    stages {
        stage('Backup Existing Dependencies') {
            steps {
                script {
                    echo '📦 Backing up node_modules and package-lock.json...'
                    sh '''
                        [ -d node_modules ] && cp -r node_modules node_modules_backup
                        [ -f package-lock.json ] && cp package-lock.json package-lock_backup.json
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo '📥 Installing dependencies...'
                    sh 'npm install'
                }
            }
        }
    }

    post {
        success {
            script {
                echo '✅ Build and deployment successful!'
                sh 'rm -rf node_modules_backup package-lock_backup.json || true'
                echo '🚀 Cleanup complete. Application is up-to-date!'
            }
        }

        failure {
            script {
                echo '❌ Build failed! Rolling back to the last working version...'
                sh '''
                    [ -d node_modules_backup ] && rm -rf node_modules && mv node_modules_backup node_modules
                    [ -f package-lock_backup.json ] && rm -f package-lock.json && mv package-lock_backup.json package-lock.json
                '''
                echo '⚠️ Rolled back to previous version of dependencies.'
            }
        }
    }
}
