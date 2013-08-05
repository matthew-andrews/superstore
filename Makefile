BUILD_DIR = coverage

build: test

clean:
	@echo "Starting clean"
	@rm -rf ${BUILD_DIR}
	@rm -rf node_modules
	@echo "Finishing clean"

test: clean
	@echo "Starting test"
	@npm install
	@npm test
	@echo "Finishing test"
