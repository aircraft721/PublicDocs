---
layout: article
title: Load Optimization Guide
resource: true
categories: [Javascript Widget]
---

The following document will cover the optimization techniques in regards to the Olapic Javascript Widget implementation.

## Table of Contents

- [Overview](#overview)
- [Load Sequence Control](#load-sequence-control)
  - [Example 1 - Sequence Control Over `script` Tags](#example---sequence-control-over-script-tags)
  - [Example 2 - Using the SDK Load Method](#example---using-the-sdk-load-method)
- [Use Appropriate Image Size](#use-appropriate-image-size)
- [Lazy Loading Image Assets](#lazy-loading-image-assets)
- [Configure Number of Photos](#configure-number-of-photos)

## Overview

At Olapic, we understand that Olapic Javascript Widgets are implemented across various site environments with varying degrees of third party integrations already implemente on the page.

In efforts to keep the browser resource utilization low, you can follow our best optimization techniques to lower the overall footprint of the Olapic Javascript Widget takes up on the page.

## Load Sequence Control
The `async` attribute in our widget code means that Olapic code will not block any other scripts from loading. However, the browser thread will still be allocated to initially load the Olapic script (as any other resource on the page). If you have any other content on the page that you would like to prioritize ahead of loading Olapic assets, move the script tag in the source code of the page or utilize SDK load method to manually define when the widget should load. 

Tag managers are also great tools to control load sequence of resources.

See below for some specific examples:

### Example 1 - Sequence Control Over `<script>` Tags
Moving the script tag: Place the Olapic <script> after the scripts that you wish to prioritize. This is the easiest method.

```
<html>
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
    <div id="olapic_specific_widget"></div>

    <script type="text/javascript" src="script_A.js"></script>
    <script type="text/javascript" src="script_B.js"></script>

    <!-- Olapic script will not load until script A and script B are done loading -->
    <script type="text/javascript" src="https://photorankstatics-a.akamaihd.net/81b03e40475846d5883661ff57b34ece/static/frontend/latest/build.min.js"  data-olapic="olapic_specific_widget" data-instance="a766540c1b6234ec23828cf9c8ec5fc2" data-apikey="f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857" async="async"></script>

    <!-- When Olapic script starts to load, it will not block the browser from initiating load for script C -->
    <script type="text/javascript" src="script_C.js"></script>
</body>
</html>
```

### Example 2 - Using the SDK Load Method 

The Olapic SDK load method gives you best flexibility in terms of programmatically invoking the widget on demand. Here's the detailed step-by-step technical guide: https://olapic1.zendesk.com/hc/en-us/articles/203456360-SDK-Widget-Load-Method.

## Use Appropriate Image Size
Our API provides different versions of the static image assets for you to pick and choose from. See the **Media Sizing Options** section of our API documentation for specific details. 

Link: [http://apiv2-docs.photorank.me/#header-media-sizing-options](http://apiv2-docs.photorank.me/#header-media-sizing-options)

You can also use different image sizing in the template editor as well:

![](./img/optimization-js-template.jpg)

## Lazy Loading Image Assets
Incorporate lazy load logic into Carousel Widgets, only the photos within the user view will be loaded. Here's sample code to make the Olapic Carousel widget lazy load, make sure to make minor adjustments to the item and callbacks file depending on the existing markup.

**JS Callbacks:**

    <script type="text/javascript">
    var OlapicCallback = OlapicCallback || {};
    OlapicCallback.olapicSliderAfterRender = function(w){
        var $self = oQuery('#' + w.wrapperId);
        var firstLoad = Math.ceil(window.screen.availWidth / 277) + 1;
        
        oQuery('.olapic-carousel .olapic-item', $self).each(function(i, val) { 
            if (i < firstLoad) {
                oQuery(this).css('background-image','url(' + oQuery(this).attr('data-image') + ')').data( 'loaded' , '1' );
            }
        });
        oQuery('.olapic-nav-button', $self).click(function() {
            var $previous = oQuery('.olapic-carousel .olapic-item', $self).filter(function() { 
                return oQuery(this).data('loaded') != true 
            });
            
            if ( oQuery(this).hasClass('olapic-nav-next') ) {
                $previous.first().css('background-image','url(' + $previous.first().attr('data-image') + ')').data('loaded','1');
            } else {
                $previous.last().css('background-image','url(' + $previous.last().attr('data-image') + ')').data('loaded','1');
            }
        });
    };
    </{{!}}script>

**Item:**

    <li class="{{this.source}}">
      <a href="#" class="olapic-item" data-url="{{this._links.self.href}}" title="{{this.caption}}" data-image="{{this.images.mobile}}">
        <span class="olapic-type-{{this.type}}"><i></i></span>
      </a>
    </li>

## Configure Number of Photos
Optimize the # of photos that gets loaded in the widget depending on the use case. You can configure this in the respective Widget Configurations:

![](./img/optimization-widget-config.jpg)

