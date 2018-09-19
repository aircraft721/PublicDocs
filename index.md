---
layout: index
---

<div class="home">
  <div class="container">
    <div class="row">
      <div class="card-columns">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title">API Resources</h2>
            <p class="card-text">
              Create beautiful widgets and access user-generated content using Olapic's REST APIs
              <ul class="article-list">
                <li><a href="http://apidoc.olapic.com/" target="_blank">Olapic API v2.2</a></li>
                <ul>
                {% for article in site.articles %}
                  {% if article.tags contains 'apiv2' %}
                  <li><a href="{{ site.url }}{{ article.url }}">{{ article.title }}</a></li>
                  {% endif %}
                {% endfor %}
                </ul>
                <li><a href="http://content-api-docs.photorank.me" target="_blank">Content API v1.0</a></li>
                <li><a href="http://data.photorank.me/api.html" target="_blank">Analytics API v1.0</a></li>
                <ul>
                {% for article in site.articles %}
                  {% if article.tags contains 'analytics-api' %}
                  <li><a href="{{ site.url }}{{ article.url }}">{{ article.title }}</a></li>
                  {% endif %}
                {% endfor %}
                </ul>
              </ul>
            </p>
          </div>
        </div>
        {% for cat in site.category-list %}
          {% if cat != "API Resources" %}
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">{{ cat }}</h2>
              <p class="card-text">
                <ul class="article-list">
                {% assign sorted_articles = site.articles | sort: "order" %}
                {% for article in sorted_articles %}
                  {% if article.resource == true %}
                    {% for ac in article.categories %}
                      {% if ac == cat %}
                      <li><a href="{{ site.url }}{{ article.url }}">{{ article.title }}</a></li>
                      {% endif %}   <!-- cat-match-p -->
                    {% endfor %}  <!-- page-category -->
                  {% endif %}   <!-- resource-p -->
                {% endfor %} <!-- page -->
                </ul>
              </p>
            </div>
          </div>
          {% endif %}
        {% endfor %}  <!-- cat -->
      </div>
    </div>
  </div>
</div>
