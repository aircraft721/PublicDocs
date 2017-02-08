---
layout: index
---

<div class="home">


  <div class="container">
    <div class="row">
    <div class="col-md-3">
      <h2>API Resources</h2>
      <ul>
        <li><a href="http://apidoc.olapic.com/" target="_blank">Olapic API v2.2</a></li>
        <li><a href="http://content-api-docs.photorank.me" target="_blank">Content API v1.0</a></li>
        <li><a href="http://data.photorank.me/api.html" target="_blank">Analytics API v1.0</a></li>
      </ul>
    </div>
    
    {% for cat in site.category-list %}
    <div class="col-md-3">
      <h2>{{ cat }}</h2>
      <ul>
      {% for page in site.pages %}
        {% if page.resource == true %}
          {% for pc in page.categories %}
            {% if pc == cat %}
            <li><a href="{{ site.baseurl }}{{ page.url }}">{{ page.title }}</a></li>
            {% endif %}   <!-- cat-match-p -->
          {% endfor %}  <!-- page-category -->
        {% endif %}   <!-- resource-p -->
      {% endfor %} <!-- page -->
      </ul>
    </div>
    {% endfor %}  <!-- cat -->
    </div>
  </div>





</div>
