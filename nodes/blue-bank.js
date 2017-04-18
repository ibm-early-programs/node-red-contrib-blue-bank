module.exports = function(RED) {
    "use strict";
   var request = require("request");

    function BlueBankNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var url  = "https://bluebank.azure-api.net/api/v0.7/";

        this.on("input", function(msg) {
            var method   = msg.method     || config.method;
            var customer = msg.customerId || config.customer;
            var account  = msg.accountId  || config.account;
            var key  = msg.key  || config.key;
            var auth = msg.auth || config.auth;

            var options = {
                method: "GET",
                headers: {
                    "Ocp-Apim-Subscription-Key": key,
                    "Authorization": auth
                }
            }

            if (method === "getAccount") {
                options.url = url + "accounts/" + account;
            } else if (method === "getAccounts") {
                options.url = url + "customers/" + customer + "/accounts";
            } else if (method === "getTransactions") {
                options.url = url + "accounts/" + account + "/transactions";
            } else if (method === "getCustomer") {
                options.url = url + "customers/" + customer;
            } else if (method === "getCustomers") {
                options.url = url + "customers";
            } else {
                node.error('Incorrect method', msg);
                node.status({fill:"red", shape:"ring", text:"Incorrect method"});
            }

            var r = request(options, function(error, response, body) {
                if (error) {
                    node.error(error, msg);
                    node.status({fill:"red", shape:"ring", text:"Request failed"});
                } else {
                    var response = JSON.parse(body);
                    msg.payload = response;
                    node.send(msg);
                }
            });
        });
    }
    RED.nodes.registerType("blue-bank",BlueBankNode);
}
