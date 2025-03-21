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
        PATH = "/usr/bin:$PATH"     
    }     

    tools {    
        nodejs "NodeJS 16"    
    }    

    stages {  
        stage('Backup Current Version') {
            steps {
                script {
                    echo 'Backing up current node_modules and package-lock.json...'
                    sh 'cp -r node_modules node_modules_backup || true'
                    sh 'cp package-lock.json package-lock_backup.json || true'
                }
            }
        }

        stage('Clean Workspace') {             
            steps {                 
                script {                     
                    echo 'Removing node_modules and package-lock.json...'                     
                    sh 'rm -rf node_modules package-lock.json'                 
                }             
            }         
        }    

        stage('Install Dependencies') {             
            steps {                 
                script {                     
                    echo 'Installing dependencies...'                     
                    sh 'npm install || exit 1'  // Stop if install fails
                }             
            }         
        }     

        stage('Reload Application') {             
            steps {                 
                script {                     
                    echo 'Reloading application with PM2...'                     
                    sh 'pm2 list | grep app && pm2 reload app || pm2 start app'
                }             
            }         
        }     
    }  

    post {
        success {
            echo "✅ Build successful! Cleaning up backup files..."
            sh 'rm -rf node_modules_backup package-lock_backup.json'
        }
        failure {
            echo "❌ Build failed! Rolling back to the last working version..."
            sh 'rm -rf node_modules package-lock.json'
            sh 'mv node_modules_backup node_modules || true'
            sh 'mv package-lock_backup.json package-lock.json || true'
            echo "Restarting the application with the last working version..."
            sh 'pm2 restart app'
        }
    }
}
