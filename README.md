# node-red-contrib-blue-bank

Exposes the Blue Bank #BankOfApis [Personal Current Accounts v0.7](https://bluebank.portal.azure-api.net/docs/services/57fd0fd5a1fcf30c74f0346d/operations/57fd0fd7a1fcf30fd022a2b2).

See the [Blue Bank Developer Portal](https://bluebank.portal.azure-api.net/) for more information.

## Install

Run the following command in the root directory of your Node-RED install:

    npm install node-red-contrib-blue-bank

## Usage

* Sign up for the [Blue Bank Developer Portal](https://bluebank.portal.azure-api.net/).
* Subscribe to [Blue Bank v0.7 API](https://bluebank.portal.azure-api.net/products/57fd074959546913d84cc466)
* Create [dummy bank accounts](https://bb-customers.azurewebsites.net/BankAccounts)

## Methods

All methods require:

* `Subscription Key`
    * Found under [Your Subscriptions, Primary Key](https://bluebank.portal.azure-api.net/developer)
* `Authorization Token`
    * Click Get Bearer Token [here](https://bb-customers.azurewebsites.net/)

**Get Account** `/accounts/{id} - GET`

This returns a full Account object for the given id.

Extra Requirements:

* `Account ID`

**Update Account** `/accounts/{id} - PATCH`

By design, only the `accountFriendlyName` property can be updated by API. Other fields are reserved by the Bank and any attempts to change to them will be ignored.

Expects the property on `msg.payload.accountFriendlyName`.

**Get Accounts** `/customers/{id}/accounts - GET`

Use this call to enumerate the list of accounts for the specified user.

Extra Requirements:

* `Customer ID`

**Get Transactions** `/accounts/{id}/transactions - GET`

Returns a set of Transaction objects for the specified account.

Extra Requirements:

* `Account ID`

**Get Customer** `/customers/{id} - GET`

Use this call to return a specific Customer object, if you know the id.

Extra Requirements:

* `Customer ID`

**Update Customer** `/customers/{id} - PATCH`

Use this call to update a specific Customer object, if you know the id. At present, the only property which it is possible to update is `mobilePhone`.

Expects the property on `msg.payload.mobilePhone`.

*Note: In a future release, this feature will be available in a customer portal and this PATCH operation will be removed from the public API.*

**Get Customers** `/customers - GET`

This call will return a collection of Customer objects which the currently authenticated user is allowed to see.
