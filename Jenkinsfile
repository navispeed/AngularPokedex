pipeline{
  agent { label 'nodejs8' }
  stages{
    stage ('checkout'){
      steps{
        git credentialsId: '173405a1-38ab-4022-86b7-510fd800a868', url: 'git@github.com:navispeed/Citizen-API.git'
        checkout scm
      }
    }
    stage ('install modules'){
      steps{
        sh '''
          npm install --verbose -d
        '''
      }
    }
    stage ('test'){
      steps{
        sh '''
          $(npm bin)/ng test --single-run --browsers Chrome_no_sandbox
        '''
      }
      post {
          always {
            junit "test-results.xml"
          }
      }
    }
    stage ('code quality'){
      steps{
        sh '$(npm bin)/ng lint'
      }
    }
    stage ('build') {
      steps{
        sh '$(npm bin)/ng build --prod --build-optimizer'
      }
    }
    stage ('build image') {
      steps{
        sh '''
          rm -rf node_modules
          oc start-build angular-5-example --from-dir=. --follow
        '''
      }
    }
  }
}
