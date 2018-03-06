---
layout: article
title: Intro to Product Feeds
resource: true
categories: [Product Feed]
---

# What is a Product Feed?

The Product Feed (sometimes referred to as "PF") is important because it unlocks many important features of the Olapic platform, such as: media syndication, shoppability, content organization, automatic updates, and more. Via the PF, we can import the product catalog data on your e-commerce website in an automated fashion. This includes product metadata such as: product name, product URL, product image URL, product availability, category information, etc.

When we process your Product Feed, each product from the Product Feed becomes a stream. You can think of streams as folders. When Olapic collects content on behalf of your brand, the content must be organized and tagged to different streams as they pass through the curation process. Once Olapic processes your Product Feed, you are able to tag the content to the streams that mirror the products from your Product Feed. The point being, you're matching the product that is represented in the user-generated image.

With the product streams created in your Olapic account and the content tagged to corresponding product streams, Olapic widgets implemented across your site can display the user-generated images, along with the products tagged to the content. Your site visitors can interact with the user-generated content and click on the tagged products to navigate to the corresponding product page. This helps drive click-through to product pages & ultimately lead the visitor to conversion.

While you can create the product streams manually in the Olapic dashboard, it's much harder to create a shoppable experience out of your user-generated content (UGC) in an automated fashion without the Product Feed, especially if your product catalog consists of hundreds to thousands of products. The Product Feed allows us to import your catalog at scale as well as maintain the most up-to-date state of your products.

**In short, here are main functions of a Product Feed:**

* **Stream Creation**

	Automatic product stream (folder) creation in the Olapic platform for each unique product on your product feed.
	Each stream will automatically include the name, product URL, image URL, and product ID (and any extra information) from your product feed.

* **Enable Shoppable Content**

	In order to make user-generated-content shoppable, it needs to be "tagged" to a product stream within the platform. Therefore, the product feed fuels the shoppable experience.
	The "Shop This Look" area of the media lightbox features tagged product streams and the product link.

* **Platform Sync**
	
	Olapic processes your Product Feed daily, which means our platform will stay in-sync with your product catalog data as changes are introduced on the e-commerce platform.
	
	Updates to the product names, product URLs or images can be made easily & automatically by the feed.

	Products can be added or removed or flagged as out of stock easily via the feed.

* **Multi-Account Setup**

	Product Feed integration is a pre-requisite of the multi-account structure.
	
	Images tagged to product streams in the master account can be synced with the related child accounts as long as the matching product streams exist on both master and child accounts.

# What type of feed is the best for the Olapic integration?

Although Olapic can support a custom schema feed, sending the Product Feed in an Olapic schema enables your brand to take full advantage of feature set available in the Olapic platform. 

At a high level, here are main advantages of using an Olapic Product Feed:

* Faster integration time (speedier feed validation & import)
* Ability to remove products or delete completely.
* Supports multiple Universal ID (UPC, EAN) per product
* Supports multiple categories per product
* Enables support for Category Widgets
* Automated feed validation (syntax issues, broken URLs, etc.)

Here are the in-depth explanations and examples of each point mentioned above:

* **Faster integration time**
	
	Typically the product feed integration is the most crucial step during onboarding. Olapic can significantly speed up the implementation time required to automate a product feed if your brand provides an Olapic Product Feed. This allows your brand to go live with Olapic sooner!

* **Product Deletion Functionality**

	You can delete product streams by marking them in the Olapic schema feed, keeping the product data within your brand's Olapic account to stay clean without build-up of old product inventory.

* **Multiple UPC association**

	You can associate multiple UPC's to a product using an Olapic Schema. Whereas in a custom feed, a Brand is limited to a single UPC association per parent product. This is one of the requirements for brand-to-retailer syndication feature.

* **Multiple Category association**

	You can associate multiple categories to a product using the Olapic Schema. Whereas in a custom feed, a Brand is limited at a single category association per product, typically either the highest level or most granular level.

	This is an important feature as it allows for better use of Dynamic Category widgets, as well as enabling category filters on gallery widgets.

	As an example, if you go to Brand's website and look under the Product's section, a user can usually see the product hierarchy. If you see a product is within Category A, that same product could also be associated to Category B or C. However, the Brand would be forced to pick only one of the categories to associate the product with if using a custom feed. This would limit how many category pages you could place an Olapic UGC widget on. 

* **Automated Feed Validation**

	With an Olapic Product Feed, Olapic will validate your Olapic Product Feed against the Olapic Schema validator upon every import. This means that if there is ever a syntax issue with any given XML nodes, our Support Team is alerted and are able to follow up with your technical contacts. With a custom feed implementation, the responsibility is on your Brand to validate the feed against your own schema and ensure that that there are no issues. If there is a syntax error in the feed, that product is skipped and not imported.

* **Faster modifications to feed structure**

	If something in the feed needs to be changed / updated (ex: add category information to the feed), there is typically less coordination or implementation updates that need to be made on Olapic's side to support the change in the case of an Olapic Product Feed.

	* You should still notify your Olapic contact if you are making changes to your Product Feed so we can advise and monitor.

	Whereas typically an update to a custom feed requires implementation and code review effort on Olapic's side.

	* Since everything is manually mapped for a custom feed, an update to a custom feed will also typically require an update on Olapic's side.

