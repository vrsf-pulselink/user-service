pipeline {
  agent any
  stages {
    stage('Install Node') {
      parallel {
        stage('Install Node') {
          steps {
            sh 'ls -la'
            sh 'env | sort'
          }
        }

        stage('Linter') {
          steps {
            sh 'ls -la'
            sh 'env | sort'
          }
        }

        stage('Test') {
          steps {
            sh 'env | sort'
          }
        }

      }
    }

  }
}