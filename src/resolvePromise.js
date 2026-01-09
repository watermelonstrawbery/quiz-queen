export function resolvePromise(prms, promiseState){
    promiseState.promise = prms;
    promiseState.data = null;
    promiseState.error = null;

    if(promiseState.promise){
        promiseState.promise.then(setPromiseDataACB).catch(setPromiseErrorACB);
    }

    function setPromiseDataACB(data){
        if(promiseState.promise == prms){
            promiseState.data = data;
        }
    }

    function setPromiseErrorACB(error){
        promiseState.error = error;
    }
}