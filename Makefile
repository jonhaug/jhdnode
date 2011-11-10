
TEST_RUNNER=./bin/run-tests.sh
LBIN="./node_modules/.bin"


.PHONY : test

test:
	$(TEST_RUNNER) test/*test.js lib/*/test/*test.js


clean:
	rm node.out redis-server.out test.log

redis:
	redis-server > redis-server.out &
	echo $! > redis.pid

run: test
	node portal.js

debug: test
	node-dev --debug portal.js | tee node.out

cluster: test
	node server.js


#	$(LBIN)/nodeunit test/*-test.js
#	for i in test/*.test.js; do echo $(i); $(LBIN)/expresso -I lib $(i); done
