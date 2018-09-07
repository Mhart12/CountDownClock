import jenkins.model.Jenkins
import hudson.model.User
import hudson.security.Permission
import hudson.EnvVars

//properties(
//    [buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '', numToKeepStr: '10')),
//    [$class: 'ScannerJobProperty', doNotScan: false], pipelineTriggers([pollSCM('H/5 * * * *')])]
//)

// used below to control timouts on builds
//int StageTimeout = 4 as Integer
//int ProdTimeout = 8 as Integer
//TimeoutUnits = 'HOURS'  // valid choices are DAYS, HOURS, MINUTES, SECONDS

stage ('Retrieve from SCM') {
    node {
     git credentialsId: '073040a2-acc2-40c1-b0da-8ceaa6befaad', url: 'ssh://git@bitbucket-ssh.uhub.biz:7999/vmlnavml/www.vmllabs.com.git'
    }
}

stage ('Deploy to Dev') {
    // dev - auto deploy on all commits
    node {
        echo 'Updating files in S3 bucket'
        sh 'aws --profile yr-vml-aws s3 sync $WORKSPACE/content s3://www-vmllabs.vmldev.com --delete --exclude "build/*" --exclude ".git/*" --exclude ".DS_Store"'
//        echo 'Invalidating Cloudfront cache'
//        sh 'aws cloudfront create-invalidation --distribution-id E7LVT2014JTAB --paths "/*"'
    }
//    timeout (time: StageTimeout, unit: TimeoutUnits) {
//        input message: 'Promote to Staging?'
//    }
}

stage ('Deploy to Stage') {
    // stage - 4 hour window to deploy
    node {
        echo 'Updating files in S3 bucket'
        sh 'aws --profile yr-vml-aws s3 sync $WORKSPACE/content s3://www-vmllabs.vmlstage.com --delete --exclude "build/*" --exclude ".git/*" --exclude ".DS_Store"'
//        echo 'Invalidating Cloudfront cache'
//        sh 'aws cloudfront create-invalidation --distribution-id E2BBWWAHOA5GXW --paths "/*"'
    }
//    timeout (time: ProdTimeout, unit: TimeoutUnits) {
//       input message: 'Promote to Production?'
//    }
}

stage ('Deploy to Production') {
    // prod - 8 hour window to deploy
    node {
        echo 'Updating files in S3 bucket'
        sh 'aws --profile yr-vml-aws s3 sync $WORKSPACE/content s3://www.vmllabs.com --delete --exclude "build/*" --exclude ".git/*" --exclude ".DS_Store"'
//        echo 'Invalidating Cloudfront cache'
//        sh 'aws cloudfront create-invalidation --distribution-id EESJEFK85O8AB --paths "/*"'
    }
}
