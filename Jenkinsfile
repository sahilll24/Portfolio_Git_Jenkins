pipeline {
    agent any
    tools {
    nodejs "node20"
    }

   
   options {
        timestamps()     
    }
    environment {
        SONAR_TOKEN = credentials('sonar-token')  
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Pulling code from GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "Installing frontend dependencies..."
                sh 'npm install'

                echo "Installing backend dependencies..."
                dir('server') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests (Vitest)') {
            steps {
                echo "Running frontend tests..."
                sh 'npm run test -- --coverage --reporter=junit --outputFile=frontend-tests.xml'

                echo "Running backend tests..."
                dir('server') {
                    sh 'npm run test -- --coverage --reporter=junit --outputFile=backend-tests.xml'
                }
            }

            post {
                always {
                    echo "Publishing test reports..."
                    junit '**/*tests.xml'
                }
            }
        }

        stage('Build Frontend (Vite)') {
            steps {
                echo "Building Vite frontend..."
                sh 'npm run build'
            }
        }

        stage('SonarQube Analysis') {
             steps {
                 echo "Starting SonarQube scan..."

             withSonarQubeEnv('sonar-server') {
               sh """
                sonar-scanner \
                -Dsonar.projectKey=Portfolio_Git_Jenkins \
                -Dsonar.projectName=Portfolio_Git_Jenkins \
                -Dsonar.sources=./ \
                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info,server/coverage/lcov.info \
                -Dsonar.host.url=http://localhost:9000 \
                -Dsonar.login=$SONAR_TOKEN
            """
        }
    }
}

        stage("Quality Gate") {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Archive Reports') {
            steps {
                echo "Archiving coverage & build artifacts..."
                archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            echo "🎉 CI Pipeline Completed Successfully!"
        }
        failure {
            echo "❌ CI Pipeline Failed. Check logs."
        }
    }
}



