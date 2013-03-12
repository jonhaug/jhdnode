#!/bin/bash

EXPRESSO="node node_modules/expresso/bin/expresso"
NODEUNIT="node node_modules/nodeunit/bin/nodeunit"
NODE=node
OUTFILE=/dev/tty
TMPFILE=/tmp/buster.tmp

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

run-buster() {
    local CHECK_FILE=$TMPFILE
    if [ $REDIR -eq 1 ]; then
        $NODE $1 >> $OUTFILE 2>&1
        CHECK_FILE=$OUTFILE
    else
        $NODE $1 | tee $TMPFILE >> $OUTFILE 2>&1
    fi
    local A=`tail -2 $CHECK_FILE | head -1`
    local B="${A#*assertions, }"
    local B="${B#*assertion, }"
    local C=${B% timeouts*}
#    echo "<$A> <$B> <$C>"
    if [ "$C" = "0 failures, 0 errors, 0" ]; then
        return 0
    else
        return 1
    fi
}

REDIR=0
if [ "$1" = "-o" ]; then
    shift
    OUTFILE=$1
    shift
    touch $OUTFILE
    cp /dev/null $OUTFILE
    REDIR=1
fi

message() {
    if [ "$REDIR" -eq 1 ]; then
        echo $1
    fi
}

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
    elif [ ${TEST_FILE: -9} == "-btest.js" ]; then
        if run-buster $TEST_FILE; then
            ok $TEST_FILE
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
    message "Output in $OUTFILE"; echo
    exit 1
fi

echo
color $GREEN "All tests OK"; echo "   "
message "   (Output in $OUTFILE)"
echo
