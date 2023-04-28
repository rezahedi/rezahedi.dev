---
layout: "../../layouts/projectsPost.astro"
title: "Simple Shipment Tracking for WooCommerce - WP Plugin"
description: "Add shipment tracking information to your WooCommerce orders and provide customers with an easy way to track their orders. Shipment tracking Info will appear in customers accounts (in the order panel) and in WooCommerce order shipped email."
pubDate: "Dec 25, 2022"
# heroImage: "/placeholder-hero.jpg"
category: "Projects"
---

## Why inventing the wheel again?

I started coding [this plugin](https://github.com/rezahedi/wc-simple-shipment-tracking) when I didn't find any plugins that can do the job without any bloat assets that add more load time to frontend website or any other unnecessary features that make WP admin panel more complicated and slow. This plugin is so simple and lightweight but the features that it adds to WooCommerce are so useful do the job.

<figure class="image">
  <img src="/projects/wp-woocommerce-simple-shipment-tracking-01.png" alt="The order details under Customer profile in frontend">
  <figcaption>The order details under Customer profile in frontend</figcaption>
</figure>

## What does this plugin do?

This plugin add new order status "Shipped" to WooCommerce, and help your ecommerce website to provide customers with an easy way to track their orders by sending email notification when the order status changed to "Shipped". Shipment tracking Information also, will appear in website under customers My Accounts / Orders list.

<figure class="image">
  <img src="/projects/wp-woocommerce-simple-shipment-tracking-04.png" alt="WooCommerce admin panel, List of orders">
  <figcaption>WooCommerce admin panel, List of orders</figcaption>
</figure>

## How to install it and customize the template?

It's so easy to install [Simple Shiplemt Tracking plugin](https://github.com/rezahedi/wc-simple-shipment-tracking), just download the the repository and uncompressed it in your Wordpress plugins folder, then activate it from the Wordpress admin panel, plugins. And it's ready to use.

This plugin does not add any assets to the frontend website, like importing CSS files or using inline Styles for styling the frontend. So you should add your own styling and you can do it by copying the template files to your theme folder and editing the template files in your theme folder.

We have two template parts, One for the email notification, and the other one for "My Account > Orders". You can find the template files in `plugins/PLUGIN-FOLDER/templates/` and copy them to your theme folder `YOUR-THEME/woocommerce/templates/` and edit it as you need.

## How does it work technically?

If you are familiar with WooCommerce, you may know that WooCommerce has a built-in feature to add custom order status or custom email notifications. So this plugin uses this features to add a new order status "Shipped" to WooCommerce and create new "Email Notification" under WooCommerce admin panel > Settings > Emails. And then, it adds a new metabox to the backend order page where you can add tracking information.

<figure class="image">
  <img src="/projects/wp-woocommerce-simple-shipment-tracking-02.png" alt="Shipment tracking meta box added by the plugin to order's detail page">
  <figcaption>Shipment tracking meta box added by the plugin to order's detail page</figcaption>
</figure>

## List of All Features

1. Add new order status "Shipped"
2. Add new metaboxs to the backend order page where you can add multiple tracking informations
3. Add a new email template for the "Shipped" order status under WooCommerce > Settings > Emails
4. Trigger email notification to customers when order status changed to "Shipped"
5. Add shipment tracking info to the shipped order email notification
6. Add shipment tracking info to the customer account (in the frontend orders panel)
7. Bulk update order status to "Shipped" from the backend orders page
8. Add the "Resend shipment email notification" action to the backend order page > actions box

<figure class="image">
  <img src="/projects/wp-woocommerce-simple-shipment-tracking-03.png" alt="Created order notes for more clarification">
  <figcaption>Created order notes for more clarification</figcaption>
</figure>

## TODOs (in the future)

1. Add a plugin settings page to allow users to manage the couriers list, (Add, Edit, Delete, or Enable/Disable)
2. Use the couriers icons in the frontend or backend.
3. Make sure that the plugin is compatible with TrackShip for WooCommerce plugin.

Plugin's codes on Github: https://github.com/rezahedi/wc-simple-shipment-tracking

_**Note:** This plugin not tested in lower versions of Wordpress 6.x_
