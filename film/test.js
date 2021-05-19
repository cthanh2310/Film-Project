function justTesting(input) {
    return new Promise(function(resolve, reject) {
        // some async operation here
        setTimeout(function() {
            // resolve the promise with some value
            resolve(input + 10);
        }, 500);
    });
}

justTesting(29).then(function(val) {
   // you access the value from the promise here
   log(val);
});

// display output in snippet
function log(x) {
    document.write(x);
}