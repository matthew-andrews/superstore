BUILD_DIR = coverage

build: test

clean:
	@echo "Starting clean"
	@rm -rf ${BUILD_DIR}
	@rm -rf node_modules
	@ehco "Finishing clean"

install:
	@echo "Starting install"
	@npm install
	@echo "Finishing install"

test: clean install
	@echo "Starting test"
	@npm test
	@echo "Finishign test"
