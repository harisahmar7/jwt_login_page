pipeline {
    agent any

    environment {
        PATH = "/usr/bin:$PATH"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm install'
                }
            }
        }
    }
    
    tools {
    nodejs "NodeJS 16"
    }


}


// pipeline {
//     agent any

//     environment {
//         PATH = "/home/haris/.nvm/versions/node/v16.20.2/bin:$PATH"
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

//         stage('Reload Application') {
//             steps {
//                 script {
//                     echo 'Reloading application with PM2...'
//                     sh '/home/haris/.nvm/versions/node/v16.20.2/bin/pm2 reload app'
//                 }
//             }
//         }
//     }

//     tools {
//         nodejs "NodeJS 16"
//     }

//     post {
//         failure {
//             script {
//                 echo '❌ Build failed! Rolling back to the last working version...'
//                 sh 'rm -rf node_modules package-lock.json'
//                 sh 'mv node_modules_backup node_modules'
//                 sh 'mv package-lock_backup.json package-lock.json'
//                 echo 'Restarting the application with the last working version...'
//                 sh '/home/haris/.nvm/versions/node/v16.20.2/bin/pm2 restart app'
//             }
//         }
//     }
// }

