describe("tinyrequire", function() {
	describe(".extractDependencies", function() {
		it("should extract all dependencies from a functions parameters", function() {
			var depns = ["foo", "bar", "tree", "plant"];

			require.extractDependencies(function(foo, bar, tree, plant) {}).should.eql(depns);
			require.extractDependencies(function(foo, bar, tree, plant /*, foot */) {}).should.eql(depns);
			require.extractDependencies(function(foo, bar, tree, plant /*, 
				foot 
				*/) {}).should.eql(depns);
			require.extractDependencies(function(foo, bar, 
				tree, plant /*, fart */) {}).should.eql(depns);
			require.extractDependencies(function(/*depn, */foo, bar, 
				tree, plant /*, fart */) {}).should.eql(depns);
			require.extractDependencies(function(foo){}).should.eql(["foo"]);
			require.extractDependencies(function() {}).should.eql([]);
		});
	});

	describe("define", function() {
		it("should define a module without dependencies immediately", function() {
			define("item", function() { return "item"; });
			Should(require.modules["item"]).be.ok;
			Should(require.modules["item"].loaded).be.ok;
		});

		it("should accept dependency array", function(next) {
			var module = define("nand", ["item"], function(item) {
				if(item === "item") next();
			});
		});

		it("should automatically extract dependencies", function() {
			define("item1", function(foo, bar) { });

			require.modules["item1"].dependencies.should.eql(["foo", "bar"]);
		});

		it("should automatically execute given defined dependencies", function() {
			define("foo", function(item) {
				return ["bar"];
			});
		});

		it("should wait until it's dependencies have been injected to run", function(next) {
			define("bar", ["foob"], function(foob) { next(); });
			define("foob", function() { return 1; });
		});
	});

	describe("require", function() {
		it("should require a module", function(next) {
			require(function() {
				setTimeout(next, 50);
			});

			Should(require.modules.length === 1).be.ok;
		});

		it("should extract dependencies", function() {
			var module = require(function(foo, plant, bar) {});

			module.dependencies.should.eql(["foo", "plant", "bar"]);
		});

		it("should run use manual dependencies injection", function() {
			var module = require(["foo"], function(item) {});

			module.dependencies.should.eql(["foo"]);
		});

		it("should run and have dependancy injected", function(next) {
			require(function(item, foo) {
				if(item === "item" && foo[0] === "bar") next();
				else next(new Error);
			});
		});
	});
});