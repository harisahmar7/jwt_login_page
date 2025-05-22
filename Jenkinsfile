// pipeline {
//     agent any

//     environment {
//         PATH = "/var/lib/jenkins/.nvm/versions/node/v16.20.2/bin:${env.PATH}"
//         PM2_CMD = "/var/lib/jenkins/.nvm/versions/node/v16.20.2/bin/pm2"
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
//                     sh 'npm install'
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
//                     $PM2_CMD reload app || echo "⚠️ PM2 reload failed!"
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
//                     $PM2_CMD restart app || echo "⚠️ PM2 restart failed!"
//                 '''
//             }
//         }
//     }
// }





pipeline {
    agent any

    environment {
        NODE_PATH = "/home/haris/.nvm/versions/node/v16.20.2/bin"
        PATH = "${NODE_PATH}:${env.PATH}"
        PM2_CMD = "${NODE_PATH}/pm2"
        NODE_CMD = "${NODE_PATH}/node"
        NPM_CMD = "${NODE_PATH}/npm"
    }

    stages {
        stage('Backup Existing Dependencies') {
            steps {
                echo '📦 Backing up node_modules and package-lock.json...'
                sh '''
                    [ -d node_modules ] && cp -r node_modules node_modules_backup
                    [ -f package-lock.json ] && cp package-lock.json package-lock_backup.json
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '📥 Installing dependencies...'
                sh '$NPM_CMD install'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
            echo '🔄 Reloading application with PM2...'
            sh '''
                $PM2_CMD reload app || $PM2_CMD start index.js --name app
                rm -rf node_modules_backup package-lock_backup.json || true
            '''
            echo '🚀 Cleanup complete. Application is up-to-date!'
        }

        failure {
            echo '❌ Build failed! Rolling back to the last working version...'
            sh '''
                [ -d node_modules_backup ] && rm -rf node_modules && mv node_modules_backup node_modules
                [ -f package-lock_backup.json ] && rm -f package-lock.json && mv package-lock_backup.json package-lock.json
                $PM2_CMD restart app || echo "⚠️ PM2 restart failed!"
            '''
        }
    }
}






