#!/bin/bash

EXPRESSO=./node_modules/.bin/expresso
NODEUNIT=./node_modules/.bin/nodeunit
OUTFILE=test.log
#GREEN="\e[0;32m"
#RED="\e[1;31m"
#OFF="\e[0m"
#PFORMAT='%s%5s%s %s\n'
#PFF='\033[38;5;%dm\033[48;5;%dm%s\033[0m\n'
PFF='\033[38;5;%dm%-5s\033[0m %s\n'
RED=1
GREEN=2

color() {
    printf '\033[38;5;%dm%s\033[0m' $1 "$2"
}

failed() {
    printf "$PFF" $RED error $1
}
ok() {
    printf "$PFF" $GREEN ok $1
}

touch $OUTFILE
cp /dev/null $OUTFILE

FAILED=""
FAIL_COUNT=0

echo
for TEST_FILE in $@; do
    echo "----------------------------------------" >> $OUTFILE
    echo $TEST_FILE >> $OUTFILE
    if [ ${TEST_FILE: -8} == "-test.js" ]; then
        if $NODEUNIT $TEST_FILE  >> $OUTFILE 2>&1; then
            ok  $TEST_FILE
        else
            FAILED="$FAILED $TEST_FILE"
            D=$((FAIL_COUNT++))
            failed $TEST_FILE
        fi
    else
        if $EXPRESSO -I lib $TEST_FILE >> $OUTFILE 2>&1; then
            ok $TEST_FILE
        else
            D=$((FAIL_COUNT++))
            FAILED="$FAILED $TEST_FILE"
            failed  $TEST_FILE
        fi
    fi
done

if [ "$FAILED" != "" ]; then
    echo
    echo =========================================================
    if [ $FAIL_COUNT -eq 1 ]; then
      color $RED "$FAIL_COUNT test failed: "; echo $FAILED
    else
      color $RED "$FAIL_COUNT tests failed: "; echo $FAILED
    fi
    echo
    echo "Output in $OUTFILE"
    exit 1
fi

echo
color $GREEN "All tests OK"; echo
