---
layout: article
title: Analytics API V2 Tracking Guidelines
resource: true
categories: [API Resources]
---

## Table of contents

- [Concepts](#concepts)
- [Widget Types](#widget-types)
- [Script Logic](#script-logic)
    - [1. The Cookie](#-the-cookie)
    - [2. Widget events](#-widget-events)
        - [Do the `render` event!](#do-the-render-event)
        - [Do the `move` event!](#do-the-move-event)
        - [Do the `upload_click` event!](#do-the-uploadclick-event)
    - [3. Media events](#-media-events)
        - [Do the `click` event!](#do-the-click-event)
        - [Do the `view` event!](#do-the-view-event)
        - [Do the `move` event!](#do-the-move-event)
        - [Do the `close` event!](#do-the-close-event)
    - [4. Product `shop` event](#-product-shop-event)

## Concepts

API build should support event tracking for following events on **widgets**:

- **Render:** Tracks when a widget is rendered (impression)
- **Move:** Tracks clicks on slider move or new page loaded (interaction)
- **Upload click:** Tracks clicks on the upload photo button (interaction)

Separate from the widget, we should track events related to a specific **media**:

- **Click:** Tracks clicks in a media
- **View:** Tracks when the media is being rendered (e.g., viewer is finished loading)
- **Move:** Tracks when you move to the next/prev media (navigation within the viewer, optional)
- **Close:** Track media close clicks (e.g., viewer close button click)
- **Shop product:** Tracks click in ‘Shop thip product’ link in a media (which redirects the user to the PDP)

## Widget Types

Each request must be associated to a particular type of widget that you are displaying on the page. There are 3 main widget types:

- Category
  - Any widgets that are displaying category content. E.g., Widget that lives on a category display page.
- Stream
  - Any widgets that are displaying product specific content. E.g., Widget that lives on a product display page.
- Best photos
  - Any widgets that are displaying gallery content. E.g., Gallery widget that lives on a standalone page should be considered "Best photos" widget. Basically, anything that falls outside of "Category" or "Stream" widget types.

# Script Logic

**[!] Important note:** All tracking events require an "instance" ID. This means that an event will always have to be associated with a particular widget instance. At any time you are building an API implementation, there should be a corresponding widget instance created in Olapic.

For example, if you have a gallery widget built out using our API, create a widget instance called "Gallery widget" (or any type of naming convention you want to use), and have that be the "dummy" instance.

This is particularly due to our upcoming feature in the roadmap where the user will be able to segment the data in our Analytics tab. Imagine a dropdown menu with the different "widget instances", and be able to see data pertaining to those integration points. This is not complete yet, but tying an event with a widget instance will allow us to organize the data.

## 1. The Cookie

When widget loads on the page, first thing that the code should do is generate a value for `__olapicU` (this is the key name for the cookie). You can use any type of random number/string generator to generate one.

Here is an example random hash generator that you can use:

```js
function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
var rString = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
```

On subsequent loads, cookie key/value should be checked. The logic is as follows:

1. Check if `__olapicU` cookie key/value exists
2. If it exists, store the cookie value in a variable, or reference it later when making the `GET` request
3. If it doesn't exist, generate a random hash, store the value in a cookie key called `__olapicU` with expiration date of 1 month from current date.

The value for `__olapicU` cookie key should be used as the parameter value for `analytics_id` mentioned in all of the event requests.

## 2. Widget events

Reference to API doc - http://data.photorank.me/api.html#widget-track

As stated earlier, any events related to the actual widget should be tracked accordingly. The widget event conventions are as follows:

```sh
http://data.photorank.me/track/widget/{instance_id}/best/{action}{?analytics_id,pics,ab_testing,segment}
```

We will be using `best` widget type for the following examples.

### Do the `render` event!

After the cookie is generated & set, and everything is ready to go on the page, a `GET` request must be made to track the `render` event:

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/render?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

### Do the `move` event!

When the user interacts with the widget (any events that are associated with things like navigation, infinite load trigger, etc), we need to track the `move` event.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/move?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

### Do the `upload_click` event!

When the user interacts with the widget (any events that are associated with things like navigation, infinite load trigger, etc), we need to track the `move` event.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/move?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

## 3. Media events

Reference to API doc - http://data.photorank.me/api.html#media-track

Any events that are related to a specific media (photo thumbnail click, photo viewer events, etc) must be tracked.

```sh
http://data.photorank.me/track/widget/{instance_id}/best/media/{media_id}/{action}{?analytics_id,pics,ab_testing,segment}
```

We will be using `best` widget type for the following examples.

### Do the `click` event!

When any thumbnail elements (within a gallery/carousel widget) are clicked on, we need to track the `click` event.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/media/430889187/click?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

### Do the `view` event!

When any media is being "viewed" (launched in a viewer modal, or photo zoom effect, etc), we need to track the `view` event.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/media/430889187/view?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

### Do the `move` event!

When the user navigates to a different media (navigating to prev/next photo in the modal, or navigating to the prev/next photo in the zoom view, etc), we need to track the `move` event.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/media/430889187/move?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

### Do the `close` event!

When the user exits out of the media view mode (closing out of a viewer lightbox, or closing out of the photo zoom mode), we need to track the `close` event

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/media/430889187/close?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1
```

## 4. Product `shop` event

Reference to API doc -  http://data.photorank.me/api.html#media-track-best-photos-widget-"shop-this-product"-click

When the user clicks on a product link related to the particular UGC being shown, we need to track the `shop` event. This link should actually be used in place of the `href` or the product link since it has a redirect logic on its own. For example, if you navigate to the working example below, you will be redirected to the link that you insert as `redirect_url` param.

One note: when you insert a `redirect_url` as one of the params, this is the actual URL that you are sending the user to. If you are consuming the `shop_button_url` from our Photorank API, you don't have to use this event. This param should be encoded properly so that the call doesn't break.

Working example:

```sh
http://data.photorank.me/track/widget/db1a999d0783780b1a47aaddbc8dd793/best/media/430889187/shop?auth_token=f48eeae508d1b1f3133df366679eb2b567bae5dc8058d69d679dc5cb140eb857&analytics_id=abcd1234&pics=1&redirect_url=http%3A%2F%2Fwww.jaesawesomestore.com%2Fmyproduct
```