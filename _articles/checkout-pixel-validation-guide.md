---
layout: article
title: Checkout Code Validation Guide
resource: true
categories: [Checkout Code]
redirect_from: checkout-pixel-validation-guide.html
---

**Table of Contents**

- [Overview](#overview)
- [Validation Options](#validation-options)

## Overview

The Olapic Checkout Code allows you to send important data from your conversion funnel to Olapic. The purpose of this code is to capture the data from the orders made by customers and tie the data back to Olapic components or widgets installed on your site. 


## Validation Options

To validate the checkout code, you have the following options:

### Olapic Checkout and Validation

Your Solutions Architect can complete the test checkout and validation; please provide the following test information for Olapic to validate the code for you:

-   Test credit card information
-   Staging environment URL and access credentials
-   Any test purchase rules (i.e. orders less than $200, no in-store pickup etc...)

### Client Checkout and Olapic Validation:

If Option 1 is not possible, anyone on your side can make a test purchase and we can validate this data on our end. Here are the steps for this option:

*We are using Google Chrome as our preferred browser in the following steps.*

*	Open up your browser and navigate to the page with the Olapic widget implemented. Interact with the widget (e.g., click on a UGC, navigation button, etc). Write down the URL of the page.
*	Add **two** of the same products to the cart.  Add **one** of a different product to the cart.  Write down the product URLs.
*	Perform checkout. *DevTools should be turned on before you get to this page, otherwise, the checkout request will not be captured in the DevTools.*
*	At the confirmation page of the checkout process, take note of the URL.
*	In the Network tab of Chrome DevTools, search for `checkout.gif` (base domain should be `data.photorank.me`)
*	Right-click the `checkout.gif` request, and click Save as HAR with Content.

Thereafter, please provide the following information to me so we can verify everything for you:

*	Sample URL where an Olapic widget is implemented.
*	The products that were added to the cart.
*	URL where the Olapic checkout code is implemented.
*	HAR data from confirmation page.

## Client Checkout - Detailed Instructions

*We are using Google Chrome as our preferred browser in the following steps.*

1. **Start on Page with Olapic Widget**
Interact with the widget (click on a photo, toggle through the carousel, etc.)

2. **Find and take note of the Olapic `analytics_ID`**
The `analytics_id` is a unique user identifier used to track impression/interaction data. To find the `analytics_ID`, using a Chrome browser right-click and click “Inspect Element”. In the Network tab, search photorank.me and click on the `render.gif` request. The `analytics_ID` can be seen below:

	![Image 1](http://olapic-data.s3.amazonaws.com/publicdocs/img/image1.png)

	**Can't find `analytics_id`?** If your site lives on multiple domains, you will have to dig through the Cookie part of the request, and dig up the `analytics_id` value:

	![Image 2](http://olapic-data.s3.amazonaws.com/publicdocs/img/image2.png)

	*The `analytics_id` value in this case is `s%3A32%3A%228a3a9f268bba30d5015ebd18e20e6421%22%3B`.*

3. **Add Items to the Cart**

	* Select the first item and add **two** to the cart.

	* Select the second item and add **one** to the cart.

	Write down the product ID and quantity of all products in the cart.

	**_IMPORTANT_**: Before completing the purchase, ensure that the Chrome DevTools is open in your browser. Keep the Network tab open before the purchase is complete. This way all Olapic requests upon checkout are registered.

4. **Submit the Order**

	Please take note of the order confirmation page.

	![Image 3](http://olapic-data.s3.amazonaws.com/publicdocs/img/image3.png)

5. **Within the Networks tab, search for the `checkout.gif` request**

	On the bottom right-hand corner, in the Query String Parameters, you will see the checkout data.

6. **Analyze the `checkout.gif` request**

	Search for `data.photorank.me` in the Search field in the Network tab of the Dev Tools. Take a close look at the Query String Parameters section of the request. This is where you will validate the data being passed to Olapic's Analytics API:

	-   Check the *`auth_token`*. This value should match your Olapic API key (Settings &gt; Account Basics)

	-   Check the *`analytics_id`*. This value should match the analytics_id from Step 1.

	-   Check the *`product[]`* parameter(s) for correct product ID and total value.

			-   The product ID should match the total cost of the product

					-   `Product_ID123:50`

			-   Or this can be itemized:

					-   `Product_ID123:25`

					-   `Product_ID123:25`

	-   Check the *`currency_code`* parameter. You should see the ISO 4217 Alphabetic code of the currency. (e.g. Use 'EUR' if the Amount value is in Euro, ‘USD’ for US Dollars).

		![Image 4](http://olapic-data.s3.amazonaws.com/publicdocs/img/image4.png)

7. **Right click the request, and click "Save as HAR with Content"**

	Please send the .HAR file to your Solution Architect so that we can further inspect.

	![Image 5](http://olapic-data.s3.amazonaws.com/publicdocs/img/image5.png)

	In addition to the .HAR file, please provide the following information to your Solutions Architect so we can verify this data on our end:

	-   Sample URL where an Olapic widget is implemented.
	-   The products that were added to the cart.
	-   URL where the Olapic checkout code is implemented.