#! /usr/bin/env bash

export JUNIT_REPORT_PATH=./test-reports/unittest/report.xml
nyc \
  --all \
  --reporter text --reporter html \
  --include "src/**.ts" \
  --report-dir "./test-reports/coverage" \
  mocha \
    --require source-map-support/register \
    --recursive \
    --reporter mocha-jenkins-reporter \
    test/TestConfiguration.ts test/*Spec.ts test/**/*Spec.ts
