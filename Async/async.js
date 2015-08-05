/*  Sync  */
function add(x,y){
    console.log("[SP] received the data");
    var result = x + y;
    console.log("[SP] returning the result");
    return result;
}

function addClient(x,y){
    console.log("[SC] triggering add");
    var result= add(x,y);
    console.log("[SC] result = ", result);
}

/* Async - Callbacks */
function addAsync(x,y, onResult){
    console.log("[SP] received the data");
    setTimeout(function(){
        var result = x + y;
        console.log("[SP] returning the result");
        onResult(result)
    },3000);
}

function addClient(x,y){
    console.log("[SC] triggering add");
    addAsync(x,y, function(result){
        console.log("[SC] result = ", result);
    });
}


/* Async - Events */
function getAdder(){
    var _callbacks = [];
    return {
        add : function(x,y){
            console.log("[SP] received the data");
            setTimeout(function(){
                var result = x + y;
                console.log("[SP] returning the result");
                _callbacks.forEach(function(callback){
                    callback(result);
                })

            },3000);
        },
        addSubscriber : function(callback){
            _callbacks.push(callback);
        }
    }
}

var adder = getAdder();
adder.add(100,200);
adder.addSubscriber(function(result){
    console.log("[SC] result = ", result);
});

/* Async - Promise */

function add(x,y){
    console.log("[SP] received the data");
    var promise = new Promise(function(resolve, reject){
        setTimeout(function(){
            var result = x + y;
            console.log("[SP] returning the result");
            resolve(result);
        },3000);
    });
    return promise;
}

var p = add(100,200);
p.then(function(result){
    console.log("[SC - 1] result = ", result);
});
p.then(function(result){
    console.log("[SC - 2] result = ", result);
});
p.then(function(result){
    console.log("[SC - 3] result = ", result);
});