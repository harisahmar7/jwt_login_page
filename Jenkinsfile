// pipeline {
//     agent any

//     environment {
//         PATH = "/usr/bin:$PATH"
//     }

//     stages {
//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     echo 'Installing dependencies...'
//                     sh 'npm install'
//                 }
//             }
//         }
//     }
    
//     tools {
//     nodejs "NodeJS 16"
//     }


// }


pipeline {
    agent any
    
    environment {
        NODE_BIN = sh(script: "which node", returnStdout: true).trim()
        PATH = "$NODE_BIN:$PATH"
    }

    stages {
        stage('Backup Existing Dependencies') {
            steps {
                script {
                    echo 'Backing up node_modules and package-lock.json...'
                    sh 'cp -r node_modules node_modules_backup || true'
                    sh 'cp package-lock.json package-lock_backup.json || true'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    try {
                        echo 'Installing dependencies...'
                        sh 'npm install'
                    } catch (Exception e) {
                        echo "❌ Error: ${e}"
                        error('Failed to install dependencies!')
                    }
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

        stage('Reload Application') {
            steps {
                script {
                    echo 'Reloading application with PM2...'
                    sh 'pm2 reload app'
                }
            }
        }
    }

    tools {
        nodejs "NodeJS 16"
    }

    post {
        success {
            script {
                echo '✅ Build and deployment successful!'
                sh 'rm -rf node_modules_backup package-lock_backup.json || true'
                echo '🚀 Application successfully updated!'
                
                // Optionally, send a notification (e.g., Slack, email)
                // sh 'curl -X POST -H "Content-Type: application/json" --data "{\"text\":\"Deployment Successful! 🎉\"}" <YOUR_WEBHOOK_URL>'
            }
        }

        failure {
            script {
                echo '❌ Build failed! Rolling back to the last working version...'
                sh '''
                    if [ -d node_modules_backup ]; then
                        rm -rf node_modules
                        mv node_modules_backup node_modules
                    fi
                    
                    if [ -f package-lock_backup.json ]; then
                        rm -f package-lock.json
                        mv package-lock_backup.json package-lock.json
                    fi
                '''
                echo 'Restarting the application with the last working version...'
                sh 'pm2 restart app'
            }
        }
    }
}


