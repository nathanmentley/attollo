import React from 'react';
import { VM } from 'vm2';

export default (compiledTemplate) => {
    var vm = new VM({
        sandbox:{
            React: React
        }
    });

    return vm.run("var f = function(){ return " + compiledTemplate + ";}; f();");
};