# Business Requirements for the Product Feed

Beyond determining what feed format to send the Product Feed in & the minimum required fields, another important piece of the Product Feed is determining which Product Hierarchy fits your UX needs in the front-end display of the website. Here are the Product Hierarchy types that you can include in your Product Feed and the UX impacts to consider.

* **Single-level Product Hierarchy**
* **Multi-level Product Hierarchy**

Let's dive into the UX impacts of each Product Hierarchy types.

##  Single-level Product Hierarchy

Single-level Product Hierarchy features products in the Product Feed represented as standalone products, without any relationships to other products.

When using this Product Hierarchy type, you will be tagging collected images to parent products (we also call this a "master level" product).

**UX Outcome:** The product line is shown as the associated product in the Olapic media lightbox. The user is able to navigate to the product display page and then decide which color they want to view/purchase.

![Single-level Product Hierarchy - Olapic Lightbox UX](../img/product-feed-option-a.png){:width="600px"}

This is typically the cleanest and easiest option. Your Olapic account will be tidier, moderation will be quick and easy with this option as there are less Product streams to search against. Creating the feed is typically easier as well.

The XML in the Product Feed would look something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Feed>
    <Products>
        <Product>
            <Name>Awesome Possum T-shirt</Name>
            <ProductUniqueID>APTS</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/APTS</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/APTS.jpg</ImageUrl>
        </Product>
        <Product>
            <Name>Bedazzled Jeans</Name>
            <ProductUniqueID>BDZJ</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/BDZJ</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/BDZJ.jpg</ImageUrl>
        </Product>
        <Product>
            <Name>Fluffy Sweater</Name>
            <ProductUniqueID>FFFS</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/FFFS</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/FFFS.jpg</ImageUrl>
        </Product>
    </Products>
</Feed>
```

**XML Explained:** Each `<Product>` node represents an individual product at the master level (terminology may differ depending on e-commerce systems and businesses). No specific color-variant products are included in the feed.

## Multi-level Product Hierarchy

Multi-level Product Hierarchy features products in the Product Feed represented as grouped products with relationships that link back to master level products.

When using this Product Hierarchy type, you will be tagging collected images to variant products (also may be referred to as "SKU level" products).

**UX Outcome:** The product with the matching color is shown as the associated product in the lightbox. Tagging the content to the variant products also automatically tags to the master level product. This also gives you the option to display all color variants in a PDP widget, while having the color specific variant display in the lightbox.

![Multi-level Product Hierarchy - Olapic Lightbox UX](../img/product-feed-option-b.png){:width="600px"}

This type of hierarchy support is most beneficial for brands where featuring colorways of the products is especially important, like cosmetic companies.

The XML in the Product Feed would look something like this:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Feed>
    <Products>
        <Product>
            <Name>Awesome Possum T-shirt</Name>
            <ProductUniqueID>APTS</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/APTS</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/APTS.jpg</ImageUrl>
        </Product>
        <Product>
            <Name>Awesome Possum T-shirt in Blue</Name>
            <ProductUniqueID>APTS-BLUE</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/APTS?sku=BLUE</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/APTS-BLUE.jpg</ImageUrl>
            <Color>Blue</Color>
            <ParentID>APTS</ParentID>
        </Product>
        <Product>
            <Name>Bedazzled Jeans</Name>
            <ProductUniqueID>BDZJ</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/BDZJ</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/BDZJ.jpg</ImageUrl>
        </Product>
        <Product>
            <Name>Bedazzled Jeans with Hello Kitty</Name>
            <ProductUniqueID>BDZJ-HK</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/BDZJ?sku=BDZJ-HK</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/BDZJ-HD.jpg</ImageUrl>
            <ParentID>BDZJ</ParentID>
        </Product>
        <Product>
            <Name>Fluffy Sweater</Name>
            <ProductUniqueID>FFFS</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/FFFS</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/FFFS.jpg</ImageUrl>
        </Product>
        <Product>
            <Name>Fluffy Sweater with Sleepy Panda</Name>
            <ProductUniqueID>FFFS-SP</ProductUniqueID>
            <ProductUrl>http://www.myawesomestore.com/products/FFFS?sku=SP</ProductUrl>
            <ImageUrl>http://www.myawesomestore.com/images/FFFS-SP.jpg</ImageUrl>
            <ParentID>FFFS</ParentID>
        </Product>
    </Products>
</Feed>
```

**XML Explained:** The first `<Product>` node contains the master level product. The second product node represent the same T-Shirt as the master level product, but in the `Blue` color. You’ll notice they each have their own `<ProductUniqueID>`, but the color variant one have extra elements: `<Color>` and `<ParentID>`. `<ParentID>` references the master level product ID. We will use the `<ParentID>` value to create the relationships in our system. The `<Color>` node is optional but included in the above example for clarity. You will see the same logic for representing the relationship in the rest of the products as well.

