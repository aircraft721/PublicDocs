---
layout: article
title: Javascript Callbacks
resource: true
categories: [Javascript Widget]
---

The following document will cover the callback functions provided with the widget styles.

## Table of Contents

- [Overview](#overview)
- [jQuery selector](#jquery-selector)
- [List of Callback functions](#list-of-callback-functions)
  - [Wall (Gallery) Widget Callbacks](#wall-gallery-widget-callbacks)
  - [Carousel Widget Callbacks](#carousel-widget-callbacks)
  - [Upload Button Widget](#upload-button-widget)
- [Global Component Callbacks](#global-component-callbacks)
  - [Media Lightbox](#media-lightbox)
  - [Upload Process](#upload-process)
- [Using the Callback Object](#using-the-callback-object)
  - [Option 1](#option-1)
  - [Option 2](#option-2)

## Overview

Callbacks are provided for developers to have better control over specific events that happen along with the widget's render on a page. DOM manipulation becomes much easier and you can do all sorts of customization on top of our widgets.

As the Olapic JS loads on the page, it invokes a specific callback function depending on where the code execution is happening. For example, the Carousel Widget has a callback function named `olapicSliderAfterRender`, which runs when the DOM has been fully populated with the Olapic elements.

You can define a particular callback functions for each widget on the page, or within the `JS Callbacks` template assigned to each component to make the code deployment more consolidated.

## jQuery selector
The Olapic JS includes a namespaced version of jQuery that you can call using `oQuery` instead of the default `jQuery` or `$` selectors.

## List of Callback functions

### Wall (Gallery) Widget Callbacks

In the `JS Callbacks` template of the widget style, you will find the following code containing the list of available callback functions:

    <script type="text/javascript">
    /*
    use this template to refine the callbacks used on the widget
    Uncomment the following lines:

    var OlapicCallback = OlapicCallback || {};
    OlapicCallback.olapicWallItemsInjected = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallAfterLoadPage = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallAfterLoad = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallBatchCompleted = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallMouseHover = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallMouseOut = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallInitSorting = function(w){
        // place your code here
    };
    OlapicCallback.olapicWallAfterFilter = function(w){
        // place your code here
    };
    */
    {% raw %}</{{!}}script>{% endraw %}

#### olapicWallItemsInjected

Executes when:

* Sorting Type - Packery: after method appended
* Sorting Type - Normal: after `oQuery('.olapic-wall').append(e);` executes, where `e` is the new item on the olapic-wall

This callback fires just before `olapicWallInitSorting` executes.

Parameter: the widget object

#### olapicWallAfterLoadPage

Executes after a batch of items (page) are appended to the wall

Parameter: N/A

#### olapicWallAfterLoad: 

Executes when the init state of the wall is ready; at this point the following templates are rendered:

 * Body
 * Style
 * Callbacks

Parameter: N/A

#### olapicWallBatchCompleted:

Executes when all the photos (number of photos per page * number of pages to show) are loaded;

Just before this event fires, the 'Next page / Load more' button is rendered.

Parameter: N/A

#### olapicWallMouseHover

Executes on hover of each specific photo item (thumbnail item): uses `oQuery(elem).on('mouseenter')`

Parameter: N/A

#### olapicWallMouseOut

Executes on hover leave of each specific photo item (thumbnail item): uses`oQuery(elem).on('mouseleave')`

Parameter: N/A

#### olapicWallInitSorting

Executes when the sorting mode on the wall is initialized. This happens when:

* After the wall is initialized
* When you click on the 'grid' view button (if you have display option toggle turned on)

Parameter: the widget object

#### olapicWallAfterFilter

Executes after a stream/category filter is applied

Parameter: N/A

### Carousel Widget Callbacks

#### olapicSliderAfterRender
Executes when the widget is ready (rendered and functional)

#### olapicSliderBeforeInitCarousel
Executes just before the carousel is initialized

Parameter: the widget object

#### olapicSliderCarouselBeforePagination
If the carousel config is set to use `page` pagination, we run this method before calculating the pages. This happens when:

* during the carousel initialization
* on window resize
 
Parameter: the widget object

#### olapicSliderPrevToggle
Executes just before the prev animation start

#### olapicSliderNextToggle
Executes just before the next animation start

### Upload Button Widget

#### olapicButtonAfterRender

Executes when the button is ready (rendered and functional)

Parameter: the widget object

## Global Component Callbacks

### Media Lightbox

#### olapicViewer2AfterRender

Executes after the template `styles`,`overlay` and `callbacks` are rendered in the DOM

Parameter: the widget object

#### olapicViewer2AfterShow

Executes when the viewer rendering is complete (along with the media's data) and ready to be shown using `.show()`

Parameter: the widget object

#### olapicViewer2AfterClose

Executes after running `.hide()` (jQuery) on the `div.olapic_viewer_overlay`

Parameter: the widget object

### Upload Process

#### olapicUploaderAfterRender

Executes after the template ``modal`` and ``callbacks`` are rendered on the DOM

Parameter: the widget object

#### olapicUploaderBeforeOpen
Executes just before firing the function ``modal`` that opens the dialog box

Parameter: the widget object

#### olapicUploaderAfterClose

Executes in the callback from the close function of the [modal](http://getbootstrap.com/javascript/#modals-usage)

Parameter: the widget object

## Using the Callback Object
Usage of callbacks section is generally specific to the use case. We provide two ways for you to access the widget object (contains all widget configuration options) via Javascript if custom scripting is necessary.

### Option 1
The Uploader, Lightbox, and Carousel callback functions provide a callback object. You can see what object properties are available by logging it to the console. Example:

```
OlapicCallback.olapicSliderAfterRender = function(w){
    console.log(w);
}
```

### Option 2
Within all widgets you can retrieve the specific widget instance by using function below, make sure to reference the appropriate element id from the `<div>` tag.


```
olapic.getWidgetInstance('olapic_specific_widget');
```