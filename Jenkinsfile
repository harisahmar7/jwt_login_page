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

pipeline {
    agent any

    environment {
        PATH = "/home/haris/.nvm/versions/node/v16.20.2/bin:/usr/bin:/usr/local/bin:$PATH"  
    }

    stages {
        stage('Backup Existing Dependencies') {
            steps {
                script {
                    echo '📦 Backing up node_modules and package-lock.json...'
                    sh '''
                        if [ -d node_modules ]; then
                            cp -r node_modules node_modules_backup
                        fi
                        if [ -f package-lock.json ]; then
                            cp package-lock.json package-lock_backup.json
                        fi
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

    tools {
        nodejs "NodeJS 16"
    }

    post {
        success {
            script {
                echo '✅ Build and deployment successful!'
                echo '🔄 Reloading application with PM2...'
                sh '/home/haris/.nvm/versions/node/v16.20.2/bin/pm2 reload app'
                sh 'rm -rf node_modules_backup package-lock_backup.json || true'
                echo '🚀 Cleanup complete. Application is up-to-date!'
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
                echo '🔄 Restarting the application with the last working version...'
                sh '/home/haris/.nvm/versions/node/v16.20.2/bin/pm2 restart app'
            }
        }
    }
}






