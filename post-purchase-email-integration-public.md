---
layout: article
title: Implementing Post-Purchase Email
resource: true
categories: [Resources]
---

The Post-Purchase Email integration allows customers to add a direct upload link to their post purchase email with a call to action to upload images. There are two methods for a customer to integrate Olapic into their post-purchase email flow.

## Method 1: Via Clients Email Service Provider

Using their current email service provider, a client may inject and style out an Olapic upload button directly into their existing email template in the form of a static a-link on the page.

This upload button will redirect the user to the client's Olapic upload process, where the user will take the usual steps of uploading a photo from their hard drive or other social media source.


### Link code example:

```markup
<a href="http://www.photorank.me/uploader/your_directory?gallery=null&tag_based_key=null&lang=en_US">Upload a photo!</a>
```

#### Link Parameters

* `your_directory` - Replace this with the account ID provided by the Integration Engineer.
* `gallery=null` - `null` here can be replaced with a gallery ID provided by the Integration Engineer to automatically tag images to a specific gallery.
* `tag_based_key=null` - `null` here can be replaced with a specific product ID from the product feed to automatically tag a picture to a specific product.
* `lang=en_US` - `en_US` here can be replaced with another language identifier to have the language in the Olapic up-loader change for multiple countries if that feature is installed and configured for the account.

You can place and style the link code anywhere in your email template using the above convention.

## Method 2: Via Olapic's Post-Purchase Template

A client can also choose for the user to receive a post-purchase email directly from Olapic (This method is not preferred, as Olapic shouldn't be providing an email service).

The Post-Purchase template will then be styled within in the Appearance editor:

<img src="http://olapic-data.s3.amazonaws.com/docs/screenshots/appearance-postpurchase-email.png" />
