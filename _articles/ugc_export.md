---
layout: article
title: Olapic Standard Product UGC Export
resource: true
categories: [Data Export]
---

## Overview

Olapic offers a standard, daily, full-file refresh, flat file export of
product id’s and the best User Generated Content (UGC) associated with
that product id for that day. The UGC outputted will be an image-type,
media content (photos) that both 1) the client has obtained rights and
permissions to share from the user who generated the photo and 2) has
been curated and approved for publishing by the client (Published with
Rights UGC).

There is the option to either have the photo with the highest Photorank
score associated with that product chosen, or the photo with the highest
click-through rate (CTR). Photorank is Olapic’s proprietary algorithm
scoring system that predicts the success of a photo based on 40+
criteria.

Various layouts available; please see specs below for options.

## File Specifications

**File Naming Convention:**
\[ClientNameID\]\_Olapic\_ProductUGC\_\[yyyymmddhhmiss\].csv

**File Format:** comma delimited, double quote qualifier, .csv
extension, unix line ending, header row per below.

**File Frequency:** daily, full file refresh.

**File Transfer Options:**

1.  Push to your ftp or sftp server via password authentication

2.  Pick up from an Olapic hosted ftp account with password authentication or an sftp account with PEM key authentication

**File Drop Time:** Configurable from 11pm to 10am UTC

**UGC Selection Option:** Highest photorank score or highest CTR

**File Layout Options:**

1. UGC Image URL&#39;s.  Best one or up to best 10.  If up to 10, in one field comma separated or in 10 separate fields.
2. Optional category information.  Up to 10 categories associated with the product will appear on the end of the file within a field named Categories, comma separated.

#### Default File Layout

| **Position** | **Header Field Name** | **Description / Notes** |
| --- | --- | --- |
| 1 | ProductID | The Product ID as passed thru on the product feed sent to Olapic. |
| 2 | Title | The Product Name as passed thru on the product feed sent to Olapic. |
| 3 | URL | The Product Page URL as passed thru on the product feed sent to Olapic. |
| 4 | Price | The Product Price as passed thru on the product feed sent to Olapic. |
| 5 | Creator | &quot;Stock&quot; if the subsequent &quot;ImageUrl&quot; field is the stock photo from the client&#39;s product feed; &quot;Olapic&quot; if the &quot;ImageUrl&quot; is UGC collected by Olapic. Please note that if there is no Published with Rights UGC associated with that product, the &quot;Stock&quot; flag value will appear.  Otherwise the best UGC associated with that product. |
| 6 | ImageUrl | Image URL of either the stock photo or the best Published with Rights UGC associated with that product.<br><br>Please note that with an Olapic UGC image url, the size and type of of the image you would like to use can be surfaced by updating a specific part of the url.  It is the &quot;normal&quot; part in this example url:  https://photorankmedia-a.akamaihd.net/media/7/d/h/7dhejp3/**normal**.jpg.<br><br>However, you can update on your end as follows:<br>- square - 90x90 px image. Cropped, does not maintain ratio.<br>- thumbnail - 150x150 px image. Maintains ratio.<br>- mobile - 320x320 px image. Maintains ratio.<br>- normal - 640x640 px image. Maintains ratio.<br>- original - Original image without modifications.|
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
| 1 | ProductID | The Product ID as passed thru on the product feed sent to Olapic. |
| 2 | Title | The Product Name as passed thru on the product feed sent to Olapic. |
| 3 | URL | The Product Page URL as passed thru on the product feed sent to Olapic. |
| 4 | Price | The Product Price as passed thru on the product feed sent to Olapic. |
| 5 | Creator | &quot;Stock&quot;flag value will output, to indicate that the subsequent ImageUrl will contain the stock photo from the client&#39;s product feed passed to Olapic. |
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
| 1 | ProductID | The Product ID as passed thru on the product feed sent to Olapic. |
| 2 | Title | The Product Name as passed thru on the product feed sent to Olapic. |
| 3 | URL | The Product Page URL as passed thru on the product feed sent to Olapic. |
| 4 | Price | The Product Price as passed thru on the product feed sent to Olapic. |
| 5 | Creator | &quot;Stock&quot;flag value will output, to indicate that the subsequent ImageUrl will contain the stock photo from the client&#39;s product feed passed to Olapic. |
| 6 | ImageUrl | Image URL of the stock photo associated with that product. |
| 7 | additional\_image\_link | Up to 10 UGC image url&#39;s, comma separated.  Empty if none available. |
| 8 | Categories | Up to 10 category names of the categories associated with this product via the product inventory feed passed to Olapic, comma separated.  Empty if none available. |