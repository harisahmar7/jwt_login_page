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

//     stages {
//         stage('Backup Existing Dependencies') {
//             steps {
//                 script {
//                     echo '📦 Backing up node_modules and package-lock.json...'
//                     sh '''
//                         if [ -d node_modules ]; then
//                             cp -r node_modules node_modules_backup
//                         fi
//                         if [ -f package-lock.json ]; then
//                             cp package-lock.json package-lock_backup.json
//                         fi
//                     '''
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     echo '📥 Installing dependencies...'
//                     sh 'npm install'
//                 }
//             }
//         }
//     }

//     tools {
//         nodejs "NodeJS 16"
//     }

//     post {
//         success {
//             script {
//                 echo '✅ Build and deployment successful!'
//                 echo '🔄 Reloading application with PM2...'
//                 sh 'pm2 reload app'
//                 sh 'rm -rf node_modules_backup package-lock_backup.json || true'
//                 echo '🚀 Cleanup complete. Application is up-to-date!'
//             }
//         }

//         failure {
//             script {
//                 echo '❌ Build failed! Rolling back to the last working version...'
//                 sh '''
//                     if [ -d node_modules_backup ]; then
//                         rm -rf node_modules
//                         mv node_modules_backup node_modules
//                     fi

//                     if [ -f package-lock_backup.json ]; then
//                         rm -f package-lock.json
//                         mv package-lock_backup.json package-lock.json
//                     fi
//                 '''
//                 echo '🔄 Restarting the application with the last working version...'
//                 sh 'pm2 restart app'
//             }
//         }
//     }
// }

// pipeline {
//     agent any

//     environment {
//         PATH = "/home/haris/.nvm/versions/node/v16.20.2/bin:/usr/bin:/usr/local/bin:$PATH"  
//     }

//     stages {
//         stage('Backup Existing Dependencies') {
//             steps {
//                 script {
//                     echo '📦 Backing up node_modules and package-lock.json...'
//                     sh '''
//                         if [ -d node_modules ]; then
//                             cp -r node_modules node_modules_backup
//                         fi
//                         if [ -f package-lock.json ]; then
//                             cp package-lock.json package-lock_backup.json
//                         fi
//                     '''
//                 }
//             }
//         }

//         stage('Install Dependencies') {
//             steps {
//                 script {
//                     echo '📥 Installing dependencies...'
//                     sh 'npm install'
//                 }
//             }
//         }
//     }

//     tools {
//         nodejs "NodeJS 16"
//     }

//     post {
//         success {
//             script {
//                 echo '✅ Build and deployment successful!'
//                 echo '🔄 Reloading application with PM2...'
//                 sh 'sudo /home/haris/.nvm/versions/node/v16.20.2/bin/pm2 reload app'
//                 sh 'rm -rf node_modules_backup package-lock_backup.json || true'
//                 echo '🚀 Cleanup complete. Application is up-to-date!'
//             }
//         }

//         failure {
//             script {
//                 echo '❌ Build failed! Rolling back to the last working version...'
//                 sh '''
//                     if [ -d node_modules_backup ]; then
//                         rm -rf node_modules
//                         mv node_modules_backup node_modules
//                     fi

//                     if [ -f package-lock_backup.json ]; then
//                         rm -f package-lock.json
//                         mv package-lock_backup.json package-lock.json
//                     fi
//                 '''
//                 echo '🔄 Restarting the application with the last working version...'
//                 sh 'sudo /home/haris/.nvm/versions/node/v16.20.2/bin/pm2 restart app'
//             }
//         }
//     }
// }

pipeline {
    agent any

    environment {
        PATH = "/home/haris/.nvm/versions/node/v16.20.2/bin:/usr/bin:/usr/local/bin:$PATH"
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
                    sh '''
                        export PATH=$PATH:/home/haris/.nvm/versions/node/v16.20.2/bin
                        npm install
                    '''
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
                    export PATH=$PATH:/home/haris/.nvm/versions/node/v16.20.2/bin
                    pm2 reload app || echo "⚠️ PM2 reload failed!"
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
                    export PATH=$PATH:/home/haris/.nvm/versions/node/v16.20.2/bin
                    pm2 restart app || echo "⚠️ PM2 restart failed!"
                '''
            }
        }
    }
}







