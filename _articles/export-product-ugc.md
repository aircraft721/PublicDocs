---
layout: article
title: Standard Product UGC Export
resource: true
categories: [Exports]
---

## Overview

Olapic offers a flat file CSV export solution (including basic product information and the associated best user generated content) for the purpose of external integrations that require user generated content from Olapic. The associated UGC product images included in the CSV will be curated by the client, and have rights & permissions obtained from the original user who generated the photo.

There are two choices in regards to the inclusion of product image(s) in the feed:
* The image with the highest Photorank score associated with the product. Photorank is Olapic’s proprietary algorithm scoring system that predicts the success of a photo based on 40+ attributes.
* The image with the highest click-through rate (CTR).

Various CSV layouts are available; please see specifications below for different options.

## File Specifications

**File Naming Convention:**
\[ClientNameID\]\_Olapic\_ProductUGC\_\[yyyymmddhhmiss\].csv

**File Format:** Comma delimited, double quote qualifier, .CSV
extension, Unix line ending, header row per below.

**File Frequency:** Daily, full file refresh.

**File Transfer Options:**

1.  Push to your FTP or SFTP server via password authentication
2.  Pick up from an Olapic hosted ftp account with password authentication or an sftp account with PEM key authentication

**File Drop Time:** Configurable from 11pm to 10am UTC

**UGC Selection Option:** Highest Photorank score or highest click-through rate

**File Layout Options:**

1. UGC Image URL options:
  * Best image associated with the product (default)
  * Up to ten best images associated with the product
<br><br>
2. Optional product category information: up to 10 categories associated with the product will be added to a final "Categories" row.
<br><br>
3. Filters: 
- You can choose the media size we export to the UGC Image URL.
- (Optional) You also have the option of only exporting square images from one of these selected media sizes.
  * Original - Original image without modifications (not necessarily square)
        * When selected, you can export only square images greater than a specified pixel width
  * Normal - 640x640px image. Maintains ratio (not necessarily square)
  * Mobile - 320x320px image. Maintains ratio (not necessarily square)
  * Thumbnail - 150x150px image. Maintains ratio (not necessarily square)
  * Square - 90x90px image. Cropped and does not maintain ratio

#### Default File Layout

| **Position** | **Header Field Name** | **Description / Notes** |
| --- | --- | --- |
| 1 | ProductID | The product id as represented in the original feed provided by the client. |
| 2 | Title | The product name as represented in the original feed provided by the client. |
| 3 | URL | The product page URL as represented in the original feed provided by the client. |
| 4 | Price | The product price as represented in the original feed provided by the client. |
| 5 | Creator | &quot;Stock&quot; if the subsequent &quot;ImageUrl&quot; field is the stock photo from the client&#39;s product feed; &quot;Olapic&quot; if the &quot;ImageUrl&quot; is UGC collected by Olapic. Please note that if there is no Published with Rights UGC associated with that product, the &quot;Stock&quot; flag value will appear.  Otherwise the best UGC associated with that product. |
| 6 | ImageUrl | Image URL of either the stock photo or the best Published with Rights UGC associated with that product.|

<br>

##### Sample Default File Layout:

| **ProductID** | **Title** | **URL** | **Price** | **Creator** | **ImageUrl** |
| --- | --- | --- | --- | --- | --- |
| 176 | Daisy Shirt | [http://www.someolapicclient.com/product/176/daisyshirt/index.tmpl](http://www.someolapicclient.com/product/176/daisyshirt/index.tmpl) | 25.99 | Olapic | [https://photorankmedia-a.akamaihd.net/media/d/2/i/socno6/normal.jpg](https://photorankmedia-a.akamaihd.net/media/d/2/i/socno6/normal.jpg) |
| 177 | Classic Plaid | [http://www.someolapicclient.com/product/176/classicplaid/index.tmpl](http://www.someolapicclient.com/product/176/classicplaid/index.tmpl) | 35.00 | Olapic | [https://photorankmedia-a.akamaihd.net/media/d/2/i/socno71/normal.jpg](https://photorankmedia-a.akamaihd.net/media/d/2/i/socno71/normal.jpg) |
| 201 | Biker Jacket | [http://www.someolapicclient.com/product/201/daisyshirt/index.tmpl](http://www.someolapicclient.com/product/201/daisyshirt/index.tmpl) | 99.50 | Stock | [http://www.someolapicclient/images/products/152x358/SOC201\_152x358.jpg](http://www.someolapicclient/images/products/152x358/SOC201_152x358.jpg) |
| 151 | Pleated Maxi | [http://www.someolapicclient.com/product/151/pleatmaxi/index.tmpl](http://www.someolapicclient.com/product/151/pleatmaxi/index.tmpl) | 55.99 | Olapic | [https://photorankmedia-a.akamaihd.net/media/d/2/i/socno25/normal.jpg](https://photorankmedia-a.akamaihd.net/media/d/2/i/socno25/normal.jpg) |

<br>

#### File Layout With Additional Images Option In Separate Fields:

| **Position** | **Header Field Name** | **Description / Notes** |
| --- | --- | --- |
| 1 | ProductID | The product id as represented in the original feed provided by the client. |
| 2 | Title | The product title as represented in the original feed provided by the client. |
| 3 | URL | The product page URL as represented in the original feed provided by the client. |
| 4 | Price | The product price as represented in the original feed provided by the client. |
| 5 | Creator | &quot;Stock&quot; flag value will output, to indicate that the subsequent ImageUrl will contain the stock photo from the client&#39;s product feed passed to Olapic. |
| 6 | ImageUrl | Image URL of the stock photo associated with that product. |
| 7 | Image\_1 | The image url of the best UGC associated with that product, if available.  Empty if none available. |
| 8 | Image\_2 | The image url of the second best UGC associated with that product, if available.  Empty if none available. |
| 9 | Image\_3 | The image url of the third best UGC associated with that product, if available.  Empty if none available. |
| 10 | Image\_4 | The image url of the fourth best UGC associated with that product, if available.  Empty if none available. |
| 11 | Image\_5 | The image url of the fifth best UGC associated with that product, if available.  Empty if none available. |
| 12 | Image\_6 | The image url of the sixth best UGC associated with that product, if available.  Empty if none available. |
| 13 | Image\_7 | The image url of the seventh best UGC associated with that product, if available.  Empty if none available. |
| 14 | Image\_8 | The image url of the eighth best UGC associated with that product, if available.  Empty if none available. |
| 15 | Image\_9 | The image url of the ninth best UGC associated with that product, if available.  Empty if none available. |
| 16 | Image\_10 | The image url of the tenth best UGC associated with that product, if available.  Empty if none available. |

<br>

#### File Layout With Additional Images Option In One Field Plus Category Option:

| **Position** | **Header Field Name** | **Description / Notes** |
| --- | --- | --- |
| 1 | ProductID | The product id as represented in the original feed provided by the client. |
| 2 | Title | The product name as represented in the original feed provided by the client. |
| 3 | URL | The product page URL as represented in the original feed provided by the client. |
| 4 | Price | The product price as passed thru on the product feed sent to Olapic.as represented in the original feed provided by the client. |
| 5 | Creator | &quot;Stock&quot; flag value will output, to indicate that the subsequent ImageUrl will contain the stock photo from the client&#39;s product feed passed to Olapic. |
| 6 | ImageUrl | Image URL of the stock photo associated with that product. |
| 7 | additional\_image\_link | Up to 10 UGC image url&#39;s, comma separated.  Empty if none available. |
| 8 | Categories | Up to 10 category names of the categories associated with this product via the product inventory feed passed to Olapic, comma separated.  Empty if none available. |