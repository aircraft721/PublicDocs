---
layout: article
title: Checkout Code Implementation Guide
resource: true
categories: [Checkout Code]
permalink: checkout-pixel-implementation-v2-public.html
---

**Table of Contents**

- [Overview](#overview)
- [Parameters](#parameters)
- [Instructions](#instructions)
- [Non-async load method](#nonasync-load-method)

## Overview

Implementing the Olapic Checkout Code allows you to send important data from your conversion funnel to Olapic. The purpose of this code is to capture the data from the orders made by visitors, and tie the data back to Olapic components installed on your site.

Once implemented, Olapic will be able to analyze the conversion funnel closely, and provide valuable insight in your Analytics dashboard. Please contact your Olapic Account Manager for more details.

Note that the checkout code should be implemented on the *order confirmation page*. Specifically, on the page after the user has submitted the order to be processed. The JS tag is asynchronous.

## Parameters

We need the following set of data mapped to the Olapic Checkout Code in order for our platform to provide valuable insight of your conversion funnel:

|   Parameter    | Required |                                                                   Description                                                                    |                   Example                    |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| PRODUCT_ID     | **yes**  | The unique ID of the product purchased by the user. This unique ID must match the product identifiers in the Product Feed you provide to Olapic. | "ABCD-1234"                                  |
| PRODUCT_PRICE  | **yes**  | The price of the product purchased by the user. This value must be a *subtotal* value (before any sales, shipping, promotional discount, etc).   | "12.99"                                      |
| TRANSACTION_ID | **yes**  | The unique ID of the order.                                                                                                                      | "XXXYYYZZZ123"                               |
| CURRENCY       | **yes**  | The ISO 4217 Alphabetic code of the currency. e.g. Use 'EUR' if the Amount value is in Euro. The default value is 'USD' if not passed.           | "USD"                                        |
| Segment Data   | no       | You can segment out checkout data through any number of key-value pairs. Only one value for each key is allowed. E.g. ('country', 'USA')         | olapicCheckout.addSegment('country', 'USA'); |

## Instructions:

1. Grab your account specific checkout code from the [Checkout code tab from Settings page](http://www.photorank.me/admin/settings#tabb_checkout). 
    Your code shoud look like the below:

        <script type="text/javascript" data="olapic-checkout">
        //==== Olapic Require: DO NOT CHANGE
        var olapicRequireCheckoutScript=(function(oHead){var onError=function(){throw new URIError('Olapic checkout script could not be loaded');};return function(olapicScriptSrc,onLoadCallback){var oScript=document.createElement('script');oScript.type='text\/javascript';oScript.src=olapicScriptSrc;oScript.async=true;oScript.onerror=onError;if(onLoadCallback){if(oScript.addEventListener){oScript.addEventListener('load',onLoadCallback,false);}else if(oScript.readyState){oScript.onreadystatechange=function(){if(!this.readyState||this.readyState==='loaded'||this.readyState==='complete'){onLoadCallback();}};}else{oScript.attachEvent('load',onLoadCallback);}}
        oHead.appendChild(oScript);};})(document.head||document.getElementsByTagName('head')[0]);

        // ==== Checkout Code:
        olapicRequireCheckoutScript('//photorankstatics-a.akamaihd.net/static/frontend/checkout/olapic.checkout.helper.js', function(){
            // Initialization
            olapicCheckout.init('XXXXX');

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

2. Please pay close attention to the "product loop" portion of the code. This is where you see:

        olapicCheckout.addProduct('PRODUCT_ID', PRODUCT_PRICE);
    
    You will need to loop through each product that is in the cart with the `olapicCheckout.addProduct` object function, to invoke the function for each product and its associated price.

    **IMPORTANT NOTE**: Olapic sums up the purchase data by adding up the price information from the product loop. If there are multiple quantities of the same product being purchased, make sure that the loop takes care of multiple quantity as well. 

    For instance, take a look at the following example JSON object for cart data:

        var cartObject = {
            "products":[
                {
                    "name": "Awesome Possum T-shirt in Red",
                    "product_id": "APTS-01",
                    "price": 25.00,
                    "quantity": 2
                },
                {
                    "name": "Awesome Possum T-shirt in Blue",
                    "product_id": "APTS-02",
                    "price": 26.00,
                    "quantity": 1
                }
            ],
            "currency":"USD",
            "transaction_id":"XXXYYYZZZ123"
        }

    The loop would look like this:

        for (var i = cartObject.products.length - 1; i >= 0; i--) {
            var product = cartObject.products[i];

            for (var c = product.quantity - 1; c >= 0; c--) {
                olapicCheckout.addProduct(product.product_id, product.price);
            };
        };

    
3. Swap out the second part of the function arguments (transaction ID and currency) with each of the appropriate parameter/variables from your site. 

    This is where you see:

        olapicCheckout.addAttribute('transactionId', 'TRANSACTION_ID');
        olapicCheckout.addAttribute('currencyCode', 'CURRENCY');

    Using the example `cartObject` from above, the swap looks like this:

        olapicCheckout.addAttribute('transactionId', cartObject.transaction_id);
        olapicCheckout.addAttribute('currencyCode', cartObject.currency);

4. **OPTIONAL**: You can use `addSegment` to provide segmentation data to Olapic. You can customize the key & value using the following function:

        olapicCheckout.addSegment('SEGMENT_KEY', 'SEGMENT_VALUE');

    Let's add a custom segment here for demonstration:

        olapicCheckout.addSegment('AB_test', 'true');

4. Voila! That's it. See below for what the final output should look like:

        <script type="text/javascript" data="olapic-checkout">
        //==== Olapic Require: DO NOT CHANGE
        var olapicRequireCheckoutScript=(function(oHead){var onError=function(){throw new URIError('Olapic checkout script could not be loaded');};return function(olapicScriptSrc,onLoadCallback){var oScript=document.createElement('script');oScript.type='text\/javascript';oScript.src=olapicScriptSrc;oScript.async=true;oScript.onerror=onError;if(onLoadCallback){if(oScript.addEventListener){oScript.addEventListener('load',onLoadCallback,false);}else if(oScript.readyState){oScript.onreadystatechange=function(){if(!this.readyState||this.readyState==='loaded'||this.readyState==='complete'){onLoadCallback();}};}else{oScript.attachEvent('load',onLoadCallback);}}
        oHead.appendChild(oScript);};})(document.head||document.getElementsByTagName('head')[0]);

        // ==== Checkout Code:
        olapicRequireCheckoutScript('//photorankstatics-a.akamaihd.net/static/frontend/checkout/olapic.checkout.helper.js', function(){
            // Initialization
            olapicCheckout.init('XXXXX');

            // Add the Products: Product loop starts. This is where you will store each product purchased info
            for (var i = cartObject.products.length - 1; i >= 0; i--) {
                var product = cartObject.products[i];

                for (var c = product.quantity - 1; c >= 0; c--) {
                    olapicCheckout.addProduct(product.product_id, product.price);
                };
            };
            // Product loop ends.

            // Add the metadata/attributes
            olapicCheckout.addAttribute('transactionId', cartObject.transaction_id);
            olapicCheckout.addAttribute('currencyCode', cartObject.currency);
            // Add Segmentation Values
            olapicCheckout.addSegment('AB_test', 'true');
            // Send the information
            olapicCheckout.execute();
        });
        </script>

## Non-async load method 

***Note***: Implementing the script as seen below will *not* be asynchronous.

```
<script type="text/javascript" src="//photorankstatics-a.akamaihd.net/static/frontend/checkout/olapic.checkout.helper.js"></script>
<script type="text/javascript">
    olapicCheckout.init('UNIQUE_OLAPIC_API_KEY');
    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        olapicCheckout.addProduct(product.id, product.price);
    }
    olapicCheckout.addAttribute('transactionId', 'XXXYYYZZZ1234'); // Required
    olapicCheckout.addAttribute('currencyCode', 'USD'); // Required
    olapicCheckout.addSegment('country', 'USA'); // Optional
    olapicCheckout.execute();
</script>
```
