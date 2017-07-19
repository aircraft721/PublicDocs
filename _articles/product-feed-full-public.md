---
layout: article
title: Olapic Product Feed Specifications
resource: true
categories: [Product Feed]
redirect_from: product-feed-full-public.html
---

The following document will explain the product feed supported by **Olapic**.

## Table of Contents

- [Overview](#overview)
  - [Accepted Feed Formats](#accepted-feed-formats)
  - [Validating Your Feed](#validating-your-feed)
  - [Delivering Your Product Feed](#delivering-your-product-feed)
    - [Note: feed update times](#note-feed-update-times)
  - [Updating Your Product Feed](#updating-your-product-feed)
- [Creating Your Olapic Feed](#creating-your-olapic-feed)
  - [Olapic Feed Example](#olapic-feed-example)
  - [Encoding & Basic Structure](#encoding-&-basic-structure)
  - [`<Category>` Element Definition](#category-element-definition)
  - [`<Product>` Element Definition](#product-element-definition)
    - [Product Availability / Inventory Logic](#product-availability--inventory-logic)
    - [Providing Parent/Child Product Hierarchy](#providing-parentchild-product-hierarchy)


## Overview

**Product Feed (PF)** is a list of products in your e-commerce store. Olapic requires this feed to create what we call `streams` for your account so you can start tagging the media to specific products in the Moderation Queue. So having the right product feed format is critical for a correct implementation.

Ideally, we will create one stream per product object / node in your PF.

### Accepted Feed Formats

Olapic supports 3 types of feeds:

* XML feed in Olapic schema
* XML feed in Google Products schema (following [Google Product feed specifications](https://support.google.com/merchants/answer/188494?hl=en))
* XML feed in custom schema

If you plan on giving us a custom feed (feeds that are not in Olapic or Google schemas), please be aware of the following:

* Limited functionality applies.
* Specific parts of Olapic feed schema pertains to product features such as syndication, inventory updates, configurable/simple products, etc (not limited to the features mentioned).
* We require the fields listed as **required**. You can rename them, but they are essential for a good implementation.
* To ensure a successful import, we require verification from an Olapic tech resource.

By default, XML feed in Olapic schema will support the full feature-set. Please refer to the following table for the supported feature across 3 types of feeds, and consult your account team on which product feed would be optimal for your integration:

|                        Olapic Feature                       | Olapic Standard Feed | Google Product Feed (Standard) | Anything else |
| ----------------------------------------------------------- | -------------------- | ------------------------------ | ------------- |
| Create new products                                         | x                    | x                              | x             |
| Update existing products                                    | x                    | x                              | x             |
| Set product availability (using stock or availability flag) | x                    | x                              |               |
| Deactivate products (Availability = INACTIVE)               | x                    | x *                            |               |
| Re-activate products (Availability = OK)                    | x                    | x *                            |               |
| Remove products (delete completely)						  | x 					 |    							  | 			  |
| Extra metadata support (stock, color, price)                | x                    | x                              |               |
| Single Universal ID (UPC, EAN) Support           | x                    | x                              |               |
| Multiple Universal ID (UPC, EAN) Support         | x                    |                                |               |
| Multiple Category                                           | x                    |                                |               |
| Category Hierarchy                                          |                      |                                |               |
| Category Widget Support                                     | x                    |                                |               |
| Product Hierarchy (color variants, etc)                     | x                    | x                              |               |
| Schema Validation Support                                   | x                    |                                |               |

**[!] Important Note:** We accept Google feeds that are in accordance to the [Google Merchant Center Products Feed Specification](https://support.google.com/merchants/answer/188494?hl=en) only.

**[**\***]** These features are available with the full import mode only. Please request this from your Olapic account team if you wish to enable this mode.

### Validating Your Feed
Please use the XML Schema Definition (.xsd) to validate the feed. You can find our schema here:

[XML Schema Definition for a valid Olapic Feed](http://photorank.me/olapicProductFeedV1_0.xsd)

**Important Note:** Please validate your feed before sending it over. You can use any tool you want to validate the feed, but we encourage you to do a schema validation using our XSD file above to make sure everything lines up correctly.

We recommend using `xmllint` (Command Line) to validate your feed against our XSD file. You likely have `xmllint` installed on your machine, which can handle validation. In your terminal, type the following command:

```sh
xmllint -noout --schema olapicProductFeedV1_0.xsd my_company_feed.xml
```

### Delivering Your Product Feed

To keep a good sync between your inventory and Olapic, we need to update the feed on a scheduled basis. In order to do update regularly, we import the feed on a daily basis. The time of feed import varies, however we usually schedule our jobs to run at night or early in the morning. This way, your team can update the feed in the afternoon to have the updates in Olapic the next day.

You can make your PF available to Olapic using one of the following options:

* **SFTP Account**: Request your Integration Engineer to set up an account for your organization and then please upload your feed periodically to that account.
* **FTP Account**: Request your Integration Engineer to set up an account for your organization and then please upload your feed periodically to that account.
* **HTTP** Endpoint: Provide us with a URL where we can grab the feed. You can set HTTP Auth methods to secure the data if needed.

#### Note: feed update times

We run our feed importer every 24 hours, scheduled between 04:00 to 10:00 UTC. There is no exact time that the feed ingestion happens, so please deliver the feed before 04:00 UTC for the most up-to-date product data in Olapic.


### Updating Your Product Feed
Please note that if you want to change something in your product feed, we will have to be notified to make sure that the data schema does not break. Please contact your Integration Engineer if you have any changes to the feed scheduled.


## Creating Your Olapic Feed
We will focus on how to create your PF for Olapic, and explain which fields are necessary for a correct implementation.

### Olapic Feed Example
The following is an example of a valid feed you can provide. Link here: [http://olapic-data.s3.amazonaws.com/olapic/Olapic.xml](http://olapic-data.s3.amazonaws.com/olapic/Olapic.xml)

### Encoding & Basic Structure

We only support `UTF-8` encoding, so your XML feed must start with the following line:

```xml
<?xml version="1.0" encoding="utf-8"?>
```

As this will be an XML file, we will need a root node. We will use `<Feed>` as the root node as default. Inside the `<Feed>` node, we will have `<Products>` node with children nodes called `<Product>`.

Here is an example of the general schema:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Feed>
	<Categories>
		<Category>...</Category>
		<Category>...</Category>
	</Categories>
	<Products>
		<Product>...</Product>
		<Product>...</Product>
	</Products>
</Feed>
```

### `<Category>` Element Definition

We support category structure for each product in your e-commerce store. In order to use our *category_based widget*. If you want to use this feature, all you need to do is give us all the categories you will want to create in Olapic as child elements within the `<Categories>` element.

The `<Categories>` element can contain as many `<Category>` children nodes as you need.

You can build the `<Category>` elements using the following children elements:

| Element Name | Description | Required |
|--------------|-------------|----------|
| Name | The visible name of the category. | **Yes** |
| CategoryUniqueID | A unique ID for the category. <br>**Note: The value of this element can not be empty, contain white spaces or special characters such as ampersands (&).** | **Yes** |
| CategoryUrl | A URL where visitors can shop by this category, if you have one. **Include the full URL, with the schema(http/https)**. **This must be anyURI valid [1]** | Only if you use our *category_based* widget |

`Categories` node example:

```xml
<Categories>
	<Category>
		<CategoryUniqueID>cat1001</CategoryUniqueID>
		<Name>Men's</Name>
		<CategoryUrl>http://www.myawesomestore.com/categories/mens</CategoryUrl>
	</Category>
	<Category>
		<CategoryUniqueID>cat1002</CategoryUniqueID>
		<Name>T-shirts</Name>
		<CategoryUrl>http://www.myawesomestore.com/categories/mens/tshirts</CategoryUrl>
	</Category>
</Categories>
```

### `<Product>` Element Definition

`<Product>` will define product stream you want to import to Olapic. In essence, we will create a `stream` entity for every `<Product>` element.

Here is a list of possible elements you can use under `<Product>`. Please pay attention to the required elements:

| Element Name | Description | Required |
|--------------|-------------|----------|
| Name | The visible name of the product in your PDP.| **Yes** |
| ProductUniqueID | This is the unique identifier of the product. We treat this as an *unique* key and your organization will use it to call our widgets in your PDP. ***Note: The value of this element can not be empty or contain white spaces.***| **Yes** |
| ProductUrl | This is the URL we use when you click "Shop this look" in an Olapic viewer. This must take the visitor to a page to purchase the item. **Include the full URL, with the schema(http/https)**. **This must be anyURI valid [1]**| **Yes** |
| ImageUrl | This is the URL of the product primary image. The image that most represents your product in your PDP. **This must be anyURI valid [1]**| **Yes** |
| Description | This is a short and plain text description of the product. We use this in your Olapic Admin page, your visitors will not see it. *No HTML elements are recognized in this element*. | No |
| CategoryID | This is the unique identifier of the category related with this product. We use this in the *category_based* Widget. <br>**Note: The value here should match the `CategoryUniqueID` of the associated `<Category>` element. Note: The value of this element can not be empty or contain white spaces. If you don't have a valid ID to provide, please don't include the field** | Only if you use our *category_based* widget |
| CategoriesID | Contains at least one `<CategoryID>` element. | Only if you have multiples categories associated with this product |
| EAN | European Article Number, which is used world wide for marking retail goods. Can be a string of digits either 8 or 13 characters long. | No |
| EANs | Contains at least one `<EAN>` element. | Only if you use `<EAN>` elements or *syndication* [2] |
| UPC | Universal Product Code, which is the 6 - or 12- digit bar code used for standard retail packaging in the United States. The UPC must contain numerals only, with no letters or characters. Further, spaces and hyphens disrupt ***syndication*** [2] matching and must be removed. | Only if `<UPC>` elements must be used for *syndication* [2]
| UPCs | Contains at least one `<UPC>` element. | Only if you use `<UPC>` elements or *syndication* [2]|
| Price | This is the most significative price your visitor can see in you PDP. *Do NOT include the currency*. Only include the number with decimals separated by '.'. Example: 23.99 | No |
| Stock | This is an integer that represents your stock of this product | No |
| Availability | This is a bool representing the current status of this product. Should be consistent with your site. We can set `INACTIVE` galleries dynamically based on this value. *Expected values: {true, false, 0, 1}* | No |
| Color | This is a string with the color name of the product. Useful for color specific products. | No |
| ParentID | This is to support sub-streams levels. If this stream is not a root stream and, instead, it's a sub-stream of another stream, all you need to do is give us that ProductUniqueID here. We do the rest! Example: Color specific stream has as ParentID the non color specific stream.<br>**Note: The value of this element can not be empty or contain white spaces. If you don't have a valid ID to provide, please don't include the field** | Only if you need sub-stream support |
| Extras | Additional relevant product information can be provided in this node. Read more in [Extras](#extras)| No|

**Note: Fields marked as `required` must not be empty**

**[1] All URLs are of type xsd:anyURI:
URIs require that some characters be escaped with their hexadecimal Unicode code point preceded by the % character. This includes non-ASCII characters and some ASCII characters, namely control characters, spaces, and the following characters (unless they are used as delimiters in the URI): <>#%{}|\^`. For example, ../édition.html must be represented instead as ../%C3%A9dition.html, with the é escaped as %C3%A9. However, the anyURI type will accept these characters either escaped or unescaped. With the exception of the characters % and #, it will assume that unescaped characters are intended to be escaped when used in an actual URI, although the schema processor will do nothing to alter them. It is valid for an anyURI value to contain a space, but this practice is strongly discouraged. Spaces should instead be escaped using %20.**

**[2] Syndication is the process of distributing content collected from the main (Master) account down to the regional accounts.**

#### Product Availability / Inventory Logic

We want your organization to have full control of the streams, and in order to accomplish we give you the following attributes you can include in a `<Product>` element to be able to mark as `INACTIVE` streams or even delete them.

| Attribute Name | Description | Required |
|--------------|-------------|----------|
| removed | This is a bool you can use to remove products. If you set this to `true` then we will remove the stream associated with this product. Default: false. *Expected values: {true, false, 0, 1}* | No |
| disabled | This is a bool you can use to disable products. If you set this to `true` then we will set the stream associated with this product as INACTIVE. Default: false. *Expected values: {true, false, 0, 1}* | No |

**Note: Mark products with the appropriate attribute names/values in order to update the product status in Olapic. If the product node does not exist in the feed anymore, our system will not perform any actions against the product in the Olapic system.**

#### Providing Parent/Child Product Hierarchy
The above contains 4 `<Product>` nodes. Typically your feed will include all the products you have stored within your e-commerce platform.

For a better understanding of the product hierarchy requirement, please refer to [this guide](http://9odg7y.axshare.com/home.html).

At the simplest level, the product hierarchy is broken down into 2 levels:

- Parent (Style level)
- Child (Color level)

Parent level `<Product>` will include the "summation" of the child products being included in the feed.

Child level `<Product>` will include the `<ParentID>` element to denote the Parent `<Product>` related to this product.

Theoretically, you can have infinite number of levels. However, please consult your Integration Engineer on best practices on the product hierarchy required by Olapic.

**[!] Important Note:** We do not want any *size specific product* nodes unless it is a business requirement for the integration. Size levels are visually indistinguishable in product stock images as well as UGC, and their presence in the feed will complicate the moderation process.

#### Extras <a name="extras"></a>

This node allows you to deliver and store additional product information relevant to your implementation. Additional child nodes can be added as needed, as seen in the `Extras` node below:

**Example:**

```xml
<Product>
    <Name>OlaProd #0</Name>
    <ProductUniqueID>prod-0</ProductUniqueID>
    <ProductUrl>http://www.fakeshop.com/prod/?discount=1&amp;prodid=0</ProductUrl>
    <ImageUrl>http://images.fakeshop.com/prod/?cat=123&amp;prodid=0</ImageUrl>
    <Extras>
        <Delivery>International</Delivery>
        <Weight>4 lbs</Weight>
    </Extras>
<Product>
```

**Supporting Multiple Stock images**

Similarly, you can also provide alternate stock images for each product within the `Extras` node, respecting the same naming convention as seen below:

**Example:**

```xml
<Product>
    <Name>OlaProd #0</Name>
    <ProductUniqueID>prod-0</ProductUniqueID>
    <ProductUrl>http://www.fakeshop.com/prod/?discount=1&amp;prodid=0</ProductUrl>
    <ImageUrl>http://images.fakeshop.com/prod/?cat=123&amp;prodid=0</ImageUrl>
    <Extras>
        <ImageUrl01>http://images.fakeshop.com/prod/?cat=123&amp;prodid=0A</ImageUrl01>
        <ImageUrl02>http://images.fakeshop.com/prod/?cat=123&amp;prodid=0B</ImageUrl02>
    </Extras>
</Product>
```

