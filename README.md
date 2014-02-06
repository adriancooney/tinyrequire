# Tinyrequire.js
### To the point dependency management.
Based on require.js, tinyrequire.js allows you to `define` and `require` your Javascript modules in the browser with automatic dependency management (optionally via parameters) and script injection. At **1547kb**, tinyrequire.js has an incredibly low footprint and doesn't waste time.

## Usage
There are two ways to use tinyrequire. One is to include `tinyrequire.js` then manually all the other dependancies or two, allow tinyrequire to gather the depedencies for you. Simply add a `data-main` attribute which points to the main entry point for your application on the tinyrequire `script` tag like so:

```html
<script type="text/javascript" src="src/tinyrequire.js" data-main="src/main.js"></script>
```

A couple of things are assumed:
* The name of the dependency is the filename with the `.js` extension.
* All dependencies are stored in the same directory or subdirectories as the main script.

When storing modules in folders, `require`'ing `foo/bar` will look for the `foo/bar` directory and supply the module **with `define`'d name** `foo/bar` from the file `foo/bar.js`. Tinyrequire does not automatically namespace modules so `define`'ing `foo/bar.js` with the name `bar` will not work. Any modules in the main directory's subdirectories will have to manually namespaced to reflect their path.

## API
#### `require( [dependencies, ] callback )`
Require dependencies for a module. Supply a array of dependencies as the first parameter or optionally allow tinyrequire to infer them from the function parameters. Example:

```js
require(["foo", "bar"], function(foo, bar) {
	alert(foo, bar);
});

// Equivalent
require(function(foo, bar) {
	alert(foo, bar);
});
```

#### `define( name, [dependencies, ], callback )`
Define a module with dependencies. The value returned from callback given it's dependencies is what's passed to other modules as a dependency. The callback's dependencies can also be inferred by it's parameters like `require`.

```js
define("foo", ["bar"], function(bar) {
	return function() {
		alert(bar);
	}
});

define("bar", function() {
	return "Hello world!";
});

require(function(foo) {
	foo(); // alert("Hello world!");
});
```

License: MIT