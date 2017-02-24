---
layout: article
title: Olapic Standard Facebook Retargeting Export
resource: true
categories: [Exports]
---

## Overview

Olapic offers a standard, daily, full-file refresh, flat file export of
product id’s and the best User Generated Content (UGC) associated with
that product id for that day that can be used for Facebook retargeting
ad purposes. The feed’s format was designed per [*Facebook’s Product
Catalog
Guidelines*](https://developers.facebook.com/docs/marketing-api/dynamic-product-ads/product-catalog).

The UGC outputted will be an image-type, media content (photos) that
both 1) the client has obtained rights and permissions to share from the
user who generated the photo and 2) has been curated and approved for
publishing by the client (Published with Rights UGC).

There is the option to either have the photo with the highest Photorank
score associated with that product chosen, or the photo with the highest
click-through rate (CTR). Photorank is Olapic’s proprietary algorithm
scoring system that predicts the success of a photo based on 40+
criteria. Also note that if there is no Published with Rights UGC
associated with that Stream, then that product id record will be
excluded from the feed.

## File Specifications

**File Naming Convention:**
\[ClientNameID\]\_Olapic\_FB\_\[yyyymmddmiss\].csv

**File Format:** comma delimited, double quote qualifier, .csv
extension, unix line ending, header row per below.

**File Frequency:** daily, full file refresh.

**File Transfer Options:**

1.  Push to your ftp or sftp server via password authentication

2.  Pick up from an Olapic hosted ftp account with password authentication or an sftp account with PEM key authentication

**File Drop Time:** Configurable from 11pm to 10am UTC

**UGC Selection Option:** Highest photorank score or highest CTR

**File Layout Options:**

1.  UGC Image URL’s. Best one or up to 10 (in one field, comma separated).

##### File Layout:

| **Position** | **Header Field Name**  | **Description/Notes**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|--------------|------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 1            | id                     | The Product Id as passed thru on the product feed sent to Olapic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2            | availability           | Either will output ‘in stock’ or ‘out of stock’ based on product availability information passed to Olapic by the client.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| 3            | condition              | This information is not collected at Olapic and therefore is hardcoded to ‘new’ and will output as such.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 4            | description            | The Product Description as passed on the product feed sent to Olapic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 5            | image\_link            | Will output the best Published with Rights UGC image URL with the product, IF the option is chosen to output the one best UGC. If the option is chosen to output up to the best 10 UGC image URL’s, then the value outputted in this field will be the product’s stock photo image URL as passed thru on the product feed sent to Olapic. <br><br>Please note that with an Olapic UGC image URL, the size and type of of the image you would like to use can be surfaced by updating a specific part of the URL. It is the “normal” part in this example URL: https://photorankmedia-a.akamaihd.net/media/7/d/h/7dhejp3/**normal**.jpg. <br><br>However, you can update on your end as follows: <br>- square - 90x90 px image. Cropped, does not maintain ratio. <br>- thumbnail - 150x150 px image. Maintains ratio. <br>- mobile - 320x320 px image. Maintains ratio. <br> - normal - 640x640 px image. Maintains ratio.<br>- original - Original image without modifications. |
| 6            | link                   | The Product Page URL as passed on the product feed sent to Olapic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| 7            | title                  | The Product Name as passed on the product feed sent to Olapic.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 8            | price                  | The Price as passed on the product feed sent to Olapic plus the ISO 4217 currency code. Otherwise 0.00 USD will output instead.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 9            | brand                  | The Client Name ID, internally known as the client’s template directory.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| 10           | additional\_image\_link | Optional field. Up to 10 best, Published with Rights UGC URL’s associated with this product in a comma separated fashion. If up to 10 best UGC is not chosen, then the 10th field will not output and this will be a file layout file consisting of 9 fields only.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
<br>
##### Sample Default File Layout With Top UGC:


| **id** | **availability** | **condition** | **description** | **image\_link** | **link** | **title** | **price** | **brand** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 176 | in stock | new | This shirt is covered with amazing flowers. | [https://photorankmedia-a.akamaihd.net/media/d/2/i/socno6/normal.jpg](https://photorankmedia-a.akamaihd.net/media/d/2/i/socno6/normal.jpg) | [http://www.someolapicclient.com/product/176/daisyshirt/index.tmpl](http://www.someolapicclient.com/product/176/daisyshirt/index.tmpl) | Daisy Shirt | 25.99 USD | freelove |
| 177 | in stock | new | This top has a colorful plaid print that is still classic. | [https://photorankmedia-a.akamaihd.net/media/d/2/i/socno71/normal.jpg](https://photorankmedia-a.akamaihd.net/media/d/2/i/socno71/normal.jpg) | [http://www.someolapicclient.com/product/176/classicplaid/index.tmpl](http://www.someolapicclient.com/product/176/classicplaid/index.tmpl) | Classic Plaid | 35.00 USD | freelove |
| 201 | out of stock | new | This jacket is the perfect edgy jacket for fall. | [http://www.someolapicclient/images/products/152x358/SOC201\_152x358.jpg](http://www.someolapicclient/images/products/152x358/SOC201_152x358.jpg) | [http://www.someolapicclient.com/product/201/daisyshirt/index.tmpl](http://www.someolapicclient.com/product/201/daisyshirt/index.tmpl) | Biker Jacket | 0.00 USD | freelove |


