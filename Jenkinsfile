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

// pipeline {
//     agent any

//     environment {
//         PATH = "/usr/bin:$PATH"
//     }

//     tools {
//         nodejs "NodeJS 16"
//     }

//     stages {
//         stage('Backup Existing Dependencies') {
//             steps {
//                 script {
//                     echo '📦 Backing up node_modules and package-lock.json...'
//                     sh '''
//                         [ -d node_modules ] && cp -r node_modules node_modules_backup
//                         [ -f package-lock.json ] && cp package-lock.json package-lock_backup.json
//                     '''
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     echo '📥 Installing dependencies...'
//                     sh '''
//                         export PATH=$PATH:/home/haris/.pm2
//                         npm install
//                     '''
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             script {
//                 echo '✅ Build and deployment successful!'
//                 echo '🔄 Reloading application with PM2...'
//                 sh '''
//                     export PATH=$PATH:/home/haris/.pm2
//                     pm2 reload app || echo "⚠️ PM2 reload failed!"
//                 '''
//                 sh 'rm -rf node_modules_backup package-lock_backup.json || true'
//                 echo '🚀 Cleanup complete. Application is up-to-date!'
//             }
//         }

//         failure {
//             script {
//                 echo '❌ Build failed! Rolling back to the last working version...'
//                 sh '''
//                     [ -d node_modules_backup ] && rm -rf node_modules && mv node_modules_backup node_modules
//                     [ -f package-lock_backup.json ] && rm -f package-lock.json && mv package-lock_backup.json package-lock.json
//                 '''
//                 echo '🔄 Restarting the application with the last working version...'
//                 sh '''
//                     export PATH=$PATH:/home/haris/.pm2
//                     pm2 restart app || echo "⚠️ PM2 restart failed!"
//                 '''
//             }
//         }
//     }
// }

// pipeline {
//     agent any

//     environment {
//         PATH = "/usr/bin:$PATH:/home/haris/.pm2:/home/haris/.nvm/versions/node/v16/bin"
//         PM2_CMD = "/home/haris/.nvm/versions/node/v16/bin/pm2"
//     }

//     tools {
//         nodejs "NodeJS 16"
//     }

//     stages {
//         stage('Backup Existing Dependencies') {
//             steps {
//                 script {
//                     echo '📦 Backing up node_modules and package-lock.json...'
//                     sh '''
//                         [ -d node_modules ] && cp -r node_modules node_modules_backup
//                         [ -f package-lock.json ] && cp package-lock.json package-lock_backup.json
//                     '''
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     echo '📥 Installing dependencies...'
//                     sh '''
//                         npm install
//                     '''
//                 }
//             }
//         }
//     }

//     post {
//         success {
//             script {
//                 echo '✅ Build and deployment successful!'
//                 echo '🔄 Reloading application with PM2...'
//                 sh '''
//                     sudo -u haris $PM2_CMD reload app || echo "⚠️ PM2 reload failed!"
//                 '''
//                 sh 'rm -rf node_modules_backup package-lock_backup.json || true'
//                 echo '🚀 Cleanup complete. Application is up-to-date!'
//             }
//         }

//         failure {
//             script {
//                 echo '❌ Build failed! Rolling back to the last working version...'
//                 sh '''
//                     [ -d node_modules_backup ] && rm -rf node_modules && mv node_modules_backup node_modules
//                     [ -f package-lock_backup.json ] && rm -f package-lock.json && mv package-lock_backup.json package-lock.json
//                 '''
//                 echo '🔄 Restarting the application with the last working version...'
//                 sh '''
//                     sudo -u haris $PM2_CMD restart app || echo "⚠️ PM2 restart failed!"
//                 '''
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        PATH = "/usr/bin:$PATH:/home/haris/.nvm/versions/node/v16/bin"
        PM2_CMD = "/home/haris/.nvm/versions/node/v16/bin/pm2"
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
                echo '🔄 Reloading application with PM2...'
                sh '''
                    sudo -u haris $PM2_CMD reload app || echo "⚠️ PM2 reload failed!"
                '''
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
                echo '🔄 Restarting the application with the last working version...'
                sh '''
                    sudo -u haris $PM2_CMD restart app || echo "⚠️ PM2 restart failed!"
                '''
            }
        }
    }
}










