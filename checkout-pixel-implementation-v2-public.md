---
layout: article
title: Checkout pixel v2 implementation guide
resource: true
categories: [Resources]
---

**Table of Contents**

- [Overview](#overview)
- [Instructions:](#instructions)
    - [Example code from order confirmation page template:](#example-code-from-order-confirmation-page-template)
- [Recommended usage](#recommended-usage)
- [Alternative load method](#alternative-load-method)

## Overview

Olapic checkout pixel will track detailed data about the order that gets processed on the e-commerce store.

Once implemented, Olapic will be able to grab the information related to each of the product bought (product ID, product price), and attribute it to the specific user who checked out.

The checkout pixel should be implemented on the order confirmation page after the user checkout (specifically, after the user has submitted the order to be processed). The checkout script is asynchronous. 

## Instructions:

1. Grab your account specific checkout code from the Checkout code tab from Settings page ([link](http://www.photorank.me/admin/settings#tabb_checkout)). This code should be placed in your Thank You / Checkout Confirmation page where the user has completed the purchase.


2. Please pay close attention to the "product loop" portion of the code. You will need to loop through each product that is in the cart with the shorthand operator, to append objects for each product and its associated price. These will subsequently all be enclosed in an array.

    
3. Swap out the variables with each of the appropriate variables from your site.


4. Please refer to the following variables we need placed in the code:

*Required* :
- `PRODUCT_ID` - *required*
    - The unique product ID from your store. This product ID MUST match the product ID being used from the product feed.
- `PRODUCT_PRICE` - *required*
    - The final price of each purchased product.
- `TRANSACTION_ID` - *required*
    - The unique transaction ID from your from your store.


*Optional, but recommended* :
- `CURRENCY` - *optional*
    - The ISO 4217 Alphabetic code of the currency. e.g. Use 'EUR' if the Amount value is in Euro. The default value is 'USD' if not passed.
- **Segmentation Data** - *optional*
    - You can segment out checkout data through any number of `key-value` pairs. Only one value for each key is allowed. E.g. `('country', 'USA')`

### Example code:

```html
<script type="text/javascript" data="olapic-checkout">
//==== Olapic Require: DO NOT CHANGE
var olapicRequireCheckoutScript=(function(oHead){var onError=function(){throw new URIError('Olapic checkout script could not be loaded');};return function(olapicScriptSrc,onLoadCallback){var oScript=document.createElement('script');oScript.type='text\/javascript';oScript.src=olapicScriptSrc;oScript.async=true;oScript.onerror=onError;if(onLoadCallback){if(oScript.addEventListener){oScript.addEventListener('load',onLoadCallback,false);}else if(oScript.readyState){oScript.onreadystatechange=function(){if(!this.readyState||this.readyState==='loaded'||this.readyState==='complete'){onLoadCallback();}};}else{oScript.attachEvent('load',onLoadCallback);}}
oHead.appendChild(oScript);};})(document.head||document.getElementsByTagName('head')[0]);

// ==== Checkout Code:
olapicRequireCheckoutScript('//photorankstatics-a.akamaihd.net/static/frontend/checkout/olapic.checkout.helper.js', function(){
    // Initialization
    olapicCheckout.init('f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857');

    // Add the Products: Product loop starts. This is where you will store each product purchased info
    olapicCheckout.addProduct('PRODUCT_ID', PRODUCT_PRICE);
    // Product loop ends.

    // Add the metadata/attributes
    olapicCheckout.addAttribute('transactionId', 'TRANSACTION_ID');
    olapicCheckout.addAttribute('currencyCode', 'CURRENCY');
    // Add Segmentation Values
    olapicCheckout.addSegment('SEGMENT_KEY', 'SEGMENT_VALUE');
    // Send the information
    olapicCheckout.execute();
});
</script>
```

## Recommended usage

Below script will be executed *asynchronously*. The following example uses a `for` loop to go through a hypothetical JS object called `productList`:

```javascript
//var olapicRequireCheckoutScript function expression is above this (like above example)...
olapicRequireCheckoutScript('//checkout.photorank.me/olapic.checkout.helper.js', function(){
    // Initialization using API key:
    olapicCheckout.init('UNIQUE_OLAPIC_API_KEY');
    // Add all the Products:
    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        olapicCheckout.addProduct(product.id, product.price);
    }
    // Add the metadata/attributes:
    olapicCheckout.addAttribute('transactionId', 'MyTransactionId001'); // Required
    olapicCheckout.addAttribute('currencyCode', 'USD'); // Optional
    // Add Segmentation Values:
    olapicCheckout.addSegment('country', 'USA'); // Optional
    olapicCheckout.addSegment('city', 'New York'); // Optional
    // Send the information:
    olapicCheckout.execute();
});
```

## Alternative load method 

***Note***: Implementing the script as seen below will *not* be asynchronous.

```html
<script type="text/javascript" src="//checkout.photorank.me/olapic.checkout.helper.js"></script>
<script type="text/javascript">
olapicCheckout.init('UNIQUE_OLAPIC_API_KEY');
for (var i = 0; i < productList.length; i++) {
    var product = productList[i];
    olapicCheckout.addProduct(product.id, product.price);
}
olapicCheckout.addAttribute('transactionId', 'MyTransactionId001'); // Required
olapicCheckout.addAttribute('currencyCode', 'USD'); // Required
olapicCheckout.addSegment('country', 'USA'); // Optional
olapicCheckout.execute();
</script>
```
