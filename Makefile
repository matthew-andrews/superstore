BUILD_DIR = coverage

build: test

clean:
	@echo "Starting clean"
	@rm -rf ${BUILD_DIR}
	@rm -rf node_modules
	@npm install
	@echo "Finishing clean"

test: clean
	@echo "Starting test"
	@buster test
	@echo "Finishign test"
